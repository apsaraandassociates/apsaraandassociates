import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { LogOut, FileText, Upload as UploadIcon, Download, Trash2, Calendar, User, Edit2, X, Check } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

interface Document {
  id: string;
  filename: string;
  file_path: string;
  file_size: number;
  created_at: string;
  uploaded_by: string;
  uploaded_by_role: string;
}

interface UserProfile {
  full_name: string;
  email: string;
}

export function ClientDashboard() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [clientDocuments, setClientDocuments] = useState<Document[]>([]);
  const [caDocuments, setCaDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const [editingDocument, setEditingDocument] = useState<{ id: string; name: string } | null>(null);
  const [newFileName, setNewFileName] = useState("");

  // Get active tab from URL or default to "my-docs"
  const activeTab = (searchParams.get("tab") as "my-docs" | "ca-docs") || "my-docs";
  
  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      // Load profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("full_name, email")
        .eq("id", user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      }

      // Load documents
      await loadDocuments(user.id);
    } catch (error) {
      console.error("Error loading user data:", error);
      toast.error("Failed to load user data");
    } finally {
      setLoading(false);
    }
  };

  const loadDocuments = async (userId: string) => {
    try {
      // Load all documents for this client
      const { data: docs, error } = await supabase
        .from("documents")
        .select(`
          id,
          filename,
          file_path,
          file_size,
          created_at,
          uploaded_by,
          uploaded_by_role
        `)
        .eq("client_id", userId)
        .order("created_at", { ascending: false });

      if (error) throw error;

      if (docs) {
        // Separate into client-uploaded and CA-uploaded based on role
        const clientUploaded: Document[] = [];
        const caUploaded: Document[] = [];

        for (const doc of docs) {
          const docWithUploader = {
            ...doc,
            uploaded_by: doc.uploaded_by_role === "client" ? "Self" : doc.uploaded_by || "CA Apsara",
          };

          if (doc.uploaded_by_role === "client") {
            clientUploaded.push(docWithUploader);
          } else {
            caUploaded.push(docWithUploader);
          }
        }

        setClientDocuments(clientUploaded);
        setCaDocuments(caUploaded);
      }
    } catch (error) {
      console.error("Error loading documents:", error);
      toast.error("Failed to load documents");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      for (const file of Array.from(files)) {
        // Upload to storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${user.id}/client/${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("client-documents")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("client-documents")
          .getPublicUrl(fileName);

        // Save metadata to database
        const { error: dbError } = await supabase
          .from("documents")
          .insert({
            client_id: user.id,
            filename: file.name,
            file_path: fileName,
            file_url: urlData.publicUrl,
            file_size: file.size,
            file_type: file.type,
            uploaded_by: profile?.full_name || "Client",
            uploaded_by_role: "client",
          });

        if (dbError) throw dbError;
      }

      toast.success("Documents uploaded successfully");
      await loadDocuments(user.id);
    } catch (error: any) {
      console.error("Error uploading:", error);
      toast.error(error.message || "Failed to upload documents");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleDownload = async (doc: Document) => {
    try {
      const { data, error } = await supabase.storage
        .from("client-documents")
        .download(doc.file_path);

      if (error) throw error;

      // Create download link
      const url = URL.createObjectURL(data);
      const a = document.createElement("a");
      a.href = url;
      a.download = doc.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      toast.success("Document downloaded");
    } catch (error) {
      console.error("Error downloading:", error);
      toast.error("Failed to download document");
    }
  };

  const handleDelete = async () => {
    if (!documentToDelete) return;

    try {
      const doc = clientDocuments.find(d => d.id === documentToDelete);
      if (!doc) return;

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("client-documents")
        .remove([doc.file_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("documents")
        .delete()
        .eq("id", documentToDelete);

      if (dbError) throw dbError;

      toast.success("Document deleted");
      setClientDocuments(clientDocuments.filter(d => d.id !== documentToDelete));
      setDocumentToDelete(null);
      setShowDeleteDialog(false);
    } catch (error) {
      console.error("Error deleting:", error);
      toast.error("Failed to delete document");
    }
  };

  const handleStartRename = (doc: Document) => {
    setEditingDocument({ id: doc.id, name: doc.filename });
    setNewFileName(doc.filename);
  };

  const handleSaveRename = async () => {
    if (!editingDocument || !newFileName.trim()) return;

    try {
      const { error } = await supabase
        .from("documents")
        .update({ filename: newFileName.trim() })
        .eq("id", editingDocument.id);

      if (error) throw error;

      setClientDocuments(
        clientDocuments.map((d) =>
          d.id === editingDocument.id ? { ...d, filename: newFileName.trim() } : d
        )
      );
      
      toast.success("Document renamed");
      setEditingDocument(null);
      setNewFileName("");
    } catch (error) {
      console.error("Error renaming:", error);
      toast.error("Failed to rename document");
    }
  };

  const handleCancelRename = () => {
    setEditingDocument(null);
    setNewFileName("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const ClientDocumentsTable = () => (
    <>
      <div className="mb-4">
        <label>
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.xlsx,.xls"
            disabled={uploading}
          />
          <Button 
            className="bg-[#F3782C] hover:bg-[#e56820] cursor-pointer w-full sm:w-auto" 
            asChild
            disabled={uploading}
          >
            <span>
              <UploadIcon className="mr-2 h-4 w-4" />
              {uploading ? "Uploading..." : "Upload Documents"}
            </span>
          </Button>
        </label>
      </div>

      {clientDocuments.length === 0 ? (
        <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>No documents uploaded yet</p>
          <p className="text-sm mt-2">Upload your first document to get started</p>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead className="hidden md:table-cell">Upload Date</TableHead>
                <TableHead className="hidden lg:table-cell">Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#0A70A1] flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        {editingDocument?.id === doc.id ? (
                          <div className="flex items-center gap-2">
                            <Input
                              value={newFileName}
                              onChange={(e) => setNewFileName(e.target.value)}
                              className="h-8 text-sm"
                              autoFocus
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleSaveRename();
                                if (e.key === "Escape") handleCancelRename();
                              }}
                            />
                            <Button
                              size="sm"
                              onClick={handleSaveRename}
                              className="h-8 w-8 p-0 bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={handleCancelRename}
                              className="h-8 w-8 p-0"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <p className="font-medium truncate">{doc.filename}</p>
                            <p className="text-xs text-gray-500 md:hidden">
                              {formatDate(doc.created_at)}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(doc.created_at)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-gray-600">
                    {formatFileSize(doc.file_size)}
                  </TableCell>
                  <TableCell className="text-right">
                    {editingDocument?.id !== doc.id && (
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleDownload(doc)}
                          className="text-[#0A70A1] hover:text-[#085a85] hover:bg-blue-50"
                        >
                          <Download className="h-4 w-4" />
                          <span className="sr-only sm:not-sr-only sm:ml-2">Download</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleStartRename(doc)}
                          className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                        >
                          <Edit2 className="h-4 w-4" />
                          <span className="sr-only sm:not-sr-only sm:ml-2">Rename</span>
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setDocumentToDelete(doc.id);
                            setShowDeleteDialog(true);
                          }}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only sm:not-sr-only sm:ml-2">Delete</span>
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );

  const CADocumentsTable = () => (
    <>
      {caDocuments.length === 0 ? (
        <div className="text-center py-12 text-gray-400 border-2 border-dashed border-gray-200 rounded-lg">
          <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
          <p>No documents from CA yet</p>
          <p className="text-sm mt-2">Your CA will upload documents here</p>
        </div>
      ) : (
        <div className="overflow-x-auto border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Document Name</TableHead>
                <TableHead className="hidden md:table-cell">Upload Date</TableHead>
                <TableHead className="hidden sm:table-cell">Uploaded By</TableHead>
                <TableHead className="hidden lg:table-cell">Size</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caDocuments.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#F3782C] flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="font-medium truncate">{doc.filename}</p>
                        <p className="text-xs text-gray-500 md:hidden">
                          {formatDate(doc.created_at)}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {formatDate(doc.created_at)}
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <User className="h-4 w-4" />
                      {doc.uploaded_by}
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-gray-600">
                    {formatFileSize(doc.file_size)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDownload(doc)}
                      className="text-[#0A70A1] hover:text-[#085a85] hover:bg-blue-50"
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only sm:not-sr-only sm:ml-2">Download</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A70A1] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome, {profile?.full_name || "User"}
              </h1>
              <p className="text-sm text-gray-600">{profile?.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card className="border-l-4 border-l-[#0A70A1]">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#0A70A1] p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Your Documents
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Upload and manage your financial documents. You can upload, rename, download, and delete your documents.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-[#F3782C]">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-[#F3782C] p-3 rounded-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    CA Documents
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    View and download documents uploaded by your CA. These include reports, assessments, and advisory documents.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Documents Section with Tabs */}
        <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="my-docs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              My Documents ({clientDocuments.length})
            </TabsTrigger>
            <TabsTrigger value="ca-docs" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              CA Documents ({caDocuments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="my-docs">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">My Uploaded Documents</CardTitle>
                <p className="text-sm text-gray-600">
                  Upload, manage, and organize your documents. You have full control to upload, rename, download, and delete.
                </p>
              </CardHeader>
              <CardContent>
                <ClientDocumentsTable />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ca-docs">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">CA Documents</CardTitle>
                <p className="text-sm text-gray-600">
                  Documents uploaded by CA Apsara for you. You can view and download these documents.
                </p>
              </CardHeader>
              <CardContent>
                <CADocumentsTable />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Document?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the document.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
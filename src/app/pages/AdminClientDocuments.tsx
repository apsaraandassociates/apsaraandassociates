import { useState, useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { ArrowLeft, Upload, Download, Trash2, FileText, Calendar, User, Edit2, X, Check, Loader2 } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

interface ClientProfile {
  id: string;
  full_name: string;
  email: string;
}

interface Document {
  id: string;
  filename: string;
  created_at: string;
  uploaded_by: string;
  file_size: number;
  file_path: string;
}

export function AdminClientDocuments() {
  const navigate = useNavigate();
  const { clientId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [client, setClient] = useState<ClientProfile | null>(null);
  const [clientDocuments, setClientDocuments] = useState<Document[]>([]);
  const [caDocuments, setCADocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<{ id: string; section: "client" | "ca"; filePath: string } | null>(null);
  const [editingDocument, setEditingDocument] = useState<{ id: string; section: "client" | "ca"; name: string } | null>(null);
  const [newFileName, setNewFileName] = useState("");
  
  // Get active tab from URL or default to "client"
  const activeTab = (searchParams.get("tab") as "client" | "ca") || "client";
  
  const handleTabChange = (value: string) => {
    setSearchParams({ tab: value });
  };

  useEffect(() => {
    fetchClientData();
    fetchDocuments();
  }, [clientId]);

  const fetchClientData = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, email")
        .eq("id", clientId)
        .single();

      if (error) throw error;
      setClient(data);
    } catch (error: any) {
      console.error("Error fetching client:", error);
      toast.error("Failed to load client data");
    }
  };

  const fetchDocuments = async () => {
    try {
      setLoading(true);

      // Fetch client documents
      const { data: clientDocs, error: clientError } = await supabase
        .from("documents")
        .select("*")
        .eq("client_id", clientId)
        .eq("uploaded_by_role", "client")
        .order("created_at", { ascending: false });

      if (clientError) throw clientError;

      // Fetch CA documents
      const { data: caDocs, error: caError } = await supabase
        .from("documents")
        .select("*")
        .eq("client_id", clientId)
        .eq("uploaded_by_role", "admin")
        .order("created_at", { ascending: false });

      if (caError) throw caError;

      setClientDocuments(clientDocs || []);
      setCADocuments(caDocs || []);
    } catch (error: any) {
      console.error("Error fetching documents:", error);
      toast.error("Failed to load documents");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, section: "client" | "ca") => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        // Upload to storage
        const fileExt = file.name.split(".").pop();
        const fileName = `${clientId}/${section}/${Date.now()}-${file.name}`;

        const { error: uploadError } = await supabase.storage
          .from("client-documents")
          .upload(fileName, file);

        if (uploadError) throw uploadError;

        // Get public URL
        const { data: urlData } = supabase.storage
          .from("client-documents")
          .getPublicUrl(fileName);

        // Save to database
        const { error: dbError } = await supabase
          .from("documents")
          .insert({
            client_id: clientId,
            filename: file.name,
            file_path: fileName,
            file_url: urlData.publicUrl,
            file_size: file.size,
            uploaded_by_role: section === "ca" ? "admin" : "client",
            uploaded_by: section === "ca" ? "CA Apsara" : client?.full_name || "Client",
          });

        if (dbError) throw dbError;
      }

      toast.success("Files uploaded successfully!");
      fetchDocuments();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(`Failed to upload: ${error.message}`);
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

      toast.success("Download started");
    } catch (error: any) {
      console.error("Download error:", error);
      toast.error("Failed to download file");
    }
  };

  const handleDelete = async () => {
    if (!documentToDelete) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from("client-documents")
        .remove([documentToDelete.filePath]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from("documents")
        .delete()
        .eq("id", documentToDelete.id);

      if (dbError) throw dbError;

      toast.success("Document deleted");
      fetchDocuments();
      setDocumentToDelete(null);
      setShowDeleteDialog(false);
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error("Failed to delete document");
    }
  };

  const handleRename = async () => {
    if (!editingDocument || !newFileName.trim()) return;

    try {
      const { error } = await supabase
        .from("documents")
        .update({ filename: newFileName.trim() })
        .eq("id", editingDocument.id);

      if (error) throw error;

      toast.success("Document renamed");
      fetchDocuments();
      setEditingDocument(null);
      setNewFileName("");
    } catch (error: any) {
      console.error("Rename error:", error);
      toast.error("Failed to rename document");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0A70A1]" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Client Not Found</h2>
          <Button onClick={() => navigate("/admin")}>Back to Dashboard</Button>
        </div>
      </div>
    );
  }

  const DocumentsTable = ({
    documents,
    section,
  }: {
    documents: Document[];
    section: "client" | "ca";
  }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>File Name</TableHead>
          <TableHead>Uploaded By</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Size</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-center text-gray-500 py-8">
              No documents uploaded yet
            </TableCell>
          </TableRow>
        ) : (
          documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#0A70A1]" />
                  {editingDocument?.id === doc.id ? (
                    <div className="flex items-center gap-2">
                      <Input
                        value={newFileName}
                        onChange={(e) => setNewFileName(e.target.value)}
                        className="h-8 max-w-xs"
                        autoFocus
                      />
                      <Button size="sm" variant="ghost" onClick={handleRename}>
                        <Check className="h-4 w-4 text-green-600" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setEditingDocument(null);
                          setNewFileName("");
                        }}
                      >
                        <X className="h-4 w-4 text-red-600" />
                      </Button>
                    </div>
                  ) : (
                    <span>{doc.filename}</span>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-400" />
                  {doc.uploaded_by}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {formatDate(doc.created_at)}
                </div>
              </TableCell>
              <TableCell>{formatFileSize(doc.file_size)}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setEditingDocument({ id: doc.id, section, name: doc.filename });
                      setNewFileName(doc.filename);
                    }}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDownload(doc)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setDocumentToDelete({ id: doc.id, section, filePath: doc.file_path });
                      setShowDeleteDialog(true);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate("/admin")}
              variant="ghost"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">{client.full_name}</h1>
              <p className="text-sm text-gray-600">{client.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="client">Client Documents</TabsTrigger>
            <TabsTrigger value="ca">CA Documents</TabsTrigger>
          </TabsList>

          {/* Client Documents Tab */}
          <TabsContent value="client">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Documents Uploaded by Client</CardTitle>
                  <p className="text-sm text-gray-600">
                    Total: {clientDocuments.length} document(s)
                  </p>
                </div>
              </CardHeader>
              <CardContent>
                <DocumentsTable documents={clientDocuments} section="client" />
              </CardContent>
            </Card>
          </TabsContent>

          {/* CA Documents Tab */}
          <TabsContent value="ca">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Documents from CA</CardTitle>
                  <label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => handleFileUpload(e, "ca")}
                      className="hidden"
                      disabled={uploading}
                    />
                    <Button disabled={uploading} asChild>
                      <span>
                        {uploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Uploading...
                          </>
                        ) : (
                          <>
                            <Upload className="mr-2 h-4 w-4" />
                            Upload Documents
                          </>
                        )}
                      </span>
                    </Button>
                  </label>
                </div>
              </CardHeader>
              <CardContent>
                <DocumentsTable documents={caDocuments} section="ca" />
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
              This action cannot be undone. This will permanently delete the document from storage.
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
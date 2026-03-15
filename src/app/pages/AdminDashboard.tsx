import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Users,
  Plus,
  Search,
  LogOut,
  FileText,
  ArrowRight,
  MoreVertical,
  Trash2,
  Key,
  Settings,
  Link as LinkIcon,
  RefreshCw,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";

interface Client {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  created_at: string;
  documentsCount: number;
  lastUpload: string | null;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showResetPasswordDialog, setShowResetPasswordDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);
  const [clientToReset, setClientToReset] = useState<{ id: string; email: string } | null>(null);
  const [inviteLink, setInviteLink] = useState("");

  const [newClient, setNewClient] = useState({
    name: "",
  });

  useEffect(() => {
    checkAdminAndLoadClients();
  }, []);

  const checkAdminAndLoadClients = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        navigate("/login");
        return;
      }

      // Check if user is admin
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();

      if (profile?.role !== "admin") {
        toast.error("Access denied");
        navigate("/login");
        return;
      }

      await loadClients();
    } catch (error) {
      console.error("Error:", error);
      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const loadClients = async () => {
    try {
      // Get all client profiles
      const { data: profiles, error: profilesError } = await supabase
        .from("profiles")
        .select("*")
        .eq("role", "client")
        .order("created_at", { ascending: false });

      if (profilesError) throw profilesError;

      if (profiles) {
        // Get document counts and last upload for each client
        const clientsWithStats = await Promise.all(
          profiles.map(async (profile) => {
            const { data: docs } = await supabase
              .from("documents")
              .select("created_at")
              .eq("client_id", profile.id);

            const documentsCount = docs?.length || 0;
            const lastUpload = docs && docs.length > 0
              ? docs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0].created_at
              : null;

            return {
              id: profile.id,
              full_name: profile.full_name || "Unnamed Client",
              email: profile.email,
              phone: profile.phone || "N/A",
              created_at: profile.created_at,
              documentsCount,
              lastUpload,
            };
          })
        );

        setClients(clientsWithStats);
      }
    } catch (error) {
      console.error("Error loading clients:", error);
      toast.error("Failed to load clients");
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleAddClient = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Generate unique invite token
      const inviteToken = Math.random().toString(36).substring(2) + Date.now().toString(36);

      // Create registration link record
      const { data: { user } } = await supabase.auth.getUser();
      
      const { error } = await supabase
        .from("client_registration_links")
        .insert({
          client_name: newClient.name,
          registration_token: inviteToken,
          created_by: user?.id,
        });

      if (error) throw error;

      setNewClient({ name: "" });
      setShowAddDialog(false);
      
      // Show invite link
      const link = `${window.location.origin}/register?invite=${inviteToken}`;
      setInviteLink(link);
      setShowInviteDialog(true);
      
      toast.success("Invite link generated successfully");
    } catch (error: any) {
      console.error("Error creating invite:", error);
      toast.error(error.message || "Failed to create invite link");
    }
  };

  const handleDeleteClient = async () => {
    if (!clientToDelete) return;

    try {
      // Delete user from auth (this will cascade delete profile and documents due to FK constraints)
      const { error } = await supabase.auth.admin.deleteUser(clientToDelete);

      if (error) throw error;

      toast.success("Client deleted successfully");
      setClients(clients.filter((c) => c.id !== clientToDelete));
      setClientToDelete(null);
      setShowDeleteDialog(false);
    } catch (error: any) {
      console.error("Error deleting client:", error);
      toast.error(error.message || "Failed to delete client");
    }
  };

  const handleResetPassword = async () => {
    if (!clientToReset) return;

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(clientToReset.email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) throw error;

      toast.success(`Password reset email sent to ${clientToReset.email}`);
      setShowResetPasswordDialog(false);
      setClientToReset(null);
    } catch (error: any) {
      console.error("Error resetting password:", error);
      toast.error(error.message || "Failed to send reset email");
    }
  };

  const handleGenerateInvite = () => {
    // Generate unique invite link
    const token = Math.random().toString(36).substring(2) + Date.now().toString(36);
    const link = `${window.location.origin}/register?invite=${token}`;
    setInviteLink(link);
    setShowInviteDialog(true);
  };

  const copyInviteLink = () => {
    // Try multiple methods to copy
    const textToCopy = inviteLink;
    
    // Method 1: Modern Clipboard API
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(textToCopy)
        .then(() => {
          toast.success("Link copied to clipboard!");
        })
        .catch(() => {
          // If it fails, try fallback
          fallbackCopyText(textToCopy);
        });
    } else {
      // Method 2: Fallback for non-secure contexts
      fallbackCopyText(textToCopy);
    }
  };

  const fallbackCopyText = (text: string) => {
    // Create a temporary textarea
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Make it invisible but accessible
    textArea.style.position = "fixed";
    textArea.style.left = "0";
    textArea.style.top = "0";
    textArea.style.width = "2em";
    textArea.style.height = "2em";
    textArea.style.padding = "0";
    textArea.style.border = "none";
    textArea.style.outline = "none";
    textArea.style.boxShadow = "none";
    textArea.style.background = "transparent";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        toast.success("Link copied to clipboard!");
      } else {
        toast.error("Could not copy. Please select and copy manually.");
      }
    } catch (err) {
      console.error('Fallback copy failed:', err);
      toast.error("Could not copy. Please select and copy manually.");
    }
    
    document.body.removeChild(textArea);
  };

  const handleViewClient = (clientId: string) => {
    navigate(`/admin/client/${clientId}`);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await loadClients();
      toast.success("Client list refreshed");
    } catch (error) {
      toast.error("Failed to refresh");
    } finally {
      setRefreshing(false);
    }
  };

  const filteredClients = clients.filter(
    (client) =>
      client.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
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
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Manage clients and their documents</p>
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
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <Button
            onClick={() => setShowAddDialog(true)}
            className="bg-[#0A70A1] hover:bg-[#085a85] flex-1 sm:flex-initial"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add New Client
          </Button>
          <Button
            onClick={handleGenerateInvite}
            variant="outline"
            className="flex-1 sm:flex-initial"
          >
            <LinkIcon className="mr-2 h-4 w-4" />
            Generate Invite Link
          </Button>
          <Button
            onClick={() => navigate("/admin/settings")}
            variant="outline"
            className="flex-1 sm:flex-initial"
          >
            <Settings className="mr-2 h-4 w-4" />
            Site Settings
          </Button>
        </div>

        {/* Clients List */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between mb-4">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-[#0A70A1]" />
                All Clients ({clients.length})
              </CardTitle>
              <Button
                onClick={handleRefresh}
                disabled={refreshing}
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Refresh</span>
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search clients by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filteredClients.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Users className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p>No clients found</p>
              </div>
            ) : (
              <div className="divide-y">
                {filteredClients.map((client) => (
                  <div
                    key={client.id}
                    className="p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <Avatar className="h-12 w-12 bg-gradient-to-br from-[#0A70A1] to-[#085a85] flex-shrink-0">
                          <AvatarFallback className="bg-gradient-to-br from-[#0A70A1] to-[#085a85] text-white">
                            {client.full_name.split(" ").map((n) => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        
                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900 truncate">
                            {client.full_name}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {client.email}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {client.phone}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="hidden md:flex flex-col items-end">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <FileText className="h-4 w-4" />
                            <span className="font-medium">{client.documentsCount}</span>
                            <span className="text-gray-400">documents</span>
                          </div>
                          {client.lastUpload && (
                            <p className="text-xs text-gray-400 mt-1">
                              Last upload: {new Date(client.lastUpload).toLocaleDateString()}
                            </p>
                          )}
                        </div>

                        <Button
                          onClick={() => handleViewClient(client.id)}
                          className="bg-[#F3782C] hover:bg-[#e56820]"
                        >
                          <span className="hidden sm:inline mr-2">View Documents</span>
                          <ArrowRight className="h-4 w-4" />
                        </Button>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => {
                                setClientToReset({ id: client.id, email: client.email });
                                setShowResetPasswordDialog(true);
                              }}
                            >
                              <Key className="mr-2 h-4 w-4" />
                              Reset Password
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                setClientToDelete(client.id);
                                setShowDeleteDialog(true);
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Client
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add Client Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Client</DialogTitle>
            <DialogDescription>
              Create a new client account and get a shareable registration link.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddClient} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                required
                value={newClient.name}
                onChange={(e) => setNewClient({ ...newClient, name: e.target.value })}
                placeholder="Enter full name"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button type="button" variant="outline" onClick={() => setShowAddDialog(false)}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#0A70A1] hover:bg-[#085a85]">
                Add Client
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Client?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the client account and all associated documents.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteClient}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reset Password Confirmation Dialog */}
      <AlertDialog open={showResetPasswordDialog} onOpenChange={setShowResetPasswordDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reset Client Password?</AlertDialogTitle>
            <AlertDialogDescription>
              A password reset link will be sent to the client's email address.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleResetPassword}
              className="bg-[#0A70A1] hover:bg-[#085a85]"
            >
              Send Reset Link
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Invite Link Dialog */}
      <Dialog open={showInviteDialog} onOpenChange={setShowInviteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Client Invite Link</DialogTitle>
            <DialogDescription>
              Share this link with your client to create their account and start uploading documents.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-[#0A70A1]">
              <textarea
                readOnly
                value={inviteLink}
                className="w-full bg-transparent text-sm break-all outline-none resize-none h-20 font-mono"
                onClick={(e) => e.currentTarget.select()}
                onFocus={(e) => e.currentTarget.select()}
              />
            </div>
            <p className="text-xs text-gray-500 text-center">
              👆 Click the link above to select all, then press Ctrl+C (or Cmd+C on Mac) to copy
            </p>
            <div className="flex gap-2">
              <Button onClick={copyInviteLink} className="flex-1 bg-[#0A70A1] hover:bg-[#085a85]">
                Copy Link
              </Button>
              <Button variant="outline" onClick={() => setShowInviteDialog(false)}>
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
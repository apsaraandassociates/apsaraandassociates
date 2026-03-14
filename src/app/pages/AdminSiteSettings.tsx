import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Upload, Trash2, Loader2 } from "lucide-react";
import { Button } from "../components/ui/button";
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
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import { useSiteSettings } from "../hooks/useSiteSettings";

export function AdminSiteSettings() {
  const navigate = useNavigate();
  const { settings, loading: settingsLoading, refetch } = useSiteSettings();
  const [uploading, setUploading] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState<{
    open: boolean;
    field: string;
    title: string;
  }>({ open: false, field: "", title: "" });

  const handleUpload = async (
    file: File,
    field: string,
    folder: string
  ): Promise<boolean> => {
    try {
      // Validate
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return false;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload an image file");
        return false;
      }

      setUploading(true);

      // Upload to storage
      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}-${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("site-images")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data } = supabase.storage
        .from("site-images")
        .getPublicUrl(filePath);

      // Update database
      const { error: dbError } = await supabase
        .from("site_settings")
        .upsert({
          id: 1,
          [field]: data.publicUrl,
          updated_at: new Date().toISOString(),
        });

      if (dbError) throw dbError;

      toast.success("Image uploaded successfully!");
      refetch();
      return true;
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(`Failed to upload: ${error.message}`);
      return false;
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (field: string) => {
    try {
      setUploading(true);

      const { error } = await supabase
        .from("site_settings")
        .update({
          [field]: null,
          updated_at: new Date().toISOString(),
        })
        .eq("id", 1);

      if (error) throw error;

      toast.success("Image deleted successfully!");
      refetch();
      setDeleteDialog({ open: false, field: "", title: "" });
    } catch (error: any) {
      console.error("Delete error:", error);
      toast.error(`Failed to delete: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const ImageCard = ({
    title,
    field,
    folder,
    currentUrl,
  }: {
    title: string;
    field: string;
    folder: string;
    currentUrl?: string;
  }) => {
    const inputId = `upload-${field}`;

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        handleUpload(file, field, folder);
      }
      // Reset input so same file can be selected again
      e.target.value = "";
    };

    return (
      <div className="bg-white border border-gray-200 rounded-lg p-4">
        <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>

        {currentUrl ? (
          <div className="space-y-3">
            <img
              src={currentUrl}
              alt={title}
              className="w-full h-48 object-cover rounded border"
            />
            <div className="flex gap-2">
              <input
                id={inputId}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                disabled={uploading}
                style={{ display: "none" }}
              />
              <Button
                type="button"
                onClick={() => document.getElementById(inputId)?.click()}
                variant="outline"
                className="flex-1"
                disabled={uploading}
              >
                <Upload className="h-4 w-4 mr-2" />
                Change
              </Button>
              <Button
                variant="destructive"
                onClick={() =>
                  setDeleteDialog({ open: true, field, title })
                }
                disabled={uploading}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-3">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600">No image uploaded</p>
            </div>
            <input
              id={inputId}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              disabled={uploading}
              style={{ display: "none" }}
            />
            <Button
              type="button"
              onClick={() => document.getElementById(inputId)?.click()}
              className="w-full bg-[#0A70A1] hover:bg-[#085a85]"
              disabled={uploading}
            >
              <Upload className="h-4 w-4 mr-2" />
              Upload Image
            </Button>
          </div>
        )}
      </div>
    );
  };

  if (settingsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0A70A1]" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button onClick={() => navigate("/admin")} variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
              <p className="text-sm text-gray-600">
                Upload and manage banner images and CA profile photo
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Banner Images */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Banner Images</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <ImageCard
              title="Hero Banner"
              field="hero_image_url"
              folder="hero"
              currentUrl={settings?.hero_image_url || undefined}
            />
            <ImageCard
              title="Services Banner"
              field="services_image_url"
              folder="services"
              currentUrl={settings?.services_image_url || undefined}
            />
            <ImageCard
              title="Contact Banner"
              field="contact_image_url"
              folder="contact"
              currentUrl={settings?.contact_image_url || undefined}
            />
            <ImageCard
              title="About Banner"
              field="about_image_url"
              folder="about"
              currentUrl={settings?.about_image_url || undefined}
            />
          </div>
        </div>

        {uploading && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 flex items-center gap-3">
              <Loader2 className="h-6 w-6 animate-spin text-[#0A70A1]" />
              <span className="text-gray-900 font-medium">Uploading...</span>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={deleteDialog.open}
        onOpenChange={(open) =>
          setDeleteDialog({ open, field: "", title: "" })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {deleteDialog.title}?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this image. You can upload a new one
              anytime.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDelete(deleteDialog.field)}
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
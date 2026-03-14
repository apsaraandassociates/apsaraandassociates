import { useState, useEffect } from "react";
import { supabase } from "../../lib/supabase";

export interface SiteSettings {
  id?: string;
  hero_image_url: string | null;
  services_image_url: string | null;
  contact_image_url: string | null;
  about_image_url: string | null;
  ca_photo_url: string | null;
  updated_at?: string;
}

export function useSiteSettings() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("site_settings")
        .select("*")
        .single();

      if (error) {
        // If no settings exist, create default entry
        if (error.code === "PGRST116") {
          const { data: newData, error: insertError } = await supabase
            .from("site_settings")
            .insert([
              {
                hero_image_url: null,
                services_image_url: null,
                contact_image_url: null,
                about_image_url: null,
                ca_photo_url: null,
              },
            ])
            .select()
            .single();

          if (insertError) throw insertError;
          setSettings(newData);
        } else {
          throw error;
        }
      } else {
        setSettings(data);
      }
    } catch (err: any) {
      console.error("Error fetching site settings:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const refetch = () => {
    fetchSettings();
  };

  return { settings, loading, error, refetch };
}

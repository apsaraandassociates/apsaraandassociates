import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xxzyqgdybpmuenhslyij.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4enlxZ2R5YnBtdWVuaHNseWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NjY0NTgsImV4cCI6MjA4OTA0MjQ1OH0.BThHbrggGevIH3Wkd--a1QuGueCIf7nz3Kk5dxVEsiw';

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please check your .env file.');
  console.error('Required variables: VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY');
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Types for database tables
export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  role: 'admin' | 'client';
  created_at: string;
  updated_at: string;
}

export interface ClientRegistrationLink {
  id: string;
  client_name: string;
  registration_token: string;
  created_by: string;
  is_used: boolean;
  used_at: string | null;
  used_by: string | null;
  expires_at: string;
  created_at: string;
}

export interface Document {
  id: string;
  client_id: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  file_type: string | null;
  uploaded_by: string | null;
  created_at: string;
}

export interface SiteSetting {
  id: string;
  setting_key: string;
  setting_value: string | null;
  setting_type: 'text' | 'image' | 'json';
  updated_by: string | null;
  updated_at: string;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string | null;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
  updated_at: string;
}

// Helper function to check if user is admin
export async function isAdmin(): Promise<boolean> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return false;

    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    return profile?.role === 'admin';
  } catch (error) {
    console.error('Error checking admin status:', error);
    return false;
  }
}

// Helper function to get current user profile
export async function getCurrentProfile(): Promise<Profile | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) throw error;
    return profile;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
}

// Helper function to upload file to storage
export async function uploadFile(
  bucket: 'client-documents' | 'site-images',
  path: string,
  file: File
): Promise<{ data: { path: string } | null; error: Error | null }> {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false,
      });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { data: null, error: error as Error };
  }
}

// Helper function to get public URL for file
export function getPublicUrl(bucket: string, path: string): string {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data.publicUrl;
}

// Helper function to delete file from storage
export async function deleteFile(
  bucket: 'client-documents' | 'site-images',
  path: string
): Promise<{ error: Error | null }> {
  try {
    const { error } = await supabase.storage.from(bucket).remove([path]);
    if (error) throw error;
    return { error: null };
  } catch (error) {
    console.error('Error deleting file:', error);
    return { error: error as Error };
  }
}

// Helper function to send contact form
export async function sendContactForm(formData: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await supabase.functions.invoke('send-contact-email', {
      body: formData,
    });

    if (response.error) throw response.error;
    return { success: true };
  } catch (error) {
    console.error('Error sending contact form:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Helper function to send OTP
export async function sendOTP(
  email: string,
  purpose: 'registration' | 'password_reset'
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await supabase.functions.invoke('send-otp', {
      body: { email, purpose },
    });

    if (response.error) throw response.error;
    return { success: true };
  } catch (error) {
    console.error('Error sending OTP:', error);
    return { success: false, error: (error as Error).message };
  }
}

// Helper function to verify OTP
export async function verifyOTP(
  email: string,
  otpCode: string,
  purpose: 'registration' | 'password_reset'
): Promise<{ success: boolean; error?: string }> {
  try {
    // Query the OTP verification table
    const { data, error } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('email', email)
      .eq('otp_code', otpCode)
      .eq('purpose', purpose)
      .eq('verified', false)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) {
      return { success: false, error: 'Invalid or expired OTP' };
    }

    // Mark OTP as verified
    await supabase
      .from('otp_verifications')
      .update({ verified: true })
      .eq('id', data.id);

    return { success: true };
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return { success: false, error: (error as Error).message };
  }
}
-- =====================================================
-- Apsara & Associates - Storage Buckets Setup
-- =====================================================
-- Creates and configures storage buckets for documents and images
-- =====================================================

-- =====================================================
-- CREATE STORAGE BUCKETS
-- =====================================================

-- Client Documents Bucket (Private)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'client-documents',
  'client-documents',
  false,
  52428800, -- 50MB limit
  ARRAY[
    'application/pdf',
    'image/jpeg',
    'image/jpg',
    'image/png',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- Site Images Bucket (Public)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'site-images',
  'site-images',
  true,
  10485760, -- 10MB limit
  ARRAY[
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/webp',
    'image/gif'
  ]
)
ON CONFLICT (id) DO NOTHING;

-- =====================================================
-- CLIENT DOCUMENTS BUCKET POLICIES
-- =====================================================

-- Policy: Clients can upload to their own folder
CREATE POLICY "Clients can upload to own folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'client-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Clients can view their own documents
CREATE POLICY "Clients can view own documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'client-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Clients can delete their own documents
CREATE POLICY "Clients can delete own documents"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'client-documents' AND
  (storage.foldername(name))[1] = auth.uid()::text
);

-- Policy: Admins can upload to any client folder
CREATE POLICY "Admins can upload to any folder"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'client-documents' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Admins can view all documents
CREATE POLICY "Admins can view all documents"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'client-documents' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Admins can delete any document
CREATE POLICY "Admins can delete any document"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'client-documents' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Admins can update any document
CREATE POLICY "Admins can update any document"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'client-documents' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- =====================================================
-- SITE IMAGES BUCKET POLICIES
-- =====================================================

-- Policy: Anyone can view site images (public bucket)
CREATE POLICY "Public site images are viewable by everyone"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'site-images');

-- Policy: Admins can upload site images
CREATE POLICY "Admins can upload site images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'site-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Admins can delete site images
CREATE POLICY "Admins can delete site images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'site-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

-- Policy: Admins can update site images
CREATE POLICY "Admins can update site images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'site-images' AND
  EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  )
);

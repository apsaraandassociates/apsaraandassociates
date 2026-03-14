# Supabase Setup Instructions

## Required Database Tables & Storage

Run these SQL commands in your Supabase SQL Editor to set up the required tables and storage buckets.

---

## 1. Site Settings Table

This table stores URLs for uploaded banner images and CA photo.

```sql
-- Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id BIGSERIAL PRIMARY KEY,
  hero_image_url TEXT,
  services_image_url TEXT,
  contact_image_url TEXT,
  about_image_url TEXT,
  ca_photo_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default row
INSERT INTO site_settings (id, hero_image_url, services_image_url, contact_image_url, about_image_url, ca_photo_url)
VALUES (1, NULL, NULL, NULL, NULL, NULL)
ON CONFLICT (id) DO NOTHING;

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Allow public to read
CREATE POLICY "Allow public read access" ON site_settings
  FOR SELECT TO public
  USING (true);

-- Allow authenticated users to update
CREATE POLICY "Allow authenticated update access" ON site_settings
  FOR UPDATE TO authenticated
  USING (true);
```

---

## 2. Contact Inquiries Table

This table stores all contact form submissions.

```sql
-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  is_read BOOLEAN DEFAULT FALSE,
  notes TEXT
);

-- Enable RLS
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (submit contact form)
CREATE POLICY "Allow public insert access" ON contact_inquiries
  FOR INSERT TO public
  WITH CHECK (true);

-- Allow authenticated users (admin) to read all
CREATE POLICY "Allow authenticated read access" ON contact_inquiries
  FOR SELECT TO authenticated
  USING (true);

-- Allow authenticated users (admin) to update
CREATE POLICY "Allow authenticated update access" ON contact_inquiries
  FOR UPDATE TO authenticated
  USING (true);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_created_at ON contact_inquiries(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_inquiries_is_read ON contact_inquiries(is_read);
```

---

## 3. Storage Bucket for Site Images

This bucket stores all uploaded banner images and CA photo.

### Create Storage Bucket

1. Go to **Storage** in your Supabase dashboard
2. Click **New bucket**
3. Name it: `site-images`
4. Make it **Public** (check the public option)
5. Click **Create bucket**

### Or run this SQL:

```sql
-- Create storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('site-images', 'site-images', true)
ON CONFLICT (id) DO NOTHING;
```

### Set Storage Policies

```sql
-- Allow public to read images
CREATE POLICY "Allow public read access" ON storage.objects
  FOR SELECT TO public
  USING (bucket_id = 'site-images');

-- Allow authenticated users to upload images
CREATE POLICY "Allow authenticated upload access" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-images');

-- Allow authenticated users to update images
CREATE POLICY "Allow authenticated update access" ON storage.objects
  FOR UPDATE TO authenticated
  USING (bucket_id = 'site-images');

-- Allow authenticated users to delete images
CREATE POLICY "Allow authenticated delete access" ON storage.objects
  FOR DELETE TO authenticated
  USING (bucket_id = 'site-images');
```

---

## 4. Verify Setup

After running all the commands above, verify:

1. ✅ `site_settings` table exists with 1 row (all image URLs are NULL initially)
2. ✅ `contact_inquiries` table exists and is empty
3. ✅ `site-images` storage bucket exists and is public

---

## Testing

### Test Image Upload:
1. Login as admin
2. Go to **Admin Dashboard** → **Site Settings**
3. Upload a test image
4. Click **Save Changes**
5. Go to the homepage and refresh - you should see the uploaded image

### Test Contact Form:
1. Go to **Contact Us** page
2. Fill out the form
3. Submit
4. Check Supabase dashboard → `contact_inquiries` table
5. You should see your submission

---

## Viewing Contact Form Submissions

You can view all contact form submissions in the Supabase dashboard:

1. Go to **Table Editor**
2. Select `contact_inquiries` table
3. All submissions will be listed there

### Optional: Create an Admin View for Contact Inquiries

You can add this page to your admin dashboard later to view and manage contact inquiries directly in your app.

---

## Email Notifications (Optional - Future Enhancement)

To receive email notifications when someone submits the contact form, you'll need to:

1. Create a Supabase Edge Function
2. Use a service like Resend, SendGrid, or AWS SES
3. Trigger the function when a new row is inserted into `contact_inquiries`

This is not set up yet but can be added later if needed.

---

## Troubleshooting

**Images not uploading?**
- Check that `site-images` bucket exists and is public
- Check that storage policies are set correctly
- Check browser console for errors

**Contact form not saving?**
- Check that `contact_inquiries` table exists
- Check that RLS policies allow public insert
- Check browser console for errors

**Need help?**
- Check Supabase logs in the dashboard
- Check browser console for JavaScript errors
- Verify your `.env` file has correct `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`

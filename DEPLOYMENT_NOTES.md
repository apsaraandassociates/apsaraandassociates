# Apsara & Associates - Deployment Notes

## ✅ Design Updates Complete

### Recent Changes:
- ✅ Removed wavy SVG decorations from banners (now square/clean)
- ✅ Removed public folder image setup
- ✅ Added "About Us" page with CA Apsara Babu profile
- ✅ Created "Site Settings" page in admin panel for image management
- ✅ Navigation updated to include "About Us" link

## Admin Site Settings

Access: `/admin/settings`

Upload and manage:
1. **Hero Banner Image** - Homepage background (1920x1080px recommended)
2. **Services Banner Image** - Services page background (1920x1080px recommended)
3. **Contact Banner Image** - Contact page background (1920x1080px recommended)
4. **CA Profile Photo** - About Us page photo (800x800px square recommended)

All images are uploaded through the admin panel with preview functionality.

## About Us Page

- Features CA Apsara Babu profile
- No specific years of experience mentioned (uses "experienced young CA")
- Professional expertise highlighted
- Photo placeholder (upload via Admin Settings)
- Fully responsive design

## WhatsApp Integration

Update the WhatsApp number in `/src/app/components/WhatsAppButton.tsx`:
- Line 5: Replace `919999999999` with your actual WhatsApp number
- Format: country code + number (no + or spaces)
- Example: `919876543210` for +91 98765 43210

## Vercel Deployment

This project is ready to deploy to Vercel:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Vercel will auto-detect Vite and build with correct settings
4. No additional configuration needed

## Color Scheme

The website uses the following brand colors:
- Primary Blue: #0A70A1
- Secondary Orange: #F3782C

These are already configured in `/src/styles/theme.css`

## Pages Structure

### Public Pages:
- Home (`/`)
- Services (`/services`)
- About Us (`/about`)
- Contact (`/contact`)
- Login (`/login`)
- Signup (`/signup`)
- Forgot Password (`/forgot-password`)

### Admin Pages:
- Dashboard (`/admin`) - Client list with search
- Client Documents (`/admin/client/:id`) - Two-section document management
- Site Settings (`/admin/settings`) - Banner & photo uploads

### Client Pages:
- Dashboard (`/client`) - Two-section document view

## Admin Features

✅ Client management (add, delete, reset password)
✅ Generate invite links
✅ Two-section document management:
  - Documents from Client (read-only for admin)
  - Documents from CA (upload/manage for admin)
✅ Site settings for image uploads
✅ Search functionality
✅ Confirmation dialogs for all major actions

## Client Features

✅ Upload documents to "My Documents"
✅ View/download CA documents (read-only)
✅ Rename, download, delete own documents
✅ Cannot edit/delete CA documents
✅ Mobile-responsive interface

## Next Steps (After Design Approval)

1. WhatsApp number integration
2. Contact form email setup (EmailJS or Supabase Edge Function)
3. Supabase backend connection
4. Client portal authentication
5. Document upload/download with Supabase Storage
6. Image upload functionality in Site Settings
7. Implement actual banner images from database

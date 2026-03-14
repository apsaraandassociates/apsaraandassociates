# Supabase Setup Guide for Apsara & Associates

## Prerequisites
- Supabase account (create at https://supabase.com)
- Node.js installed
- Git installed

## Step 1: Create Supabase Project

1. Go to https://supabase.com and sign in
2. Click "New Project"
3. Fill in project details:
   - **Name**: apsara-associates (or your choice)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to your location
4. Wait for project to be created (~2 minutes)

## Step 2: Get Your Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (under Project URL)
   - **anon/public key** (under Project API keys - anon public)
   - **service_role key** (under Project API keys - service_role) - Keep this SECRET!

## Step 3: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy the contents of `supabase/schema.sql` file
4. Paste and click "Run"
5. Repeat for `supabase/storage-setup.sql`
6. Repeat for `supabase/functions.sql`

## Step 4: Configure Storage Buckets

The storage buckets should be created automatically by the SQL scripts. Verify:
1. Go to **Storage** in Supabase dashboard
2. You should see these buckets:
   - `client-documents` (private)
   - `site-images` (public)

## Step 5: Set Up Email Templates (Optional)

1. Go to **Authentication** → **Email Templates**
2. Customize the email templates for:
   - Confirm signup
   - Magic Link
   - Change Email Address
   - Reset Password

## Step 6: Enable Authentication Providers

1. Go to **Authentication** → **Providers**
2. Enable **Email** provider (should be enabled by default)
3. Configure email settings:
   - **Enable email confirmations**: OFF (we use OTP)
   - **Enable email change confirmations**: ON

## Step 7: Local Development Setup

1. Copy files from Figma Make to your VS Code project
2. Create `.env` file in root directory:
   ```bash
   cp .env.example .env
   ```
3. Edit `.env` and add your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   VITE_ADMIN_EMAIL=apsara@apsaraassociates.com
   ```
4. Install dependencies:
   ```bash
   npm install
   ```
5. Run development server:
   ```bash
   npm run dev
   ```

## Step 8: Deploy to Vercel

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin your-github-repo-url
   git push -u origin main
   ```

2. Go to https://vercel.com and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Configure Environment Variables:
   - Add `VITE_SUPABASE_URL`
   - Add `VITE_SUPABASE_ANON_KEY`
   - Add `VITE_ADMIN_EMAIL`
6. Click "Deploy"

## Step 9: Set Up Contact Form Email (Using Supabase Edge Function)

The contact form uses a Supabase Edge Function to send emails. To set this up:

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Login to Supabase:
   ```bash
   supabase login
   ```

3. Link your project:
   ```bash
   supabase link --project-ref your-project-id
   ```

4. Deploy the edge function:
   ```bash
   supabase functions deploy send-contact-email
   ```

5. Set up email service secrets (choose one):

   **Option A: Using Resend (Recommended)**
   - Sign up at https://resend.com
   - Get your API key
   - Set the secret:
     ```bash
     supabase secrets set RESEND_API_KEY=your_resend_api_key
     ```

   **Option B: Using SendGrid**
   - Sign up at https://sendgrid.com
   - Get your API key
   - Set the secret:
     ```bash
     supabase secrets set SENDGRID_API_KEY=your_sendgrid_api_key
     ```

## Step 10: Create First Admin User

1. Go to **Authentication** → **Users** in Supabase dashboard
2. Click "Add user" → "Create new user"
3. Fill in:
   - **Email**: your-admin-email@example.com
   - **Password**: Create a strong password
   - **Auto Confirm User**: YES
4. Click "Create user"
5. Go to **SQL Editor** and run:
   ```sql
   UPDATE profiles 
   SET role = 'admin', full_name = 'Admin Name'
   WHERE email = 'your-admin-email@example.com';
   ```

## Step 11: Test Your Application

1. Visit your deployed URL or localhost
2. Test admin login
3. Test client registration flow
4. Test document upload
5. Test contact form

## Important Security Notes

⚠️ **NEVER commit `.env` file to GitHub!**
⚠️ **Add `.env` to `.gitignore`**
⚠️ **Only use `VITE_` prefixed variables in frontend code**
⚠️ **Keep `service_role` key secret - only use in Vercel environment or Edge Functions**

## Troubleshooting

### Email not sending from contact form
- Check Edge Function logs in Supabase dashboard
- Verify email service API key is set correctly
- Check that `VITE_ADMIN_EMAIL` is set in environment variables

### Users can't upload documents
- Check storage bucket policies in `supabase/storage-setup.sql`
- Verify user is authenticated
- Check browser console for errors

### Admin can't access portal
- Verify user role is set to 'admin' in profiles table
- Check authentication state in browser dev tools

## Need Help?

- Supabase Documentation: https://supabase.com/docs
- Supabase Discord: https://discord.supabase.com

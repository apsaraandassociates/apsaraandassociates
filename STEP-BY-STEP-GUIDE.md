# 🚀 Step-by-Step Setup Guide - Apsara & Associates

Follow these steps **EXACTLY** in order. Don't skip any step!

---

## 📋 Quick Navigation

**Choose your path:**

1. **🗄️ Backend Setup First (Recommended)** 
   - If you want detailed Supabase setup with screenshots and explanations
   - **Go to:** `/SUPABASE-BACKEND-GUIDE.md` (Steps 1-11)
   - Then come back here for Steps 12-16

2. **⚡ Quick Setup (This Guide)**
   - If you want everything in one place
   - Follow Steps 1-16 below

---

## 📖 Additional Guides Available

- **🗄️ Backend Details:** `/SUPABASE-BACKEND-GUIDE.md` - Detailed Supabase setup
- **🌐 SEO Setup:** `/SEO-SETUP-GUIDE.md` - Google indexing & analytics
- **🚀 Deployment:** `/DEPLOYMENT.md` - Vercel deployment guide
- **⚡ Quick Reference:** `/QUICK-START.md` - Quick commands

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 1: Create Supabase Project
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 5 minutes

**💡 TIP:** For detailed explanations and screenshots, see `/SUPABASE-BACKEND-GUIDE.md`

### 1.1 Sign Up / Login to Supabase
1. Open your browser
2. Go to: **https://supabase.com**
3. Click **"Start your project"** or **"Sign In"**
4. Login with your **OWN account** (not santosh's account)

### 1.2 Create New Project
1. After login, you'll see the dashboard
2. Click **"New Project"** button (green button)
3. You'll see a form - Fill it in:
   - **Name**: `apsara-associates` (or any name you want)
   - **Database Password**: Create a STRONG password
     - Example: `ApsAra@2024$SecureDB` 
     - ⚠️ **SAVE THIS PASSWORD** - You'll need it later!
   - **Region**: Choose closest to India (like `Southeast Asia (Singapore)`)
   - **Pricing Plan**: Free (or your choice)
4. Click **"Create new project"**
5. ⏳ Wait 2-3 minutes for project to be created (you'll see a loading screen)

**✅ DONE! Project created**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 2: Get Your Supabase Credentials
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 2 minutes

### 2.1 Find Your Project Settings
1. Once your project is created, you'll see the project dashboard
2. On the left sidebar, click the **Settings** icon (⚙️ gear icon at bottom)
3. Under Settings, click **"API"**

### 2.2 Copy Project URL
1. You'll see a section called **"Project URL"**
2. It looks like: `https://abcdefghijk.supabase.co`
3. Click the **Copy** icon next to it
4. **Paste it in a Notepad** - Label it as: `PROJECT_URL`

### 2.3 Copy Anon/Public Key
1. Scroll down to **"Project API keys"** section
2. Find **"anon public"** (it's a long string of characters)
3. Click the **Copy** icon next to it
4. **Paste it in your Notepad** - Label it as: `ANON_KEY`
5. ⚠️ This is a LONG key - make sure you copied the ENTIRE thing

### 2.4 Copy Service Role Key (KEEP SECRET!)
1. In the same **"Project API keys"** section
2. Find **"service_role"** (another long string)
3. Click **"Reveal"** button first (you may need to confirm)
4. Click the **Copy** icon
5. **Paste it in your Notepad** - Label it as: `SERVICE_ROLE_KEY`
6. ⚠️ **NEVER share this key publicly!**

### 2.5 Get Project ID (for CLI)
1. Look at your Project URL: `https://abcdefghijk.supabase.co`
2. The part before `.supabase.co` is your Project ID
3. Example: If URL is `https://xyzproject.supabase.co`, then ID is `xyzproject`
4. **Write this down** in your Notepad - Label it as: `PROJECT_ID`

**Your Notepad should now have:**
```
PROJECT_URL: https://xyzproject.supabase.co
ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5enByb2plY3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NjU...
SERVICE_ROLE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5enByb2plY3QiLCJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0...
PROJECT_ID: xyzproject
```

**✅ DONE! Keep this Notepad open - you'll need it in next steps**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 3: Copy Files from Figma to VS Code
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 5 minutes

### 3.1 Download Files from Figma Make
1. In Figma Make interface, download/export all your project files
2. Save them to a folder on your computer
3. Example: `C:\Users\YourName\Documents\apsara-associates`

### 3.2 Open in VS Code
1. Open **Visual Studio Code**
2. Click **File** → **Open Folder**
3. Select the folder where you saved the files
4. Click **Select Folder**

### 3.3 Verify Files Are There
In VS Code left sidebar, you should see:
- ✅ `src/` folder
- ✅ `supabase/` folder
- ✅ `public/` folder
- ✅ `package.json`
- ✅ `index.html`
- ✅ `.env.example`
- ✅ `.gitignore`
- ✅ All the .md files (README, QUICK-START, etc.)

**✅ DONE! Files copied to VS Code**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 4: Create .env File
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 3 minutes

### 4.1 Create the File
1. In VS Code, look at the left sidebar (file explorer)
2. Right-click in the empty space (below files)
3. Click **"New File"**
4. Name it **exactly**: `.env` (with the dot at the start!)
5. Press Enter

### 4.2 Fill in Your Credentials
1. The `.env` file should now be open in VS Code
2. Copy and paste this template:

```env
# Supabase Configuration
VITE_SUPABASE_URL=PASTE_YOUR_PROJECT_URL_HERE
VITE_SUPABASE_ANON_KEY=PASTE_YOUR_ANON_KEY_HERE

# Admin Email
VITE_ADMIN_EMAIL=apsara@apsaraassociates.com
```

3. Now replace the placeholders:
   - Replace `PASTE_YOUR_PROJECT_URL_HERE` with your actual PROJECT_URL from Notepad
   - Replace `PASTE_YOUR_ANON_KEY_HERE` with your actual ANON_KEY from Notepad

### 4.3 Example of Filled .env File
```env
# Supabase Configuration
VITE_SUPABASE_URL=https://xyzproject.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5enByb2plY3QiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTY0NjU...

# Admin Email
VITE_ADMIN_EMAIL=apsara@apsaraassociates.com
```

4. **Save the file** (Ctrl+S or Cmd+S)

**✅ DONE! Your .env file is ready**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 5: Install Dependencies
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 3 minutes

### 5.1 Open Terminal in VS Code
1. In VS Code, click **Terminal** in top menu
2. Click **New Terminal**
3. A terminal panel will open at the bottom

### 5.2 Run Install Command
1. In the terminal, type:
```bash
npm install
```
2. Press **Enter**
3. ⏳ Wait 2-3 minutes while it installs all packages
4. You'll see lots of text scrolling - this is normal
5. When done, you'll see the command prompt again

**✅ DONE! All packages installed**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 6: Set Up Database
# ═══════════════════════════════════════════════════��═══

⏱️ **Time:** 10 minutes

### 6.1 Open Supabase SQL Editor
1. Go back to your browser with Supabase dashboard
2. On the left sidebar, click **"SQL Editor"** icon (looks like `</>`)
3. Click **"New Query"** button

### 6.2 Run First SQL Script (schema.sql)
1. In VS Code, open the file: `supabase/schema.sql`
2. **Select ALL the text** (Ctrl+A or Cmd+A)
3. **Copy it** (Ctrl+C or Cmd+C)
4. Go back to Supabase SQL Editor in browser
5. **Paste** the SQL code into the editor (Ctrl+V or Cmd+V)
6. Click **"Run"** button (or press Ctrl+Enter)
7. ⏳ Wait 5-10 seconds
8. You should see **"Success. No rows returned"** or similar message
9. ✅ If you see green checkmark = SUCCESS!
10. ❌ If you see red error = Take a screenshot and let me know

### 6.3 Run Second SQL Script (storage-setup.sql)
1. Click **"New Query"** again to get a fresh editor
2. In VS Code, open the file: `supabase/storage-setup.sql`
3. **Select ALL the text** (Ctrl+A)
4. **Copy it** (Ctrl+C)
5. Go back to Supabase SQL Editor
6. **Paste** the SQL code (Ctrl+V)
7. Click **"Run"** button
8. ⏳ Wait 5-10 seconds
9. ✅ You should see success message

### 6.4 Verify Database Tables Created
1. On left sidebar in Supabase, click **"Table Editor"** icon
2. You should now see these tables:
   - ✅ `profiles`
   - ✅ `client_registration_links`
   - ✅ `documents`
   - ✅ `site_settings`
   - ✅ `contact_submissions`
   - ✅ `otp_verifications`

### 6.5 Verify Storage Buckets Created
1. On left sidebar in Supabase, click **"Storage"** icon
2. You should see these buckets:
   - ✅ `client-documents`
   - ✅ `site-images`

**✅ DONE! Database is set up**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 7: Set Up Email Service - Resend
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 10 minutes

### 7.1 Sign Up for Resend
1. Open new browser tab
2. Go to: **https://resend.com**
3. Click **"Start Building"** or **"Sign Up"**
4. Sign up with your email
5. Verify your email address (check inbox)

### 7.2 Get Resend API Key
1. After login, you'll see Resend dashboard
2. On left sidebar, click **"API Keys"**
3. Click **"Create API Key"** button
4. Give it a name: `Apsara Associates`
5. Permission: Select **"Sending access"**
6. Click **"Create"**
7. You'll see your API key (starts with `re_`)
8. **Copy it immediately** (you can only see it once!)
9. **Paste in your Notepad** - Label it as: `RESEND_API_KEY`

Example:
```
RESEND_API_KEY: re_123abc456def789ghi012jkl345mno678
```

**✅ DONE! Keep this key in Notepad**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 8: Install Supabase CLI
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 5 minutes

### 8.1 Install Supabase CLI Globally
1. In VS Code terminal, type:
```bash
npm install -g supabase
```
2. Press **Enter**
3. ⏳ Wait 1-2 minutes for installation
4. When done, verify by typing:
```bash
supabase --version
```
5. You should see a version number like `1.x.x`

### 8.2 Login to Supabase CLI
1. In terminal, type:
```bash
supabase login
```
2. Press **Enter**
3. A browser window will open asking you to authorize
4. Click **"Authorize"** or **"Allow"**
5. You'll see "Successfully logged in" message in browser
6. Go back to VS Code terminal
7. You should see "Logged in" message

### 8.3 Link Your Project
1. In terminal, type (replace `xyzproject` with YOUR project ID):
```bash
supabase link --project-ref xyzproject
```
2. Press **Enter**
3. It will ask for your database password
4. Type the password you created in STEP 1.2
5. Press **Enter**
6. You should see "Linked project successfully"

**✅ DONE! CLI is ready**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 9: Set Secrets for Edge Functions
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 3 minutes

### 9.1 Set Resend API Key Secret
1. In VS Code terminal, type (replace with YOUR actual key):
```bash
supabase secrets set RESEND_API_KEY=re_123abc456def789ghi012jkl345mno678
```
2. Press **Enter**
3. Wait for confirmation

### 9.2 Set Admin Email Secret
1. In terminal, type:
```bash
supabase secrets set ADMIN_EMAIL=apsara@apsaraassociates.com
```
2. Press **Enter**
3. Wait for confirmation

### 9.3 Verify Secrets Are Set
1. In terminal, type:
```bash
supabase secrets list
```
2. Press **Enter**
3. You should see:
   - `RESEND_API_KEY`
   - `ADMIN_EMAIL`

**✅ DONE! Secrets are set**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 10: Deploy Edge Functions
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 5 minutes

### 10.1 Deploy Contact Email Function
1. In VS Code terminal, type:
```bash
supabase functions deploy send-contact-email
```
2. Press **Enter**
3. ⏳ Wait 1-2 minutes
4. You should see "Deployed function send-contact-email"

### 10.2 Deploy OTP Function
1. In terminal, type:
```bash
supabase functions deploy send-otp
```
2. Press **Enter**
3. ⏳ Wait 1-2 minutes
4. You should see "Deployed function send-otp"

### 10.3 Verify Functions Are Deployed
1. Go to Supabase dashboard in browser
2. On left sidebar, click **"Edge Functions"**
3. You should see:
   - ✅ `send-contact-email`
   - ✅ `send-otp`

**✅ DONE! Edge functions are live**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 11: Create First Admin User
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 5 minutes

### 11.1 Create User in Supabase Dashboard
1. In Supabase dashboard, click **"Authentication"** in left sidebar
2. Click **"Users"** tab at the top
3. Click **"Add user"** button (top right)
4. Select **"Create new user"**
5. Fill in the form:
   - **Email**: Your email address (example: `admin@apsaraassociates.com`)
   - **Password**: Create a strong password (you'll use this to login)
   - **Auto Confirm User**: ✅ **CHECK THIS BOX!** (very important)
6. Click **"Create user"**

### 11.2 Make This User an Admin
1. Click **"SQL Editor"** in left sidebar
2. Click **"New Query"**
3. Copy and paste this (replace email with YOUR email):
```sql
UPDATE profiles 
SET role = 'admin', full_name = 'Admin Name'
WHERE email = 'admin@apsaraassociates.com';
```
4. Click **"Run"**
5. You should see "Success. 1 rows affected"

### 11.3 Verify Admin User
1. Click **"Table Editor"** in left sidebar
2. Click on **"profiles"** table
3. You should see your user with:
   - Email: admin@apsaraassociates.com
   - Role: admin
   - Full name: Admin Name

**✅ DONE! Admin user created**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 12: Setup Favicon & SEO (IMPORTANT!)
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 15 minutes

### 12.1 Create Favicon
1. Open `/public/favicon-instructions.txt` in VS Code
2. Follow the instructions to generate favicon files
3. **Quick Method:**
   - Go to: https://favicon.io/favicon-converter/
   - Upload your CA logo (512x512px)
   - Download the generated files
   - Copy ALL files to `/public` folder in VS Code

### 12.2 Update SEO Information
1. Open `/index.html` in VS Code
2. Update these fields:
   - Replace `https://www.apsaraassociates.com` with your ACTUAL domain
   - Update phone number: `+91-XXXXX-XXXXX`
   - Update email address
   - Update business address

3. Open `/src/lib/seo-config.ts`
4. Update all business information:
   - `siteUrl`
   - `phone`
   - `email`
   - `address`
   - Social media links (if you have them)

### 12.3 Update Sitemap & Robots.txt
1. Open `/public/sitemap.xml`
2. Replace ALL instances of `https://www.apsaraassociates.com` with your actual domain

3. Open `/public/robots.txt`
4. Replace the sitemap URL with your actual domain

### 12.4 Create Open Graph Image (For Social Media)
1. Create an image (1200x630px) with your logo and business name
2. Use Canva: https://www.canva.com/create/og-images/
3. Save as `og-image.jpg`
4. Copy to `/public` folder

**✅ DONE! Favicon and SEO configured**

**📖 For detailed SEO setup (Google Search Console, Analytics), see `/SEO-SETUP-GUIDE.md`**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 13: Test Locally
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 5 minutes

### 13.1 Start Development Server
1. In VS Code terminal, type:
```bash
npm run dev
```
2. Press **Enter**
3. Wait 10-20 seconds
4. You'll see a message like:
   ```
   Local: http://localhost:5173
   ```

### 13.2 Open Website in Browser
1. Open your browser
2. Go to: **http://localhost:5173**
3. You should see your Apsara & Associates website!

### 13.3 Test Admin Login
1. On the website, click **"Client Portal"** in navigation
2. Click **"Admin Login"** or **"Login"**
3. Enter:
   - **Email**: admin@apsaraassociates.com (the email you used)
   - **Password**: (the password you created)
4. Click **"Login"**
5. You should be logged in and see the admin dashboard!

### 13.4 Test Creating a Client
1. In admin dashboard, click **"Create Registration Link"**
2. Enter a client name: `Test Client`
3. Click **"Create Link"**
4. You should see a link generated!
5. Copy the link and open it in a new browser tab (incognito mode)
6. Fill in the registration form
7. You should receive an OTP email!

**✅ DONE! Everything is working locally!**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 14: Push to GitHub
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 10 minutes

### 14.1 Initialize Git Repository
1. In VS Code terminal, type:
```bash
git init
```
2. Press **Enter**

### 14.2 Add All Files
1. In terminal, type:
```bash
git add .
```
2. Press **Enter**

### 14.3 Commit Files
1. In terminal, type:
```bash
git commit -m "Initial commit - Apsara Associates website"
```
2. Press **Enter**

### 14.4 Create GitHub Repository
1. Open browser and go to: **https://github.com**
2. Login to your account
3. Click **"+"** icon (top right)
4. Click **"New repository"**
5. Fill in:
   - **Repository name**: `apsara-associates`
   - **Description**: (optional)
   - **Private** or **Public**: Your choice
   - ⚠️ **DO NOT** check "Initialize with README"
6. Click **"Create repository"**

### 14.5 Push to GitHub
1. Copy the commands shown on GitHub (should look like):
```bash
git remote add origin https://github.com/yourusername/apsara-associates.git
git branch -M main
git push -u origin main
```
2. Paste each command in VS Code terminal one by one
3. Press **Enter** after each command
4. You may need to login to GitHub
5. When done, refresh your GitHub repository page
6. You should see all your files there!

**✅ DONE! Code is on GitHub**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 15: Deploy to Vercel
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 10 minutes

### 15.1 Sign Up / Login to Vercel
1. Open browser and go to: **https://vercel.com**
2. Click **"Sign Up"** (or **"Login"**)
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your GitHub

### 15.2 Import Project
1. On Vercel dashboard, click **"Add New..."** button
2. Click **"Project"**
3. You'll see a list of your GitHub repositories
4. Find **"apsara-associates"**
5. Click **"Import"**

### 15.3 Configure Project
1. **Project Name**: Leave as `apsara-associates` (or change if you want)
2. **Framework Preset**: Should auto-detect as **Vite**
3. **Root Directory**: Leave as `./`
4. **Build Command**: Leave as default
5. **Output Directory**: Leave as default

### 15.4 Add Environment Variables (IMPORTANT!)
1. Expand **"Environment Variables"** section
2. Add these **3 variables** one by one:

**Variable 1:**
- **Name**: `VITE_SUPABASE_URL`
- **Value**: Paste your PROJECT_URL from Notepad
- Click **"Add"**

**Variable 2:**
- **Name**: `VITE_SUPABASE_ANON_KEY`
- **Value**: Paste your ANON_KEY from Notepad
- Click **"Add"**

**Variable 3:**
- **Name**: `VITE_ADMIN_EMAIL`
- **Value**: `apsara@apsaraassociates.com`
- Click **"Add"**

### 15.5 Deploy!
1. Click **"Deploy"** button
2. ⏳ Wait 2-5 minutes (you'll see build logs)
3. When done, you'll see 🎉 **"Congratulations!"**
4. Click **"Visit"** to see your live website!

### 15.6 Get Your Live URL
1. Your website URL will be something like:
   ```
   https://apsara-associates.vercel.app
   ```
2. **Save this URL** - this is your live website!

**✅ DONE! Website is LIVE on the internet! 🎉**

---

# ═══════════════════════════════════════════════════════
# 📌 STEP 16: Setup Google Indexing (OPTIONAL)
# ═══════════════════════════════════════════════════════

⏱️ **Time:** 20 minutes

This step will make your website appear in Google search results.

**📖 See complete guide:** `/SEO-SETUP-GUIDE.md`

**Quick Steps:**

1. **Google Search Console**
   - Go to: https://search.google.com/search-console
   - Add your website
   - Verify ownership
   - Submit sitemap

2. **Google Analytics**
   - Go to: https://analytics.google.com
   - Create property
   - Get Measurement ID
   - Add to `/index.html`

**✅ DONE! Your website will appear in Google search in 1-7 days**

---

# 🎊 ALL DONE! 

## Your Website is Now:
- ✅ Running on Vercel
- ✅ Connected to Supabase database
- ✅ Emails working with Resend
- ✅ Admin account created
- ✅ Favicon configured
- ✅ SEO optimized
- ✅ Ready to use!

## What You Can Do Now:
1. **Visit your live website** at your Vercel URL
2. **Login as admin** with your credentials
3. **Create client registration links**
4. **Upload site images** in Site Settings
5. **Test contact form**
6. **Setup Google Search Console** (see SEO-SETUP-GUIDE.md)

## Important URLs to Save:
- 🌐 **Live Website**: https://your-project.vercel.app
- 🗄️ **Supabase Dashboard**: https://supabase.com/dashboard/project/your-project-id
- 📧 **Resend Dashboard**: https://resend.com/emails
- 📦 **Vercel Dashboard**: https://vercel.com/dashboard

---

# 🆘 If You Get Stuck

**Error in STEP X?** 
- Take a screenshot
- Note which step number
- Let me know and I'll help!

**Common Issues:**
- "Permission denied" → Make sure you're logged in to the right account
- "Invalid API key" → Double-check you copied the entire key
- "Build failed" → Check environment variables in Vercel
- "Favicon not showing" → Hard refresh browser (Ctrl+Shift+R)

---

**Need help? Let me know which step you're on and what error you're seeing!**

---

**Last Updated:** March 14, 2026
**Version:** 2.0
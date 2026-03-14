# 🗄️ Supabase & Backend Setup Guide

Complete step-by-step guide for setting up your Supabase backend, database, authentication, storage, and email functions.

---

## 📋 What You'll Set Up

- ✅ Supabase Project & Database
- ✅ Authentication System
- ✅ Database Tables & Storage Buckets
- ✅ Email Service (Resend)
- ✅ Edge Functions (Contact Form & OTP)
- ✅ Admin User Account

**Total Time: ~60 minutes**

---

# ═══════════════════════════════════════════════════════
# 📌 PART 1: SUPABASE PROJECT SETUP
# ═══════════════════════════════════════════════════════

## STEP 1: Create Supabase Account & Project

⏱️ **Time:** 5 minutes

### 1.1 Sign Up for Supabase

1. Open your browser
2. Go to: **https://supabase.com**
3. Click **"Start your project"** (green button)
4. You can sign up with:
   - GitHub account (recommended)
   - Google account
   - Email & password

**Screenshot Check:** You should see the Supabase dashboard after login

---

### 1.2 Create New Project

1. After login, click **"New Project"** button
2. You'll see a form with these fields:

**Fill in the form:**

| Field | What to Enter | Example |
|-------|--------------|---------|
| **Name** | Your project name | `apsara-associates` |
| **Database Password** | Strong password (SAVE THIS!) | `ApsAra@2024$SecureDB` |
| **Region** | Closest to India | `Southeast Asia (Singapore)` |
| **Pricing Plan** | Free (or paid if needed) | Free |

3. Click **"Create new project"**

**⏳ WAIT:** Project creation takes 2-3 minutes (loading screen will show progress)

---

### 1.3 What You Just Created

✅ PostgreSQL Database
✅ Authentication System
✅ Storage Buckets
✅ API Endpoints
✅ Real-time Subscriptions

---

**🎯 CHECKPOINT:** Your Supabase project dashboard should now be visible!

---

# ═══════════════════════════════════════════════════════
# 📌 PART 2: GET YOUR CREDENTIALS
# ═══════════════════════════════════════════════════════

## STEP 2: Copy Your Supabase Credentials

⏱️ **Time:** 3 minutes

### 2.1 Open Project Settings

1. In Supabase dashboard, look at the **left sidebar**
2. Click the **⚙️ Settings** icon (gear icon at the bottom)
3. Click **"API"** in the settings menu

---

### 2.2 Get Project URL

1. Find section: **"Project URL"**
2. You'll see a URL like: `https://abcdefghijk.supabase.co`
3. Click the **📋 Copy** icon next to it

**📝 SAVE THIS:**
Open Notepad/TextEdit and paste:
```
PROJECT_URL: https://your-project-id.supabase.co
```

---

### 2.3 Get Anon/Public Key

1. Scroll down to: **"Project API keys"**
2. Find **"anon public"** key
3. Click **📋 Copy** button

**📝 SAVE THIS:**
```
ANON_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS...
```

⚠️ **NOTE:** This is a VERY LONG key (200+ characters) - make sure you copied it ALL!

---

### 2.4 Get Service Role Key (SECRET!)

1. Still in **"Project API keys"** section
2. Find **"service_role"** key
3. Click **"Reveal"** button (you may need to confirm)
4. Click **📋 Copy** button

**📝 SAVE THIS:**
```
SERVICE_ROLE_KEY: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
```

🔒 **SECURITY WARNING:** 
- NEVER share this key publicly
- NEVER commit it to GitHub
- NEVER put it in frontend code

---

### 2.5 Get Project ID

1. Look at your **Project URL**: `https://xyzproject.supabase.co`
2. The part BEFORE `.supabase.co` is your **Project ID**
3. Example: If URL is `https://myproject123.supabase.co`, then ID is `myproject123`

**📝 SAVE THIS:**
```
PROJECT_ID: myproject123
```

---

### 2.6 Your Complete Credentials Checklist

**You should now have in your Notepad:**

```
✅ PROJECT_URL: https://xyzproject.supabase.co
✅ ANON_KEY: eyJhbGciOiJI... (very long)
✅ SERVICE_ROLE_KEY: eyJhbGciOiJI... (very long)
✅ PROJECT_ID: xyzproject
✅ DATABASE_PASSWORD: (from Step 1.2)
```

**🎯 CHECKPOINT:** Keep this Notepad open - you'll need these values throughout setup!

---

# ═══════════════════════════════════════════════════════
# 📌 PART 3: DATABASE SETUP
# ═══════════════════════════════════════════════════════

## STEP 3: Create Database Tables

⏱️ **Time:** 8 minutes

### 3.1 Open SQL Editor

1. In Supabase dashboard, click **"SQL Editor"** in left sidebar (icon: `</>`)
2. Click **"+ New query"** button (top right)
3. You'll see a blank SQL editor

---

### 3.2 Run schema.sql (Creates All Tables)

**What this does:**
- Creates user profiles table
- Creates client registration links table
- Creates documents table
- Creates site settings table
- Creates contact submissions table
- Creates OTP verification table
- Sets up Row Level Security (RLS)
- Creates database triggers

**Follow these steps:**

1. Open VS Code (your project folder)
2. Navigate to file: `supabase/schema.sql`
3. **Select ALL text** (Ctrl+A or Cmd+A)
4. **Copy** (Ctrl+C or Cmd+C)
5. Go back to Supabase SQL Editor in browser
6. **Paste** into the editor (Ctrl+V or Cmd+V)
7. Click **"Run"** button (or press Ctrl+Enter)

**⏳ WAIT:** 5-10 seconds while SQL executes

**✅ SUCCESS LOOKS LIKE:**
- Green checkmark appears
- Message: "Success. No rows returned" or similar
- No red error messages

**❌ ERROR?**
- Take a screenshot
- Check you copied the ENTIRE file
- Make sure you're in a new, blank query

---

### 3.3 Verify Tables Were Created

1. In left sidebar, click **"Table Editor"** icon
2. You should now see these tables:

**Required Tables:**
```
✅ profiles
✅ client_registration_links
✅ documents
✅ site_settings
✅ contact_submissions
✅ otp_verifications
```

**Click on each table to verify it exists!**

---

### 3.4 Understanding What Each Table Does

| Table Name | Purpose |
|------------|---------|
| **profiles** | Stores user information (admin & clients) |
| **client_registration_links** | Registration links created by admin |
| **documents** | Client uploaded documents |
| **site_settings** | Website images (hero, banners, profile photo) |
| **contact_submissions** | Contact form submissions |
| **otp_verifications** | OTP codes for password reset |

---

**🎯 CHECKPOINT:** All 6 tables should be visible in Table Editor!

---

# ═══════════════════════════════════════════════════════
# 📌 PART 4: STORAGE SETUP
# ═══════════════════════════════════════════════════════

## STEP 4: Create Storage Buckets

⏱️ **Time:** 5 minutes

### 4.1 Run storage-setup.sql

**What this does:**
- Creates `client-documents` bucket (for client file uploads)
- Creates `site-images` bucket (for website images)
- Sets up access policies

**Follow these steps:**

1. In Supabase, click **"SQL Editor"** → **"+ New query"**
2. In VS Code, open: `supabase/storage-setup.sql`
3. **Select ALL text** (Ctrl+A)
4. **Copy** (Ctrl+C)
5. **Paste** into Supabase SQL Editor (Ctrl+V)
6. Click **"Run"** button

**⏳ WAIT:** 5-10 seconds

**✅ SUCCESS:** Green checkmark, "Success" message

---

### 4.2 Verify Storage Buckets

1. In left sidebar, click **"Storage"** icon
2. You should see:

**Required Buckets:**
```
✅ client-documents
✅ site-images
```

3. Click on each bucket to verify it exists

---

### 4.3 Understanding Storage Buckets

| Bucket Name | Purpose | Access |
|-------------|---------|--------|
| **client-documents** | Client uploaded PDFs, images | Private (user's own files only) |
| **site-images** | Hero images, banners, CA profile photo | Public |

---

**🎯 CHECKPOINT:** Both storage buckets should be visible!

---

# ═══════════════════════════════════════════════════════
# 📌 PART 5: EMAIL SERVICE SETUP
# ═══════════════════════════════════════════════════════

## STEP 5: Setup Resend Email Service

⏱️ **Time:** 10 minutes

### 5.1 Why Resend?

Your website needs to send emails for:
- ✅ Contact form submissions → to your email
- ✅ OTP codes → for password reset
- ✅ Client notifications

Resend is a reliable email service with a generous free tier.

---

### 5.2 Create Resend Account

1. Open new browser tab
2. Go to: **https://resend.com**
3. Click **"Start Building"** or **"Sign Up"**
4. Sign up with:
   - Email address (recommended)
   - Or GitHub account

5. **Verify your email** (check inbox/spam)
6. Complete the signup process

---

### 5.3 Get Resend API Key

1. After login, you'll see Resend dashboard
2. In left sidebar, click **"API Keys"**
3. Click **"+ Create API Key"** button

**Fill in the form:**

| Field | Value |
|-------|-------|
| **Name** | `Apsara Associates` |
| **Permission** | Sending access |
| **Domain** | All domains (default) |

4. Click **"Create"**
5. You'll see your API key (starts with `re_`)

**⚠️ IMPORTANT:** You can only see this key ONCE!

6. Click **📋 Copy** immediately

---

### 5.4 Save Your Resend API Key

**📝 SAVE THIS in your Notepad:**
```
RESEND_API_KEY: re_123abc456def789ghi012jkl345mno678
```

**Example of what it looks like:**
```
re_A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6
```

---

### 5.5 Add "From" Email Address

Resend requires you to verify which email address emails will be sent FROM.

**Option A: Use Your Domain (Recommended for Production)**

1. In Resend dashboard, click **"Domains"**
2. Click **"+ Add Domain"**
3. Enter your domain: `apsaraassociates.com`
4. Follow DNS setup instructions
5. Verify domain

**Option B: Use Resend Test Email (For Testing Only)**

1. Use: `onboarding@resend.dev`
2. This works immediately, no setup needed
3. ⚠️ But emails may go to spam

**For now, you can use Option B to test. Switch to Option A after deployment.**

---

**🎯 CHECKPOINT:** You have your RESEND_API_KEY saved!

---

# ═══════════════════════════════════════════════════════
# 📌 PART 6: SUPABASE CLI SETUP
# ═══════════════════════════════════════════════════════

## STEP 6: Install & Configure Supabase CLI

⏱️ **Time:** 8 minutes

### 6.1 Why Do You Need the CLI?

The Supabase CLI (Command Line Interface) lets you:
- ✅ Deploy Edge Functions (contact form, OTP sender)
- ✅ Set secret environment variables
- ✅ Link your local project to Supabase

---

### 6.2 Open Terminal in VS Code

1. Open VS Code with your project
2. Click **"Terminal"** in top menu
3. Click **"New Terminal"**
4. Terminal panel opens at bottom

---

### 6.3 Install Supabase CLI Globally

**Type this command in terminal:**

```bash
npm install -g supabase
```

Press **Enter**

**⏳ WAIT:** 1-2 minutes for installation

**Verify it worked:**

```bash
supabase --version
```

Press **Enter**

**✅ SUCCESS:** You should see version number like `1.x.x` or `2.x.x`

---

### 6.4 Login to Supabase

**Type this command:**

```bash
supabase login
```

Press **Enter**

**What happens:**
1. A browser window will open automatically
2. You'll see: "Authorize Supabase CLI?"
3. Click **"Authorize"** button
4. Browser shows: "Successfully authorized!"
5. Go back to VS Code terminal
6. You'll see: "Logged in successfully"

**❌ Browser didn't open?**
- Copy the URL from terminal
- Paste in browser manually
- Continue with authorization

---

### 6.5 Link Your Project

This connects your local code to your Supabase project.

**Type this command (replace `YOUR-PROJECT-ID` with your actual project ID from Step 2.5):**

```bash
supabase link --project-ref YOUR-PROJECT-ID
```

**Example:**
```bash
supabase link --project-ref myproject123
```

Press **Enter**

**It will ask:** "Enter your database password:"

**Type:** The database password you created in Step 1.2

⚠️ **NOTE:** You won't see the password as you type (this is normal for security)

Press **Enter**

**⏳ WAIT:** 5-10 seconds

**✅ SUCCESS:** "Linked to project successfully"

---

**🎯 CHECKPOINT:** You're now logged in and linked to your Supabase project!

---

# ═══════════════════════════════════════════════════════
# 📌 PART 7: SET SECRET ENVIRONMENT VARIABLES
# ═══════════════════════════════════════════════════════

## STEP 7: Configure Edge Function Secrets

⏱️ **Time:** 3 minutes

### 7.1 What Are Secrets?

Secrets are sensitive values (like API keys) that Edge Functions need, but shouldn't be visible in your code.

**You need to set:**
- ✅ Resend API Key (for sending emails)
- ✅ Admin Email (where contact forms are sent)

---

### 7.2 Set Resend API Key

**Type this command (replace with YOUR actual Resend API key from Step 5.4):**

```bash
supabase secrets set RESEND_API_KEY=re_YOUR_ACTUAL_KEY_HERE
```

**Example:**
```bash
supabase secrets set RESEND_API_KEY=re_A1B2C3D4E5F6G7H8I9J0K1L2M3N4O5P6
```

Press **Enter**

**⏳ WAIT:** 5 seconds

**✅ SUCCESS:** "Finished supabase secrets set."

---

### 7.3 Set Admin Email

**Type this command (replace with YOUR actual email):**

```bash
supabase secrets set ADMIN_EMAIL=apsara@apsaraassociates.com
```

**Example:**
```bash
supabase secrets set ADMIN_EMAIL=youremail@yourdomain.com
```

Press **Enter**

**✅ SUCCESS:** "Finished supabase secrets set."

---

### 7.4 Verify Secrets Were Set

**Type this command:**

```bash
supabase secrets list
```

Press **Enter**

**You should see:**
```
NAME                VALUE
─────────────────   ──────────────
RESEND_API_KEY      re_A1B2C3... (partially hidden)
ADMIN_EMAIL         apsara@apsaraassociates.com
```

---

**🎯 CHECKPOINT:** Both secrets are set and visible in the list!

---

# ═══════════════════════════════════════════════════════
# 📌 PART 8: DEPLOY EDGE FUNCTIONS
# ═══════════════════════════════════════════════════════

## STEP 8: Deploy Email & OTP Functions

⏱️ **Time:** 5 minutes

### 8.1 What Are Edge Functions?

Edge Functions are serverless functions that run on Supabase servers. They handle:

1. **send-contact-email** → Sends contact form submissions to your email
2. **send-otp** → Sends OTP codes for password reset

---

### 8.2 Deploy Contact Email Function

**Type this command:**

```bash
supabase functions deploy send-contact-email
```

Press **Enter**

**What you'll see:**
```
Deploying send-contact-email (project ref: your-project-id)
Bundling...
Deploying...
Deployed! (2.5s)
```

**⏳ WAIT:** 30-60 seconds

**✅ SUCCESS:** "Deployed!"

---

### 8.3 Deploy OTP Function

**Type this command:**

```bash
supabase functions deploy send-otp
```

Press **Enter**

**⏳ WAIT:** 30-60 seconds

**✅ SUCCESS:** "Deployed!"

---

### 8.4 Verify Functions in Dashboard

1. Go to Supabase dashboard in browser
2. Click **"Edge Functions"** in left sidebar
3. You should see:

**Required Functions:**
```
✅ send-contact-email
✅ send-otp
```

4. Click on each function to see details
5. You'll see "Last deployed: X minutes ago"

---

### 8.5 Understanding Function URLs

Each function has a unique URL:

```
https://YOUR-PROJECT-ID.supabase.co/functions/v1/send-contact-email
https://YOUR-PROJECT-ID.supabase.co/functions/v1/send-otp
```

Your frontend code will call these URLs automatically!

---

**🎯 CHECKPOINT:** Both functions deployed and visible in dashboard!

---

# ═══════════════════════════════════════════════════════
# 📌 PART 9: CREATE ADMIN USER
# ═══════════════════════════════════════════════════════

## STEP 9: Setup Your Admin Account

⏱️ **Time:** 5 minutes

### 9.1 Why Create Admin User Manually?

The first admin user needs to be created directly in Supabase because:
- Registration links are created BY admins
- Someone needs to be admin first
- This is a one-time setup

---

### 9.2 Create User in Authentication

1. In Supabase dashboard, click **"Authentication"** in left sidebar
2. Click **"Users"** tab at top
3. Click **"Add user"** button (top right)
4. Select **"Create new user"**

---

### 9.3 Fill in User Details

**Form fields:**

| Field | What to Enter | Example |
|-------|--------------|---------|
| **Email** | Your email address | `admin@apsaraassociates.com` |
| **Password** | Strong password (you'll use this to login) | `Admin@2024Secure!` |
| **Auto Confirm User** | ✅ **CHECK THIS BOX!** | Very important! |

**⚠️ IMPORTANT:** 
- Remember this email and password - you'll use it to login as admin!
- Make sure "Auto Confirm User" is CHECKED!

4. Click **"Create user"** button

**✅ SUCCESS:** User appears in the users list

---

### 9.4 Make This User an Admin

By default, new users are "client" role. You need to change this to "admin".

**Follow these steps:**

1. Click **"SQL Editor"** in left sidebar
2. Click **"+ New query"**
3. Copy this SQL (replace email with YOUR admin email):

```sql
UPDATE profiles 
SET role = 'admin', full_name = 'Admin Name'
WHERE email = 'admin@apsaraassociates.com';
```

4. Paste into SQL Editor
5. **IMPORTANT:** Change the email to YOUR email
6. **OPTIONAL:** Change 'Admin Name' to your actual name
7. Click **"Run"**

**✅ SUCCESS:** "Success. 1 rows affected"

---

### 9.5 Verify Admin User

1. Click **"Table Editor"** in left sidebar
2. Click on **"profiles"** table
3. Find your user row
4. Verify these columns:

**Should show:**
```
Email: admin@apsaraassociates.com
Role: admin
Full Name: Admin Name
```

---

### 9.6 Save Your Admin Credentials

**📝 ADD TO YOUR NOTEPAD:**
```
ADMIN LOGIN CREDENTIALS:
Email: admin@apsaraassociates.com
Password: Admin@2024Secure!
```

⚠️ **Keep this safe!** You'll need it to login to your website.

---

**🎯 CHECKPOINT:** Admin user created and verified in profiles table!

---

# ═══════════════════════════════════════════════════════
# 📌 PART 10: LOCAL ENVIRONMENT SETUP
# ═══════════════════════════════════════════════════════

## STEP 10: Configure Your Local .env File

⏱️ **Time:** 3 minutes

### 10.1 Why .env File?

Your React app needs to know:
- Where your Supabase project is (URL)
- How to authenticate (Anon Key)
- Where to send admin emails

---

### 10.2 Create .env File

1. In VS Code, look at the file explorer (left sidebar)
2. Right-click in empty space
3. Click **"New File"**
4. Name it **exactly**: `.env`
5. Press **Enter**

**⚠️ IMPORTANT:** The file name starts with a DOT (.)

---

### 10.3 Add Your Credentials

The `.env` file should now be open. Copy and paste this template:

```env
# Supabase Configuration
VITE_SUPABASE_URL=YOUR_PROJECT_URL_HERE
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE

# Admin Email
VITE_ADMIN_EMAIL=apsara@apsaraassociates.com
```

---

### 10.4 Replace Placeholders with YOUR Values

Now replace the placeholders with your actual values from your Notepad:

**FROM YOUR NOTEPAD:**
- Replace `YOUR_PROJECT_URL_HERE` with your PROJECT_URL
- Replace `YOUR_ANON_KEY_HERE` with your ANON_KEY
- Update the admin email if different

---

### 10.5 Example of Completed .env File

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://myproject123.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...

# Admin Email
VITE_ADMIN_EMAIL=admin@apsaraassociates.com
```

---

### 10.6 Save the File

Press **Ctrl+S** (or Cmd+S on Mac) to save

---

### 10.7 Security Check

**Verify .gitignore:**

1. Open `.gitignore` file in VS Code
2. Make sure it contains:
```
.env
.env.local
```

This prevents your secrets from being uploaded to GitHub!

---

**🎯 CHECKPOINT:** .env file created and saved with your credentials!

---

# ═══════════════════════════════════════════════════════
# 📌 PART 11: TEST EVERYTHING LOCALLY
# ═══════════════════════════════════════════════════════

## STEP 11: Test Your Backend Setup

⏱️ **Time:** 10 minutes

### 11.1 Install Dependencies

**In VS Code terminal, type:**

```bash
npm install
```

Press **Enter**

**⏳ WAIT:** 2-3 minutes while packages install

**✅ SUCCESS:** You'll see "added XXX packages"

---

### 11.2 Start Development Server

**Type this command:**

```bash
npm run dev
```

Press **Enter**

**⏳ WAIT:** 10-20 seconds

**You'll see:**
```
  VITE v6.x.x ready in 500 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

---

### 11.3 Open Website in Browser

1. Open your browser
2. Go to: **http://localhost:5173**
3. Your website should load!

---

### 11.4 Test #1: Admin Login

**Steps:**

1. On your website, click **"Client Portal"** in navigation
2. Click **"Admin Login"** or **"Login"**
3. Enter your admin credentials:
   - **Email:** admin@apsaraassociates.com
   - **Password:** Admin@2024Secure!
4. Click **"Login"**

**✅ SUCCESS:** You're redirected to Admin Dashboard!

**❌ ERROR?**
- Double-check credentials
- Verify admin user was created in Step 9
- Check browser console for errors (F12)

---

### 11.5 Test #2: Create Client Registration Link

**Steps:**

1. In Admin Dashboard, click **"Create Registration Link"**
2. Enter client name: `Test Client`
3. Click **"Create Link"**
4. You should see a registration link generated!

**✅ SUCCESS:** Link appears with copy button

**What this proves:**
- ✅ Database connection works
- ✅ Authentication works
- ✅ Tables are accessible

---

### 11.6 Test #3: Client Registration (Optional)

**Steps:**

1. **Copy** the registration link you just created
2. Open a new **Incognito/Private browser window** (Ctrl+Shift+N)
3. **Paste** the registration link
4. Fill in the registration form:
   - Full Name: `Test Client`
   - Email: `testclient@example.com`
   - Phone: `9876543210`
   - Password: `Test@123`
5. Click **"Register"**

**✅ SUCCESS:** You receive an OTP (check email or spam folder)

**What this proves:**
- ✅ Edge functions work
- ✅ Email sending works
- ✅ OTP generation works

---

### 11.7 Test #4: Contact Form (Optional)

**Steps:**

1. Go to **Contact Us** page
2. Fill in the contact form:
   - Name: `Test User`
   - Email: `test@example.com`
   - Message: `Testing contact form`
3. Click **"Send Message"**

**✅ SUCCESS:** "Message sent successfully!" notification

**Check your admin email:** You should receive the contact form submission!

**What this proves:**
- ✅ Contact form edge function works
- ✅ Email delivery works
- ✅ Form validation works

---

### 11.8 Check Database Data

**Verify in Supabase Dashboard:**

1. Go to Supabase dashboard
2. Click **"Table Editor"**
3. Check these tables:

**profiles table:**
- Should show admin user
- Should show test client (if you did Test #3)

**client_registration_links table:**
- Should show the link you created

**contact_submissions table:**
- Should show the contact form submission (if you did Test #4)

---

**🎯 CHECKPOINT:** Everything works locally! Backend is fully functional!

---

# ═══════════════════════════════════════════════════════
# 🎊 BACKEND SETUP COMPLETE!
# ═══════════════════════════════════════════════════════

## ✅ What You've Successfully Set Up:

### Supabase Project
- ✅ Project created
- ✅ Credentials saved
- ✅ Region configured

### Database
- ✅ 6 tables created
- ✅ Row Level Security configured
- ✅ Database triggers set up

### Storage
- ✅ client-documents bucket
- ✅ site-images bucket
- ✅ Access policies configured

### Email Service
- ✅ Resend account created
- ✅ API key obtained
- ✅ Secrets configured

### Edge Functions
- ✅ send-contact-email deployed
- ✅ send-otp deployed
- ✅ Functions tested

### Authentication
- ✅ Admin user created
- ✅ Login tested
- ✅ Roles configured

### Local Environment
- ✅ .env file configured
- ✅ Dependencies installed
- ✅ App tested locally

---

## 📝 Your Complete Credentials Sheet

**Save this information securely:**

```
═══════════════════════════════════════════
SUPABASE CREDENTIALS
═══════════════════════════════════════════
Project URL: https://your-project.supabase.co
Anon Key: eyJhbGc...
Service Role Key: eyJhbGc... (KEEP SECRET!)
Project ID: your-project-id
Database Password: your-db-password

═══════════════════════════════════════════
RESEND CREDENTIALS
═══════════════════════════════════════════
API Key: re_ABC123...

═══════════════════════════════════════════
ADMIN LOGIN
═══════════════════════════════════════════
Email: admin@apsaraassociates.com
Password: your-admin-password

═══════════════════════════════════════════
ADMIN EMAIL (Contact Form Destination)
═══════════════════════════════════════════
Email: apsara@apsaraassociates.com
```

---

## 🚀 Next Steps

Your backend is ready! Now you need to:

1. **Setup Favicon & SEO** → See Step 12 in STEP-BY-STEP-GUIDE.md
2. **Deploy to Vercel** → See Step 15 in STEP-BY-STEP-GUIDE.md
3. **Setup Google Search Console** → See Step 16 or SEO-SETUP-GUIDE.md

---

## 🆘 Troubleshooting

### Issue: Can't login as admin
**Solution:**
- Verify user was created in Authentication > Users
- Verify role is 'admin' in profiles table
- Check .env file has correct credentials

### Issue: Edge functions not working
**Solution:**
- Run `supabase secrets list` to verify secrets are set
- Check function logs in Supabase dashboard
- Verify Resend API key is valid

### Issue: Database tables missing
**Solution:**
- Re-run schema.sql in SQL Editor
- Check for red error messages
- Verify you're in the correct project

### Issue: "Project not linked" error
**Solution:**
- Run `supabase link --project-ref YOUR-PROJECT-ID` again
- Verify you're logged in: `supabase login`

---

## 📚 Related Guides

- **Complete Setup:** `/STEP-BY-STEP-GUIDE.md`
- **SEO Setup:** `/SEO-SETUP-GUIDE.md`
- **Deployment:** `/DEPLOYMENT.md`
- **Quick Start:** `/QUICK-START.md`

---

## 🎯 Testing Checklist

Before moving to deployment, verify:

- [ ] Admin can login
- [ ] Can create registration links
- [ ] Client can register using link
- [ ] OTP email is received
- [ ] Contact form works
- [ ] Contact email is received
- [ ] All 6 tables exist
- [ ] Both storage buckets exist
- [ ] Edge functions are deployed
- [ ] No console errors in browser

---

**🎉 Congratulations! Your backend is fully configured and tested!**

**Ready to deploy?** Continue with STEP-BY-STEP-GUIDE.md from Step 12!

---

**Last Updated:** March 14, 2026
**Version:** 1.0

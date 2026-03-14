# Quick Start Guide - Apsara & Associates

This is a condensed guide to get you up and running quickly. For detailed information, see the full documentation files.

## 🚀 5-Minute Setup (Local Testing)

### Step 1: Get Supabase Credentials (2 min)
1. Go to https://supabase.com and create a new project
2. Wait for project creation (~2 min)
3. Go to **Settings** → **API** and copy:
   - Project URL
   - anon/public key

### Step 2: Configure Environment (1 min)
1. Create `.env` file in root folder
2. Add these lines (paste your actual values):
```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_ADMIN_EMAIL=apsara@apsaraassociates.com
```

### Step 3: Install & Run (2 min)
```bash
npm install
npm run dev
```

Visit http://localhost:5173 - Your site is now running! 🎉

> **Note**: Database features won't work yet - you need to set up the database first (see below).

---

## 📊 Complete Setup (30 minutes)

### 1. Set Up Database (10 min)

In your Supabase dashboard:

**A. Create Tables**
1. Go to **SQL Editor**
2. Copy contents of `supabase/schema.sql`
3. Paste and click "Run"
4. Wait for confirmation

**B. Set Up Storage**
1. Still in **SQL Editor**
2. Copy contents of `supabase/storage-setup.sql`
3. Paste and click "Run"
4. Wait for confirmation

### 2. Set Up Email Service (10 min)

**Option 1: Resend (Recommended)**
1. Sign up at https://resend.com (free tier)
2. Get your API key
3. Keep it handy for next step

**Option 2: SendGrid**
1. Sign up at https://sendgrid.com
2. Get your API key
3. Keep it handy for next step

### 3. Deploy Edge Functions (5 min)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project (get project-ref from Supabase dashboard URL)
supabase link --project-ref your-project-id

# Set secrets
supabase secrets set RESEND_API_KEY=your_resend_key
supabase secrets set ADMIN_EMAIL=apsara@apsaraassociates.com

# Deploy functions
supabase functions deploy send-contact-email
supabase functions deploy send-otp
```

### 4. Create Admin User (5 min)

**Method 1: Via Dashboard**
1. Supabase → **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Enter your email and password
4. ✅ Check "Auto Confirm User"
5. Click "Create user"
6. Go to **SQL Editor** and run:
```sql
UPDATE profiles 
SET role = 'admin', full_name = 'Your Name'
WHERE email = 'your-email@example.com';
```

### 5. Test Everything
```bash
npm run dev
```

Test these features:
- ✅ Admin login
- ✅ Create client registration link
- ✅ Register as client using link
- ✅ Upload document
- ✅ Submit contact form

---

## 🚢 Deploy to Production (15 minutes)

### 1. Push to GitHub (5 min)
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/apsara-associates.git
git push -u origin main
```

### 2. Deploy to Vercel (10 min)
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Add environment variables:
   ```
   VITE_SUPABASE_URL = https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY = your_anon_key
   VITE_ADMIN_EMAIL = apsara@apsaraassociates.com
   ```
5. Click "Deploy"
6. Wait 2-3 minutes
7. Visit your live site! 🎉

---

## 📋 Checklist

Use this checklist to ensure everything is set up correctly:

### Supabase Setup
- [ ] Project created
- [ ] Database schema executed
- [ ] Storage buckets created
- [ ] Edge functions deployed
- [ ] Email service configured (Resend/SendGrid)
- [ ] Admin user created

### Local Development
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file created with correct values
- [ ] Development server running (`npm run dev`)
- [ ] Can access site at localhost:5173

### Testing
- [ ] Admin can login
- [ ] Can create client registration link
- [ ] Client can register using link
- [ ] OTP email received and verified
- [ ] Client can upload document
- [ ] Contact form sends email
- [ ] All pages load correctly
- [ ] Mobile responsive

### Deployment
- [ ] Code pushed to GitHub
- [ ] Deployed to Vercel
- [ ] Environment variables set in Vercel
- [ ] Production site accessible
- [ ] All features working in production

---

## 🆘 Common Issues

### "Invalid API credentials"
- Check your `.env` file
- Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are correct
- Restart dev server after changing `.env`

### "Cannot connect to database"
- Ensure you ran `supabase/schema.sql` in Supabase SQL Editor
- Check Supabase project is active
- Verify your Supabase URL is correct

### "Email not sending"
- Check edge functions are deployed: `supabase functions list`
- Verify RESEND_API_KEY is set: `supabase secrets list`
- Check function logs in Supabase dashboard

### "Permission denied" when uploading documents
- Ensure user is logged in
- Check storage policies were created (run `storage-setup.sql`)
- Verify user's profile role is set correctly

### "Page not found" on Vercel
- Make sure `vercel.json` exists in your project
- Check rewrites configuration
- Redeploy if needed

---

## 📞 Need Help?

1. **Check documentation**:
   - `README.md` - Overview and features
   - `supabase-setup.md` - Detailed Supabase guide
   - `DEPLOYMENT.md` - Deployment troubleshooting

2. **Check official docs**:
   - Supabase: https://supabase.com/docs
   - Vercel: https://vercel.com/docs
   - Resend: https://resend.com/docs

3. **Common resources**:
   - React Router: https://reactrouter.com
   - Tailwind CSS: https://tailwindcss.com
   - Radix UI: https://radix-ui.com

---

## 🎯 What's Next?

After successful deployment:

1. **Add your content**:
   - Update hero images via admin panel
   - Customize service descriptions
   - Update contact information

2. **Configure domain** (optional):
   - Add custom domain in Vercel
   - Update DNS settings
   - Verify domain in Resend for email sending

3. **Monitor usage**:
   - Check Supabase dashboard for database usage
   - Review Vercel analytics
   - Monitor email sending limits

4. **Start using**:
   - Create client accounts
   - Share registration links
   - Receive contact form submissions
   - Manage documents

---

**Congratulations! Your professional CA firm website is ready! 🎊**

Need to make changes? All the code is in `src/app/` - feel free to customize as needed!

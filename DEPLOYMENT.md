# Deployment Guide - Apsara & Associates

## Quick Start Checklist

- [ ] Copy all files from Figma Make to your local VS Code
- [ ] Create `.env` file with Supabase credentials
- [ ] Install dependencies (`npm install`)
- [ ] Run database schema in Supabase
- [ ] Deploy edge functions
- [ ] Set up email service (Resend)
- [ ] Create admin user
- [ ] Push to GitHub
- [ ] Deploy to Vercel
- [ ] Test all features

## Detailed Steps

### 1. Copy Files to VS Code

1. Download/copy all files from Figma Make to your local machine
2. Open the project folder in VS Code

### 2. Create .env File

Create a `.env` file in the root directory:

```bash
# Copy from .env.example
cp .env.example .env
```

Edit `.env` and add your actual values:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
VITE_ADMIN_EMAIL=apsara@apsaraassociates.com
```

**Important:** Never commit `.env` to GitHub! It's already in `.gitignore`.

### 3. Install Dependencies

```bash
npm install
```

### 4. Set Up Supabase Database

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Execute each SQL file in order:
   - First: `supabase/schema.sql`
   - Second: `supabase/storage-setup.sql`

### 5. Set Up Email Service (Resend)

1. Sign up at https://resend.com (free tier available)
2. Verify your domain or use Resend's test domain
3. Get your API key from the dashboard
4. You'll need this for the edge functions

### 6. Deploy Edge Functions

Install Supabase CLI:
```bash
npm install -g supabase
```

Login and link your project:
```bash
supabase login
supabase link --project-ref your-project-id
```

Set secrets:
```bash
supabase secrets set RESEND_API_KEY=your_resend_api_key
supabase secrets set ADMIN_EMAIL=apsara@apsaraassociates.com
```

Deploy functions:
```bash
supabase functions deploy send-contact-email
supabase functions deploy send-otp
```

### 7. Create First Admin User

Method 1: Via Supabase Dashboard
1. Go to **Authentication** → **Users**
2. Click "Add user" → "Create new user"
3. Enter email and password
4. Check "Auto Confirm User"
5. Create user
6. Go to **SQL Editor** and run:
```sql
UPDATE profiles 
SET role = 'admin', full_name = 'Your Name'
WHERE email = 'your-email@example.com';
```

Method 2: Via SQL (do this after user signs up on your site)
```sql
UPDATE profiles 
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

### 8. Test Locally

```bash
npm run dev
```

Visit http://localhost:5173 and test:
- Admin login
- Client registration
- Document upload
- Contact form

### 9. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Apsara & Associates website"
git branch -M main
git remote add origin https://github.com/your-username/apsara-associates.git
git push -u origin main
```

**Important:** Make sure `.env` is in `.gitignore` before pushing!

### 10. Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with GitHub
3. Click "New Project"
4. Import your repository
5. Configure environment variables:
   ```
   VITE_SUPABASE_URL = your_supabase_url
   VITE_SUPABASE_ANON_KEY = your_anon_key
   VITE_ADMIN_EMAIL = apsara@apsaraassociates.com
   ```
6. Click "Deploy"
7. Wait for deployment to complete
8. Visit your live site!

### 11. Configure Custom Domain (Optional)

1. In Vercel, go to your project settings
2. Navigate to "Domains"
3. Add your custom domain (e.g., apsaraassociates.com)
4. Follow Vercel's instructions to update your DNS settings
5. Wait for DNS propagation (~24 hours)

## Environment Variables Reference

### Required for Local Development
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_ADMIN_EMAIL=apsara@apsaraassociates.com
```

### Required for Vercel Deployment
Same as above - add them in Vercel project settings under "Environment Variables"

### Required for Supabase Edge Functions (set via CLI)
```
RESEND_API_KEY=re_xxxxx
ADMIN_EMAIL=apsara@apsaraassociates.com
```

## File Structure

```
apsara-associates/
├── src/
│   ├── app/
│   │   ├── components/      # React components
│   │   ├── pages/           # Page components
│   │   └── App.tsx          # Main app
│   ├── lib/
│   │   └── supabase.ts      # Supabase client & helpers
│   └── styles/              # CSS files
├── supabase/
│   ├── schema.sql           # Database schema
│   ├── storage-setup.sql    # Storage buckets
│   └── functions/           # Edge functions
│       ├── send-contact-email/
│       └── send-otp/
├── .env.example             # Example env file
├── .gitignore              # Git ignore rules
├── package.json            # Dependencies
├── supabase-setup.md       # Detailed setup guide
└── DEPLOYMENT.md           # This file
```

## Important Notes

### Security
- **NEVER** commit `.env` file to GitHub
- Keep your `SUPABASE_SERVICE_ROLE_KEY` secret
- Only use `VITE_` prefixed variables in frontend code
- The anon key is safe to use in frontend (it has RLS protection)

### Email Setup
- Resend free tier: 100 emails/day, 3,000/month
- For production, verify your domain in Resend
- Update email "from" addresses in edge functions after domain verification

### Storage
- Client documents are private (RLS protected)
- Site images are public
- Max file size: 50MB for documents, 10MB for images

### Database
- Row Level Security (RLS) is enabled on all tables
- Admins have full access
- Clients can only access their own data

## Troubleshooting

### Edge Functions Not Working
- Check function logs in Supabase dashboard
- Verify secrets are set: `supabase secrets list`
- Ensure RESEND_API_KEY is valid
- Check CORS errors in browser console

### Users Can't Login
- Verify user exists in Supabase Auth dashboard
- Check if email is confirmed
- Verify Supabase URL and anon key in `.env`
- Check browser console for errors

### Documents Not Uploading
- Check storage bucket policies
- Verify user is authenticated
- Check file size limits
- Look for errors in browser console

### Contact Form Not Sending
- Check edge function deployment
- Verify RESEND_API_KEY is set
- Check email service status
- Look at edge function logs

## Support

For issues with:
- **Supabase**: https://supabase.com/docs
- **Vercel**: https://vercel.com/docs
- **Resend**: https://resend.com/docs
- **React Router**: https://reactrouter.com/docs

## Next Steps After Deployment

1. **Test thoroughly**
   - All authentication flows
   - Document uploads
   - Contact form
   - Mobile responsiveness

2. **Configure email templates**
   - Customize in Supabase Auth settings
   - Match your brand colors

3. **Add content**
   - Upload hero images via admin panel
   - Add service descriptions
   - Update contact information

4. **Monitor**
   - Check Supabase dashboard for usage
   - Monitor Vercel analytics
   - Review contact form submissions

5. **Backup**
   - Regularly backup database
   - Keep local copies of uploaded files
   - Document any custom changes

## Production Checklist

Before going live:
- [ ] All environment variables set
- [ ] Admin user created and tested
- [ ] Email sending working
- [ ] OTP verification working
- [ ] Document upload/download working
- [ ] Contact form tested
- [ ] Mobile responsiveness checked
- [ ] All links working
- [ ] Images optimized
- [ ] SSL certificate active (automatic with Vercel)
- [ ] Domain configured (if using custom domain)
- [ ] Analytics set up (optional)
- [ ] Error monitoring set up (optional)

Congratulations! Your Apsara & Associates website is now live! 🎉

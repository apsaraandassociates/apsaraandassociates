# Apsara & Associates - CA Firm Website

A modern, professional website for Apsara & Associates, Chartered Accountants, built with React, TypeScript, Tailwind CSS, and Supabase.

## 🌟 Features

### Public Website
- **Modern Design** - Blue (#0A70A1) and Orange (#F3782C) color scheme
- **Responsive Layout** - Mobile-friendly design with tight layouts and cards
- **Three Main Pages**:
  - Home - Hero section, services overview, and call-to-action
  - Services - Detailed service offerings
  - About Us - Information about CA Apsara Babu
  - Contact Us - Contact form with WhatsApp integration

### Client Portal
- **User Authentication**
  - Admin login for firm management
  - Client login with self-registration
  - OTP verification for registration and password reset
  - Forgot password functionality
  
- **Document Management**
  - Clients can upload documents to their dedicated folders
  - Admins can view and manage all client documents
  - Secure file storage with Supabase Storage
  
- **Client Registration System**
  - Admin creates shareable registration link with just client name
  - Client receives link and self-registers with their details
  - OTP email verification before password creation
  - Automatic folder creation for document storage

### Admin Features
- **User Management**
  - View all clients
  - Add new clients
  - Update client details
  - Delete clients (with confirmation)
  - Reset client passwords
  
- **Site Settings Panel**
  - Upload and manage hero images
  - Update services banner
  - Change contact banner
  - Update CA profile photo
  
- **Contact Form Management**
  - View all contact submissions
  - Email notifications to apsara@apsaraassociates.com
  - Track submission status

## 🚀 Tech Stack

- **Frontend**: React 18.3, TypeScript, Vite
- **Styling**: Tailwind CSS v4, Motion (Framer Motion)
- **Routing**: React Router v7 (Data mode)
- **Backend**: Supabase
  - Authentication
  - PostgreSQL Database
  - Storage (File uploads)
  - Edge Functions (Email sending)
- **UI Components**: Radix UI, Lucide Icons
- **Email Service**: Resend API

## 📦 Project Structure

```
apsara-associates/
├── src/
│   ├── app/
│   │   ├── components/          # Reusable React components
│   │   │   ├── ui/              # UI components (buttons, inputs, etc.)
│   │   │   ├── Header.tsx       # Site header with navigation
│   │   │   ├── Footer.tsx       # Site footer
│   │   │   └── ...
│   │   ├── pages/               # Page components
│   │   │   ├── Home.tsx         # Homepage
│   │   │   ├── Services.tsx     # Services page
│   │   │   ├── About.tsx        # About Us page
│   │   │   ├── Contact.tsx      # Contact page
│   │   │   └── portal/          # Client portal pages
│   │   ├── routes.ts            # React Router configuration
│   │   └── App.tsx              # Main app component
│   ├── lib/
│   │   └── supabase.ts          # Supabase client and helper functions
│   ├── styles/
│   │   ├── index.css            # Global styles
│   │   ├── theme.css            # Theme variables
│   │   └── fonts.css            # Font imports
│   └── imports/                 # Imported assets (images, SVGs)
├── supabase/
│   ├── schema.sql               # Database schema and policies
│   ├── storage-setup.sql        # Storage buckets configuration
│   └── functions/               # Supabase Edge Functions
│       ├── send-contact-email/  # Contact form email handler
│       └── send-otp/            # OTP verification handler
├── .env.example                 # Example environment variables
├── .gitignore                   # Git ignore rules
├── package.json                 # Project dependencies
├── supabase-setup.md            # Detailed Supabase setup guide
├── DEPLOYMENT.md                # Deployment instructions
└── README.md                    # This file
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js 18+ installed
- Git installed
- Supabase account (free tier available)
- Resend account (for email sending)

### Quick Start

1. **Clone or copy the project**
   ```bash
   # If using Git
   git clone your-repo-url
   cd apsara-associates
   
   # Or copy all files from Figma Make to your local folder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   VITE_ADMIN_EMAIL=apsara@apsaraassociates.com
   ```

4. **Set up Supabase**
   - See `supabase-setup.md` for detailed instructions
   - Run the SQL scripts in your Supabase project
   - Deploy edge functions
   - Create your first admin user

5. **Run development server**
   ```bash
   npm run dev
   ```
   
   Visit http://localhost:5173

6. **Deploy to production**
   - See `DEPLOYMENT.md` for step-by-step deployment guide
   - Push to GitHub
   - Deploy to Vercel

## 📚 Documentation

- **[Supabase Setup Guide](supabase-setup.md)** - Complete guide for setting up Supabase backend
- **[Deployment Guide](DEPLOYMENT.md)** - Instructions for deploying to production
- **[.env.example](.env.example)** - Required environment variables

## 🔑 Key Features Explained

### Authentication Flow
1. **Admin**: Direct login with email/password
2. **Client Registration**:
   - Admin creates registration link with client name
   - Client clicks link and enters details (name, email, phone)
   - OTP sent to client's email
   - Client verifies OTP
   - Client creates password
   - Account created and ready to use

### Document Upload System
- Each client has a dedicated folder (using their user ID)
- Clients can only access their own documents
- Admins can access all client documents
- Supported formats: PDF, DOC, DOCX, XLS, XLSX, images
- Max file size: 50MB

### Contact Form
- Form data saved to database
- Email sent to admin (apsara@apsaraassociates.com)
- WhatsApp integration for instant chat
- Admin can view and manage submissions in portal

### Site Settings
- Admins can upload/change:
  - Hero section background image
  - Services page banner
  - Contact page banner
  - About Us profile photo
- Images stored in public Supabase Storage bucket
- Changes reflect immediately on the site

## 🔒 Security

- **Row Level Security (RLS)** enabled on all database tables
- **Storage Policies** ensure clients can only access their own files
- **Environment Variables** keep sensitive data secure
- **OTP Verification** for secure registration and password reset
- **Password Hashing** handled by Supabase Auth
- **HTTPS** enforced (automatic with Vercel)

## 🎨 Design System

### Colors
- **Primary Blue**: #0A70A1
- **Secondary Orange**: #F3782C
- **Text**: Gray scale (900, 700, 600)
- **Background**: White, Blue-50, Orange-50

### Typography
- System font stack for optimal performance
- Responsive font sizes
- Consistent spacing

### Components
- Built with Radix UI for accessibility
- Consistent styling with Tailwind CSS
- Smooth animations with Motion

## 📱 Mobile Responsiveness

- Fully responsive design
- Mobile-first approach
- Touch-friendly interface
- Optimized for small screens
- Hamburger menu on mobile
- Stacked layouts for easy viewing

## 🚀 Performance

- **Vite** for fast development and optimized builds
- **Code splitting** with React Router
- **Lazy loading** for images
- **Optimized assets**
- **CDN delivery** via Vercel

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 📧 Email Configuration

The project uses Resend for email delivery:
- Contact form submissions
- OTP verification codes
- Account notifications

**Important**: Update the `from` email address in edge functions after verifying your domain in Resend.

## 🔧 Customization

### Adding New Services
Edit `src/app/pages/Services.tsx`

### Changing Contact Information
Edit `src/app/pages/Contact.tsx` and `src/app/components/Footer.tsx`

### Updating Colors
Edit `src/styles/theme.css`

### Adding New Pages
1. Create component in `src/app/pages/`
2. Add route in `src/app/routes.ts`
3. Update navigation in `src/app/components/Header.tsx`

## 🐛 Troubleshooting

See `DEPLOYMENT.md` for common issues and solutions.

## 📝 License

This project is proprietary and confidential.
© 2026 Apsara & Associates. All rights reserved.

## 👥 Support

For technical support or questions:
- Review the setup guides in this repository
- Check Supabase documentation: https://supabase.com/docs
- Check Vercel documentation: https://vercel.com/docs

## 🎯 Future Enhancements (Optional)

- [ ] SMS notifications via Twilio
- [ ] Invoice generation and management
- [ ] Calendar for appointments
- [ ] Blog/News section
- [ ] Client testimonials
- [ ] Multi-language support
- [ ] Advanced analytics dashboard
- [ ] Automated reminders for compliance deadlines

---

Built with ❤️ for Apsara & Associates

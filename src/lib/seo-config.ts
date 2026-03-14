// SEO Configuration for Apsara & Associates
// Update these values with your actual business information

export const seoConfig = {
  // Basic Information
  siteName: "Apsara & Associates",
  siteUrl: "https://www.apsaraassociates.com", // Update with your actual domain
  defaultTitle: "Apsara & Associates | Expert CA Services",
  defaultDescription: "Professional Chartered Accountant services including Taxation, Audit, GST, Business Registration, and Financial Consulting. Expert CA services you can trust.",
  
  // Business Contact
  phone: "+91 XXXXX XXXXX", // Update with actual phone
  email: "apsara@apsaraassociates.com",
  address: "Your Business Address Here", // Update with actual address
  
  // Social Media (Update with actual URLs)
  social: {
    facebook: "https://facebook.com/apsaraassociates",
    twitter: "https://twitter.com/apsaraassociates",
    linkedin: "https://linkedin.com/company/apsaraassociates",
    instagram: "https://instagram.com/apsaraassociates",
  },
  
  // Keywords for SEO
  keywords: [
    "Chartered Accountant",
    "CA Services",
    "Taxation Services",
    "GST Registration",
    "Audit Services",
    "Income Tax Filing",
    "Business Registration",
    "Financial Consulting",
    "Accounting Services",
    "CA Near Me",
    "Professional CA",
  ],
  
  // Google Analytics (Add your GA4 Measurement ID)
  googleAnalytics: "G-XXXXXXXXXX", // Replace with your actual GA4 ID
  
  // Google Search Console (Will be verified during setup)
  googleSiteVerification: "", // Add after Google Search Console verification
};

// Helper function to generate meta tags
export const generateMetaTags = (page: {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}) => {
  const title = page.title 
    ? `${page.title} | ${seoConfig.siteName}` 
    : seoConfig.defaultTitle;
  
  const description = page.description || seoConfig.defaultDescription;
  const keywords = page.keywords || seoConfig.keywords;
  const url = page.url ? `${seoConfig.siteUrl}${page.url}` : seoConfig.siteUrl;
  const image = page.image || `${seoConfig.siteUrl}/og-image.jpg`;
  
  return {
    title,
    description,
    keywords: keywords.join(", "),
    url,
    image,
  };
};

// Page-specific SEO data
export const pageSEO = {
  home: {
    title: "Home",
    description: "Expert Chartered Accountant services for individuals and businesses. Professional taxation, audit, GST, and financial consulting services.",
    keywords: ["CA Services", "Chartered Accountant", "Tax Consultant", "Audit Services"],
  },
  services: {
    title: "Our Services",
    description: "Comprehensive CA services including Income Tax, GST, Audit, Business Registration, ROC Compliance, and Financial Planning.",
    keywords: ["CA Services", "Taxation", "GST", "Audit", "Business Registration", "ROC Compliance"],
  },
  about: {
    title: "About Us",
    description: "Learn about CA Apsara Babu and our commitment to providing excellent chartered accountant services.",
    keywords: ["About CA", "Chartered Accountant", "Professional CA Services"],
  },
  contact: {
    title: "Contact Us",
    description: "Get in touch with Apsara & Associates for professional CA services. We're here to help with all your taxation and audit needs.",
    keywords: ["Contact CA", "CA Consultation", "Professional Tax Services"],
  },
};

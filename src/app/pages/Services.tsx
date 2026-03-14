import { useEffect } from "react";
import { useLocation, Link } from "react-router";
import { motion } from "motion/react";
import { Building2, Calculator, FileText, TrendingUp, BarChart3, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { useSiteSettings } from "../hooks/useSiteSettings";

export function Services() {
  const location = useLocation();
  const { settings } = useSiteSettings();

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const services = [
    {
      id: "business-registrations",
      icon: Building2,
      title: "Business Registrations",
      description: "Starting a business requires selecting the right legal structure and complying with the applicable regulatory framework. At Apsara & Associates, we assist entrepreneurs and businesses in setting up their ventures with the appropriate structure while ensuring complete compliance with statutory requirements.",
      longDescription: "Our team provides end-to-end support for business registrations, guiding clients through the legal, tax, and regulatory aspects involved in establishing a new entity. We focus on making the registration process smooth, efficient, and aligned with the long-term goals of the business.",
      items: [
        "Sole Proprietorship Registration",
        "Partnership Firm Registration",
        "One Person Company (OPC) Registration",
        "LLP Registration",
        "Private Limited Company Incorporation",
        "Public Limited Company Incorporation",
        "Startup Registration & Advisory",
      ],
    },
    {
      id: "accounting",
      icon: Calculator,
      title: "Accounting",
      description: "Reliable financial records are the foundation of every successful business. At Apsara & Associates, we provide professional accounting services that help businesses maintain accurate financial information and make informed decisions.",
      longDescription: "Our approach focuses on maintaining organized financial records, ensuring transparency, and providing meaningful financial insights. We support businesses in streamlining their accounting processes so that they can focus on their core operations while we ensure the accuracy and reliability of their financial data.",
      items: [
        "Bookkeeping & Accounting Services",
        "Review of Accounts",
        "Financial Analysis",
        "Budgeting & Forecasting",
        "Preparation of Financial Statements",
        "Accounting System Setup",
      ],
    },
    {
      id: "statutory-compliance",
      icon: FileText,
      title: "Statutory Compliance",
      description: "In today's regulatory environment, businesses must comply with multiple statutory requirements. At Apsara & Associates, we help organizations stay compliant with various regulatory laws including GST, Company Law, and other statutory obligations.",
      longDescription: "Our team ensures timely filings, proper documentation, and continuous compliance support to minimize regulatory risks. We assist clients in managing their statutory responsibilities efficiently so that they can operate their businesses with confidence and peace of mind.",
      items: [
        "GST Compliance",
        "Company Law Compliance",
        "ROC Filings (AOC-4, MGT-7, etc.)",
        "Compliance Support & Advisory",
        "Maintenance of Statutory Registers",
        "Director KYC Compliance",
      ],
    },
    {
      id: "tax-planning",
      icon: TrendingUp,
      title: "Tax Planning & Advisory",
      description: "Taxation plays a critical role in the financial planning of individuals and businesses. At Apsara & Associates, we provide strategic tax planning and advisory services designed to help clients manage their tax obligations effectively while remaining fully compliant with the law.",
      longDescription: "Our approach focuses on understanding the financial objectives of our clients and providing practical solutions that optimize tax efficiency. We assist clients in navigating complex tax regulations and ensuring proper planning to avoid unnecessary tax burdens.",
      items: [
        "GST Advisory",
        "Income Tax Advisory",
        "Corporate Tax Planning",
        "International Taxation",
        "Transfer Pricing",
        "Expatriate Taxation",
        "Income Tax Return Filing",
        "Tax Planning",
        "Tax Litigations & Representation",
      ],
    },
    {
      id: "audit-assurance",
      icon: BarChart3,
      title: "Audit & Assurance",
      description: "Audit and assurance services play an important role in enhancing the reliability and credibility of financial information. At Apsara & Associates, we provide independent and objective audit services that help organizations strengthen financial transparency and internal control systems.",
      longDescription: "Our audit approach focuses on careful analysis, professional judgment, and a systematic review of financial records. Through our audit engagements, we aim to provide valuable insights that help businesses improve operational efficiency and strengthen governance practices.",
      items: [
        "Statutory Audit",
        "Internal Audit",
        "Tax Audit",
        "Bank Audit",
        "Information Systems (IT) Audit",
      ],
    },
    {
      id: "other-services",
      icon: Shield,
      title: "Other Professional Services",
      description: "Apart from core accounting and taxation services, Apsara & Associates also assists clients with various regulatory registrations and certifications required for business operations.",
      longDescription: "Our team provides guidance and support in obtaining licenses, certifications, and registrations required under different laws and government schemes. We ensure that the process is handled efficiently so that businesses can obtain the necessary approvals without delays.",
      items: [
        "Trade Mark",
        "Food License",
        "Start up India Certificate",
        "DSC",
        "MSME Certificate",
        "IEC",
      ],
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A70A1] via-[#0d7eb3] to-[#085a85] text-white py-16 md:py-20 overflow-hidden">
        {/* Background Image or Animated Background */}
        {settings?.services_image_url ? (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${settings.services_image_url})` }}
          />
        ) : (
          <AnimatedBackground />
        )}
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Services</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Comprehensive financial and regulatory services designed to support individuals, entrepreneurs, and organizations in managing their financial affairs efficiently.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isEven = index % 2 === 0;
              
              return (
                <motion.div
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group relative overflow-hidden border-2 border-gray-200 hover:border-[#F3782C] transition-all duration-500 hover:shadow-2xl">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-10 pointer-events-none" />
                    
                    <div className={`grid md:grid-cols-2 gap-0 ${!isEven ? 'md:flex md:flex-row-reverse' : ''}`}>
                      {/* Icon and Title Column */}
                      <div className={`relative bg-gradient-to-br from-[#0A70A1] to-[#085a85] p-8 md:p-12 text-white flex flex-col justify-center ${!isEven ? 'md:items-end md:text-right' : ''} overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <motion.div 
                          className={`bg-white/20 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${!isEven ? 'md:ml-auto' : ''} relative z-10`}
                          whileHover={{ scale: 1.15, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Icon className="h-8 w-8 text-white" />
                        </motion.div>
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">
                          {service.title}
                        </h2>
                        <p className="text-blue-100 leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Content Column */}
                      <div className="p-8 md:p-12 bg-gray-50">
                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {service.longDescription}
                        </p>
                        
                        <h3 className="font-semibold text-gray-900 mb-4">
                          Our {service.title} include:
                        </h3>
                        
                        <ul className="space-y-3">
                          {service.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <CheckCircle className="h-5 w-5 text-[#F3782C] flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-[#0A70A1] to-[#085a85] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Need Professional Assistance?
          </h2>
          <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
            Our team is ready to help you with tailored solutions for your business needs.
          </p>
          <Link to="/contact">
            <Button size="lg" className="bg-[#F3782C] hover:bg-[#e56820] text-white">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
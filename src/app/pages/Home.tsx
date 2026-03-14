import { Link } from "react-router";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Award, Sparkles, Shield, Clock } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { useSiteSettings } from "../hooks/useSiteSettings";

export function Home() {
  const { settings } = useSiteSettings();

  const services = [
    {
      icon: Users,
      title: "Business Registrations",
      description: "Complete support for setting up your business with the right structure and compliance.",
      link: "/services#business-registrations",
    },
    {
      icon: TrendingUp,
      title: "Accounting",
      description: "Professional accounting services for accurate financial records and insights.",
      link: "/services#accounting",
    },
    {
      icon: Award,
      title: "Statutory Compliance",
      description: "Stay compliant with GST, Company Law, and all statutory obligations.",
      link: "/services#statutory-compliance",
    },
    {
      icon: Sparkles,
      title: "Tax Planning & Advisory",
      description: "Strategic tax planning to optimize efficiency while ensuring compliance.",
      link: "/services#tax-planning",
    },
    {
      icon: Shield,
      title: "Audit & Assurance",
      description: "Independent audit services to enhance financial transparency and credibility.",
      link: "/services#audit-assurance",
    },
    {
      icon: Clock,
      title: "Other Professional Services",
      description: "Trademark, MSME, Food License, DSC, and more regulatory certifications.",
      link: "/services#other-services",
    },
  ];

  const whyChooseUs = [
    "Professional Excellence & Integrity",
    "Client-Focused Approach",
    "Timely & Reliable Solutions",
    "Expert Team of Professionals",
    "Long-term Client Relationships",
    "Comprehensive Service Portfolio",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A70A1] via-[#0d7eb3] to-[#085a85] text-white overflow-hidden">
        {/* Background Image or Animated Background */}
        {settings?.hero_image_url ? (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${settings.hero_image_url})` }}
          />
        ) : (
          <AnimatedBackground />
        )}

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-5 border border-white/20"
            >
              <Sparkles className="h-4 w-4 text-[#F3782C]" />
              <span className="text-sm">Trusted Financial Guidance</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-5 leading-tight"
            >
              Professional Excellence in
              <span className="block mt-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Financial Services
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl mb-6 text-blue-100 leading-relaxed"
            >
              Apsara & Associates is a professionally managed Chartered Accountant firm committed to providing high-quality services in taxation, accounting, audit, corporate compliance, and financial advisory.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/services">
                <Button 
                  size="lg" 
                  className="bg-[#F3782C] hover:bg-[#e56820] text-white w-full sm:w-auto shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 w-full sm:w-auto border-2 border-white/30 hover:scale-105 transition-all"
                >
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 gap-10 items-center"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-block mb-3">
                <span className="bg-gradient-to-r from-[#0A70A1] to-[#F3782C] text-white px-4 py-2 rounded-full text-sm font-medium">
                  About Us
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-5 leading-tight">
                Building Trust Through
                <span className="block mt-2 bg-gradient-to-r from-[#0A70A1] to-[#F3782C] bg-clip-text text-transparent">
                  Professional Expertise
                </span>
              </h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Apsara & Associates is a professionally managed Chartered Accountant firm committed to providing high-quality services in the areas of taxation, accounting, audit, corporate compliance, and financial advisory.
                </p>
                <p>
                  The firm is founded and led by CA Apsara, a qualified Chartered Accountant with professional experience in handling taxation, regulatory compliance, and financial advisory matters for individuals, startups, and business entities.
                </p>
                <p>
                  At Apsara & Associates, we believe that professional services must go beyond routine compliance. Our approach focuses on understanding the specific needs of each client and delivering practical, reliable, and timely solutions that support business growth while ensuring compliance with statutory regulations.
                </p>
                <p>
                  Under the leadership of CA Apsara, the firm strives to maintain the highest standards of integrity, professionalism, confidentiality, and client service.
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card className="bg-white shadow-2xl border-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#F3782C]/20 to-transparent rounded-bl-full" />
                <CardContent className="p-8 relative">
                  <h3 className="text-2xl font-bold text-gray-900 mb-5">Why Choose Us?</h3>
                  <ul className="space-y-3">
                    {whyChooseUs.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="flex items-start gap-3"
                      >
                        <div className="bg-gradient-to-br from-[#0A70A1] to-[#085a85] p-1 rounded-full mt-0.5">
                          <CheckCircle2 className="h-5 w-5 text-white" />
                        </div>
                        <span className="text-gray-700 flex-1">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-14 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-blue-50/30" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="inline-block mb-3">
              <span className="bg-gradient-to-r from-[#0A70A1] to-[#F3782C] text-white px-4 py-2 rounded-full text-sm font-medium">
                Our Services
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-3">
              Comprehensive Financial Solutions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Expert services designed to support your business growth and compliance needs.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ y: -10, scale: 1.03 }}
                  className="group"
                >
                  <Card className="relative hover:shadow-2xl transition-all duration-500 border-2 border-transparent hover:border-[#F3782C] h-full bg-white overflow-hidden">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#0A70A1]/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <CardContent className="p-6 relative z-10">
                      <motion.div
                        whileHover={{ scale: 1.15, rotate: 360 }}
                        transition={{ duration: 0.6 }}
                        className="bg-gradient-to-br from-[#0A70A1] to-[#085a85] w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      >
                        <Icon className="h-7 w-7 text-white" />
                      </motion.div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {service.title}
                      </h3>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      
                      <Link
                        to={service.link}
                        className="inline-flex items-center text-[#0A70A1] hover:text-[#F3782C] font-medium transition-colors group-hover:translate-x-1 duration-300"
                      >
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mt-12"
          >
            <Link to="/services">
              <Button 
                size="lg" 
                className="bg-[#0A70A1] hover:bg-[#085a85] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
              >
                View All Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-[#0A70A1] via-[#0d7eb3] to-[#085a85] py-20 overflow-hidden">
        <AnimatedBackground />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Contact us today for professional financial guidance and comprehensive business solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button 
                  size="lg" 
                  className="bg-[#F3782C] hover:bg-[#e56820] text-white w-full sm:w-auto shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
                >
                  Contact Us Today
                </Button>
              </Link>
              <Link to="/login">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 w-full sm:w-auto border-2 border-white/30 hover:scale-105 transition-all"
                >
                  Client Portal Login
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
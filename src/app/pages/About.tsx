import { Link } from "react-router";
import { motion } from "motion/react";
import { Award, Target, Heart, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { AnimatedBackground } from "../components/AnimatedBackground";
import { useSiteSettings } from "../hooks/useSiteSettings";

export function About() {
  const { settings } = useSiteSettings();

  const values = [
    {
      icon: Award,
      title: "Professional Excellence",
      description: "Committed to delivering the highest quality of service with integrity and expertise.",
    },
    {
      icon: Target,
      title: "Client-Focused Approach",
      description: "Understanding client needs and providing tailored solutions for their unique requirements.",
    },
    {
      icon: Heart,
      title: "Trust & Integrity",
      description: "Building long-term relationships based on trust, transparency, and ethical practices.",
    },
  ];

  const services = [
    "Business Registrations",
    "Accounting & Bookkeeping",
    "GST & Tax Compliance",
    "Statutory Audit",
    "Tax Planning & Advisory",
    "Corporate Compliance",
    "Financial Consulting",
    "Regulatory Certifications",
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A70A1] via-[#0d7eb3] to-[#085a85] text-white overflow-hidden">
        {/* Background Image or Animated Background */}
        {settings?.about_image_url ? (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${settings.about_image_url})` }}
          />
        ) : (
          <AnimatedBackground />
        )}
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-5">About Us</h1>
            <p className="text-lg md:text-xl text-blue-100">
              Apsara & Associates is a professionally managed Chartered Accountant firm committed to providing high-quality financial and regulatory services.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="text-center mb-10">
              <span className="bg-gradient-to-r from-[#0A70A1] to-[#F3782C] text-white px-4 py-2 rounded-full text-sm font-medium">
                Who We Are
              </span>
            </div>
            
            <div className="space-y-5 text-gray-700 leading-relaxed text-lg">
              <p>
                Apsara & Associates is a professionally managed Chartered Accountant firm committed to providing high-quality services in the areas of taxation, accounting, audit, corporate compliance, and financial advisory.
              </p>
              <p>
                The firm is founded and led by experienced young Chartered Accountants with professional expertise in handling taxation, regulatory compliance, and financial advisory matters for individuals, startups, and business entities across various industries.
              </p>
              <p>
                At Apsara & Associates, we believe that professional services must go beyond routine compliance. Our approach focuses on understanding the specific needs of each client and delivering practical, reliable, and timely solutions that support business growth while ensuring compliance with statutory regulations.
              </p>
              <p>
                We strive to maintain the highest standards of integrity, professionalism, confidentiality, and client service in everything we do. Our commitment is to build long-term relationships with our clients based on trust and professional excellence.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 bg-white">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 md:order-1"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              CA Apsara Babu
            </h2>
            <p className="text-xl text-[#0A70A1] mb-6">
              Chartered Accountant
            </p>
            
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                CA Apsara Babu is a qualified Chartered Accountant and the founder of Apsara & Associates. With professional experience in taxation, compliance, and financial advisory, CA Apsara brings a client-focused approach to every engagement.
              </p>
              <p>
                As an experienced young professional, CA Apsara combines technical expertise with a modern understanding of business needs. The focus is on providing practical solutions that help clients navigate complex financial and regulatory requirements while supporting their business goals.
              </p>
              <p>
                Under CA Apsara's leadership, the firm maintains a commitment to professional excellence, ethical practices, and building lasting relationships with clients based on trust and reliability.
              </p>
            </div>

            <div className="mt-8 p-6 bg-gray-50 rounded-lg border-l-4 border-[#F3782C]">
              <h3 className="font-semibold text-gray-900 mb-3">Professional Expertise:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#0A70A1] flex-shrink-0 mt-0.5" />
                  <span>Taxation & Tax Planning</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#0A70A1] flex-shrink-0 mt-0.5" />
                  <span>Regulatory Compliance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#0A70A1] flex-shrink-0 mt-0.5" />
                  <span>Financial Advisory</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#0A70A1] flex-shrink-0 mt-0.5" />
                  <span>Audit & Assurance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#0A70A1] flex-shrink-0 mt-0.5" />
                  <span>Business Setup & Structuring</span>
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 md:order-2"
          >
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-[#0A70A1] to-[#085a85] rounded-2xl overflow-hidden shadow-2xl">
                {settings?.ca_photo_url ? (
                  <img
                    src={settings.ca_photo_url}
                    alt="CA Apsara Babu"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white text-6xl font-bold bg-gradient-to-br from-[#0A70A1] to-[#085a85]">
                    <div className="text-center">
                      <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <span className="text-7xl">AB</span>
                      </div>
                      <p className="text-sm text-blue-100">Photo: Upload from Admin Settings</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-[#F3782C] rounded-full opacity-20 -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#0A70A1] rounded-full opacity-10 -z-10"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <span className="bg-gradient-to-r from-[#0A70A1] to-[#F3782C] text-white px-4 py-2 rounded-full text-sm font-medium">
              Our Values
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-5 mb-3">
              What Drives Us
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our commitment to excellence is built on these core principles
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group"
              >
                <Card className="relative h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-gradient-to-br from-white via-blue-50 to-orange-50 overflow-hidden">
                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  
                  <CardContent className="p-6 relative z-10">
                    <motion.div 
                      className="bg-gradient-to-br from-[#0A70A1] to-[#085a85] w-14 h-14 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:shadow-xl transition-shadow duration-300"
                      whileHover={{ scale: 1.15, rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <value.icon className="h-7 w-7 text-white" />
                    </motion.div>
                    <h3 className="font-bold text-lg text-gray-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Comprehensive Financial Services
              </h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                We offer a wide range of professional services designed to meet the diverse needs of our clients, from individuals and startups to established businesses.
              </p>
              <p className="text-gray-700 leading-relaxed mb-8">
                Our services are tailored to support you at every stage of your business journey, ensuring compliance, efficiency, and growth.
              </p>
              <Link to="/services">
                <Button size="lg" className="bg-[#0A70A1] hover:bg-[#085a85]">
                  Explore Our Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-white shadow-xl border-0">
                <CardContent className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Our Service Areas:
                  </h3>
                  <ul className="grid grid-cols-1 gap-3">
                    {services.map((service, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-[#F3782C] flex-shrink-0 mt-0.5" />
                        <span className="text-gray-700">{service}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
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
              Let's Work Together
            </h2>
            <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
              Ready to experience professional excellence in financial services? Get in touch with us today.
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
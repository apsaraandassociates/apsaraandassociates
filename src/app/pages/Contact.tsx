import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Label } from "../components/ui/label";
import { Card, CardContent } from "../components/ui/card";
import { AnimatedBackground } from "../components/AnimatedBackground";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { supabase } from "../../lib/supabase";
import { toast } from "sonner";
import { useSiteSettings } from "../hooks/useSiteSettings";

export function Contact() {
  const { settings } = useSiteSettings();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    console.log("🚀🚀🚀 CODE VERSION 3.0 - USING EDGE FUNCTION - Contact form submitted:", formData);

    try {
      // Save to database
      const { error: dbError } = await supabase
        .from("contact_inquiries")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
          },
        ]);

      if (dbError) throw dbError;

      console.log("✅ Database save successful, now attempting email...");

      // Send email notification using Supabase Edge Function
      try {
        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL || 'apsara@apsaraassociates.com';
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xxzyqgdybpmuenhslyij.supabase.co';
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh4enlxZ2R5YnBtdWVuaHNseWlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM0NjY0NTgsImV4cCI6MjA4OTA0MjQ1OH0.BThHbrggGevIH3Wkd--a1QuGueCIf7nz3Kk5dxVEsiw';

        console.log("📧 Calling Edge Function to send email to:", adminEmail);

        const edgeFunctionUrl = `${supabaseUrl}/functions/v1/send-contact-email`;
        
        console.log("🔗 Edge Function URL:", edgeFunctionUrl);

        const emailResponse = await fetch(edgeFunctionUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${supabaseAnonKey}`
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            service: formData.service,
            message: formData.message,
            adminEmail: adminEmail
          })
        });

        const emailResult = await emailResponse.json();
        
        if (!emailResponse.ok) {
          console.error('❌ Email sending failed:', emailResult);
          toast.error(`Email not sent: ${emailResult.error || 'Unknown error'}`);
        } else {
          console.log('✅ Email sent successfully:', emailResult);
          toast.success('Email notification sent!');
        }
      } catch (emailError: any) {
        console.error('❌ Error sending email:', emailError);
        toast.error(`Email error: ${emailError.message}`);
      }
      
      setSubmitted(true);
      toast.success("Message sent successfully!");

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });
        setSubmitted(false);
      }, 3000);
    } catch (error: any) {
      console.error("Error submitting form:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      value: "apsara@apsaraassociates.com",
      link: "mailto:apsara@apsaraassociates.com",
    },
    {
      icon: Phone,
      title: "Phone",
      value: "+91-9380784018",
      link: "tel:+919380784018",
    },
    {
      icon: MapPin,
      title: "Address",
      value: "No.63/3A, Devanathchar Street 8th cross, Chamrajpet 5th Main road, Bangalore 560018",
      link: "https://maps.app.goo.gl/opbYBj4s4orB747B8",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#0A70A1] via-[#0d7eb3] to-[#085a85] text-white py-12 md:py-16 overflow-hidden">
        {/* Background Image or Animated Background */}
        {settings?.contact_image_url ? (
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{ backgroundImage: `url(${settings.contact_image_url})` }}
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
            <h1 className="text-4xl md:text-6xl font-bold mb-3">Contact Us</h1>
            <p className="text-lg md:text-xl text-blue-100 max-w-3xl mx-auto">
              Get in touch with us for professional financial guidance and business solutions. We're here to help you succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-10 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group"
                >
                  <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full bg-gradient-to-br from-white via-blue-50 to-orange-50 overflow-hidden">
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                    
                    <CardContent className="p-6 text-center relative z-10">
                      <motion.div 
                        className="bg-gradient-to-br from-[#0A70A1] to-[#085a85] w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all duration-300"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.6 }}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </motion.div>
                      <h3 className="font-bold text-lg text-gray-900 mb-3">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          target={info.title === "Address" ? "_blank" : undefined}
                          rel={info.title === "Address" ? "noopener noreferrer" : undefined}
                          className="text-gray-700 hover:text-[#0A70A1] transition-colors font-medium text-sm block"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-700 font-medium text-sm">{info.value}</p>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Map Section */}
          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="overflow-hidden border-0 shadow-xl">
                <CardContent className="p-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d969.7024844894406!2d77.5617852!3d12.9538511!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae157371a5dbbf%3A0x8afb618928ca4a16!2sApsara%20and%20Associates!5e0!3m2!1sen!2sin!4v1710426789123!5m2!1sen!2sin"
                    width="100%"
                    height="400"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Apsara & Associates Location"
                  ></iframe>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                Send us a Message
              </h2>
              
              {submitted ? (
                <Card className="border-2 border-green-500 bg-green-50">
                  <CardContent className="p-8 text-center">
                    <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-gray-600">
                      Thank you for reaching out. We'll get back to you soon.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 XXXXX XXXXX"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="service">Service Interest</Label>
                    <Select
                      value={formData.service}
                      onValueChange={(value) =>
                        setFormData({ ...formData, service: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business-registration">
                          Business Registration
                        </SelectItem>
                        <SelectItem value="accounting">Accounting</SelectItem>
                        <SelectItem value="statutory-compliance">
                          Statutory Compliance
                        </SelectItem>
                        <SelectItem value="tax-planning">
                          Tax Planning & Advisory
                        </SelectItem>
                        <SelectItem value="audit-assurance">
                          Audit & Assurance
                        </SelectItem>
                        <SelectItem value="other-services">
                          Other Professional Services
                        </SelectItem>
                        <SelectItem value="general-inquiry">
                          General Inquiry
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your requirements..."
                      rows={6}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="relative w-full bg-[#0A70A1] hover:bg-[#085a85] text-white overflow-hidden group"
                    disabled={loading}
                  >
                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </Button>
                </form>
              )}
            </div>

            {/* Info Section */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5">
                Why Contact Us?
              </h2>
              <div className="space-y-5">
                <p className="text-gray-700 leading-relaxed">
                  At Apsara & Associates, we are committed to providing professional excellence and personalized service to each of our clients.
                </p>
                <div className="bg-gradient-to-br from-blue-50 to-orange-50 p-6 rounded-xl border-l-4 border-[#F3782C] shadow-md">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                    What to Expect:
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#0A70A1] flex-shrink-0 mt-0.5" />
                      <span>Prompt response within 24 hours</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#0A70A1] flex-shrink-0 mt-0.5" />
                      <span>Professional consultation</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#0A70A1] flex-shrink-0 mt-0.5" />
                      <span>Customized solutions for your needs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-[#0A70A1] flex-shrink-0 mt-0.5" />
                      <span>Transparent pricing</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
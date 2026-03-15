import { Link } from "react-router";
import { Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* About Section */}
          <div>
            <div className="mb-4">
              <span className="text-lg font-bold text-white">
                Apsara & Associates
              </span>
              <div className="w-full h-px bg-gray-600 my-0.5"></div>
              <span className="text-[10px] text-gray-300 uppercase" style={{ letterSpacing: '0.15em' }}>
                Chartered Accountants
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Trusted Financial Guidance with Professional Excellence. We provide high-quality services in taxation, accounting, audit, and financial advisory.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm hover:text-[#F3782C] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm hover:text-[#F3782C] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm hover:text-[#F3782C] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-sm hover:text-[#F3782C] transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-sm hover:text-[#F3782C] transition-colors">
                  Client Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-[#F3782C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">apsara@apsaraassociates.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#F3782C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">+91-9380784018</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#F3782C] flex-shrink-0 mt-0.5" />
                <span className="text-sm">No.63/3A, Devanathchar Street 8th cross, Chamrajpet 5th Main road, Bangalore 560018</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Apsara & Associates. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
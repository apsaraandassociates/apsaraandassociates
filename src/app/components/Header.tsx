import { Link, useLocation } from "react-router";
import { Menu, X, User } from "lucide-react";
import { useState } from "react";
import caLogo from "../../imports/CA_LOGO.svg";
import { Button } from "./ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo and Name */}
          <Link to="/" className="flex items-center gap-3">
            <img src={caLogo} alt="CA Logo" className="h-10 md:h-12" />
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-bold text-[#0A70A1]">
                Apsara & Associates
              </span>
              <div className="w-full h-px bg-gray-300 my-0.5"></div>
              <span className="text-[10px] md:text-xs text-gray-600 uppercase" style={{ letterSpacing: '0.15em' }}>
                Chartered Accountants
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? "text-[#0A70A1] font-semibold border-b-2 border-[#F3782C] pb-1"
                    : "text-gray-700 hover:text-[#0A70A1]"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/login">
              <Button className="bg-[#0A70A1] hover:bg-[#085a85]">
                Client Portal
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block py-3 px-4 transition-colors ${
                  isActive(link.path)
                    ? "text-[#0A70A1] font-medium bg-blue-50"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 mx-4 mt-4 bg-[#0A70A1] text-white px-4 py-3 rounded-lg hover:bg-[#085a85] transition-colors justify-center"
            >
              <User className="h-4 w-4" />
              Client Portal
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
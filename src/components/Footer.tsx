import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="surface-low py-10">
      <div className="container mx-auto px-4">
        {/* Top Row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-8">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[#006c56] flex items-center justify-center">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-display font-bold text-foreground tracking-tight">
              Edu<span className="text-primary">Stay</span>
            </span>
          </Link>

          {/* Footer Links */}
          <div className="flex flex-wrap items-center gap-6">
            <Link
              to="/about"
              className="text-sm font-body text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              About Us
            </Link>
            <Link
              to="/privacy"
              className="text-sm font-body text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/privacy"
              className="text-sm font-body text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Terms of Service
            </Link>
            <Link
              to="/support"
              className="text-sm font-body text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Contact Support
            </Link>
            <Link
              to="/owner/list-property"
              className="text-sm font-body text-muted-foreground hover:text-primary transition-colors duration-300"
            >
              Partner with Us
            </Link>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6">
          <p className="text-xs text-muted-foreground font-body">
            © {currentYear} The Verdant Path. All rights reserved. Designed for the Urban Sanctuary.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Link } from "react-router-dom";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="surface-low pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-verdant-500 flex items-center justify-center">
                <Leaf className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-display font-bold text-foreground tracking-tight">
                Edu<span className="text-primary">Stay</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Your urban sanctuary. Connecting students with verified, quality accommodations near Academy of Technology.
            </p>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
              <span>Adisaptagram, Hooghly, West Bengal</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">
              Explore
            </h4>
            <div className="space-y-3">
              <Link to="/" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Discover
              </Link>
              <Link to="/properties" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Neighborhoods
              </Link>
              <Link to="/map" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Map View
              </Link>
              <Link to="/about" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                About Us
              </Link>
            </div>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">
              Support
            </h4>
            <div className="space-y-3">
              <Link to="/support" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Contact Support
              </Link>
              <Link to="/faq" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                FAQ
              </Link>
              <Link to="/privacy" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/feedback" className="block text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                Feedback
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4 text-sm uppercase tracking-widest">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <a href="mailto:support@edustay.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors duration-300">
                <Mail className="h-4 w-4" />
                support@edustay.com
              </a>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                +91 XXXX-XXXXXX
              </div>
              <div className="pt-2">
                <Link to="/owner/list-property">
                  <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-all duration-300 hover-glow cursor-pointer">
                    Partner with Us
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {currentYear} EduStay. All rights reserved. Designed for the Urban Sanctuary.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              About Us
            </Link>
            <Link to="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

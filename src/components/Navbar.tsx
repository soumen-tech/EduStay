import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, Building2, User, MapPin, Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              EduStay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button variant={isActive("/") ? "default" : "ghost"} size="sm">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/properties">
              <Button variant={isActive("/properties") ? "default" : "ghost"} size="sm">
                <Building2 className="h-4 w-4 mr-2" />
                Properties
              </Button>
            </Link>
            <Link to="/map">
              <Button variant={isActive("/map") ? "default" : "ghost"} size="sm">
                <MapPin className="h-4 w-4 mr-2" />
                Map
              </Button>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <Link to="/student/login">
              <Button variant="outline" size="sm">
                Student Login
              </Button>
            </Link>
            <Link to="/owner/login">
              <Button variant="outline" size="sm">
                Owner Login
              </Button>
            </Link>
            <Link to="/owner/list-property">
              <Button size="sm" className="bg-accent hover:bg-accent/90">
                List Property
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <Button variant={isActive("/") ? "default" : "ghost"} size="sm" className="w-full justify-start">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/properties" onClick={() => setMobileMenuOpen(false)}>
              <Button variant={isActive("/properties") ? "default" : "ghost"} size="sm" className="w-full justify-start">
                <Building2 className="h-4 w-4 mr-2" />
                Properties
              </Button>
            </Link>
            <Link to="/map" onClick={() => setMobileMenuOpen(false)}>
              <Button variant={isActive("/map") ? "default" : "ghost"} size="sm" className="w-full justify-start">
                <MapPin className="h-4 w-4 mr-2" />
                Map
              </Button>
            </Link>
            <div className="pt-2 border-t space-y-2">
              <Link to="/student/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Student Login
                </Button>
              </Link>
              <Link to="/owner/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Owner Login
                </Button>
              </Link>
              <Link to="/owner/list-property" onClick={() => setMobileMenuOpen(false)}>
                <Button size="sm" className="w-full bg-accent hover:bg-accent/90">
                  List Property
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

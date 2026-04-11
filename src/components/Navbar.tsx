import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home, MapPin, Menu, X, Leaf } from "lucide-react";
import { useState } from "react";
import HamburgerMenu from "@/components/HamburgerMenu";

const Navbar = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-verdant-500 flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-display font-bold text-foreground tracking-tight">
              Edu<span className="text-primary">Stay</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
                className={`rounded-full font-body transition-all duration-300 ${
                  isActive("/")
                    ? "bg-primary text-white hover:bg-primary/90 hover-glow"
                    : "hover:bg-accent"
                }`}
              >
                <Home className="h-4 w-4 mr-2" />
                Discover
              </Button>
            </Link>
            <Link to="/properties">
              <Button
                variant={isActive("/properties") ? "default" : "ghost"}
                size="sm"
                className={`rounded-full font-body transition-all duration-300 ${
                  isActive("/properties")
                    ? "bg-primary text-white hover:bg-primary/90 hover-glow"
                    : "hover:bg-accent"
                }`}
              >
                Neighborhoods
              </Button>
            </Link>
            <Link to="/map">
              <Button
                variant={isActive("/map") ? "default" : "ghost"}
                size="sm"
                className={`rounded-full font-body transition-all duration-300 ${
                  isActive("/map")
                    ? "bg-primary text-white hover:bg-primary/90 hover-glow"
                    : "hover:bg-accent"
                }`}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Map
              </Button>
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link to="/student/login">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full font-body hover:bg-accent"
              >
                Student Login
              </Button>
            </Link>
            <Link to="/owner/login">
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full font-body hover:bg-accent"
              >
                Owner Login
              </Button>
            </Link>
            <Link to="/owner/list-property">
              <Button
                size="sm"
                className="rounded-full bg-primary hover:bg-primary/90 text-white font-body hover-glow transition-all duration-300"
              >
                List Property
              </Button>
            </Link>
            <HamburgerMenu />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-full hover:bg-accent transition-colors">
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <HamburgerMenu />
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-1 animate-float-up">
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant={isActive("/") ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start rounded-xl font-body ${
                  isActive("/") ? "bg-primary text-white" : ""
                }`}
              >
                <Home className="h-4 w-4 mr-2" />
                Discover
              </Button>
            </Link>
            <Link to="/properties" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant={isActive("/properties") ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start rounded-xl font-body ${
                  isActive("/properties") ? "bg-primary text-white" : ""
                }`}
              >
                Neighborhoods
              </Button>
            </Link>
            <Link to="/map" onClick={() => setMobileMenuOpen(false)}>
              <Button
                variant={isActive("/map") ? "default" : "ghost"}
                size="sm"
                className={`w-full justify-start rounded-xl font-body ${
                  isActive("/map") ? "bg-primary text-white" : ""
                }`}
              >
                <MapPin className="h-4 w-4 mr-2" />
                Map
              </Button>
            </Link>
            <div className="pt-2 space-y-1">
              <Link to="/student/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start rounded-xl font-body">
                  Student Login
                </Button>
              </Link>
              <Link to="/owner/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full justify-start rounded-xl font-body">
                  Owner Login
                </Button>
              </Link>
              <Link to="/owner/list-property" onClick={() => setMobileMenuOpen(false)}>
                <Button
                  size="sm"
                  className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-body"
                >
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

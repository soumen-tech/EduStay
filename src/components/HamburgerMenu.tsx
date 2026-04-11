import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Phone, Mail, MapPin, Globe, User, LogOut, Bookmark, Home as HomeIcon, FileText, Leaf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

const HamburgerMenu = () => {
  const [language, setLanguage] = useState("english");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [userType, setUserType] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const studentLoggedIn = localStorage.getItem("isStudentLoggedIn") === "true";
    const ownerLoggedIn = localStorage.getItem("isOwnerLoggedIn") === "true";
    const name = localStorage.getItem("userName") || "";
    const type = localStorage.getItem("userType") || "";
    
    setIsLoggedIn(studentLoggedIn || ownerLoggedIn);
    setUserName(name);
    setUserType(type);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isStudentLoggedIn");
    localStorage.removeItem("isOwnerLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("userType");
    setIsLoggedIn(false);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent transition-colors duration-300">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[300px] sm:w-[380px] overflow-y-auto surface-low">
        <SheetHeader className="pb-6">
          <SheetTitle className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-verdant-500 flex items-center justify-center">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-bold tracking-tight">
              Edu<span className="text-primary">Stay</span>
            </span>
          </SheetTitle>
        </SheetHeader>
        <div className="space-y-8">
          {/* User Account Section */}
          {isLoggedIn && (
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary text-primary-foreground font-display font-semibold text-sm">
                    {getInitials(userName)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-display font-semibold text-sm">{userName}</p>
                  <p className="text-xs text-muted-foreground capitalize">{userType}</p>
                </div>
              </div>
              <div className="space-y-1">
                <Link 
                  to={userType === "student" ? "/student/profile" : "/owner/profile"} 
                  className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300"
                >
                  <User className="h-4 w-4 text-primary" />
                  My Profile
                </Link>
                {userType === "student" && (
                  <>
                    <Link to="/saved-listings" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                      <Bookmark className="h-4 w-4 text-primary" />
                      Saved Listings
                    </Link>
                    <Link to="/student/dashboard" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                      <FileText className="h-4 w-4 text-primary" />
                      My Bookings
                    </Link>
                  </>
                )}
                {userType === "owner" && (
                  <>
                    <Link to="/owner/dashboard" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                      <HomeIcon className="h-4 w-4 text-primary" />
                      My Listings
                    </Link>
                    <Link to="/owner/list-property" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                      <FileText className="h-4 w-4 text-primary" />
                      Create Listing
                    </Link>
                  </>
                )}
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-red-50 hover:text-red-600 transition-colors duration-300 w-full text-left"
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </button>
              </div>
            </div>
          )}

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-3 px-1">
              Explore
            </h3>
            <div className="space-y-0.5">
              <Link to="/" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                Home
              </Link>
              <Link to="/properties" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                Neighborhoods
              </Link>
              <Link to="/map" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                Map
              </Link>
              <Link to="/about" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                About Us
              </Link>
              <Link to="/privacy" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                Privacy Policy
              </Link>
              <Link to="/feedback" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                Feedback
              </Link>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-3 px-1">
              Support
            </h3>
            <div className="space-y-0.5">
              <Link to="/support" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                Customer Support
              </Link>
              <Link to="/student-support" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                Student Support
              </Link>
              <Link to="/owner-support" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                Landlord Support
              </Link>
              <Link to="/faq" className="flex items-center gap-2.5 py-2.5 px-3 rounded-xl text-sm hover:bg-accent transition-colors duration-300">
                FAQ
              </Link>
            </div>
          </div>

          {/* Language Selection */}
          <div>
            <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-3 px-1 flex items-center gap-2">
              <Globe className="h-3.5 w-3.5" />
              Language
            </h3>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="rounded-xl bg-white">
                <SelectValue placeholder="Select Language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="hindi">हिन्दी (Hindi)</SelectItem>
                <SelectItem value="bengali">বাংলা (Bengali)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-semibold text-xs uppercase tracking-widest text-muted-foreground mb-3 px-1">
              Contact
            </h3>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start gap-2.5 px-1">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Adisaptagram, Hooghly, West Bengal, India</span>
              </div>
              <div className="flex items-center gap-2.5 px-1">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <a href="mailto:support@edustay.com" className="text-muted-foreground hover:text-primary transition-colors">
                  support@edustay.com
                </a>
              </div>
              <div className="flex items-center gap-2.5 px-1">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">+91 XXXX-XXXXXX</span>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HamburgerMenu;

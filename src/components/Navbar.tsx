import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Leaf, ChevronDown, User, Building, Shield, LogOut } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, userProfile, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginDropdownOpen, setLoginDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  const isLoggedIn = !!currentUser;
  const userName = userProfile?.displayName || currentUser?.displayName || "User";
  const userType = userProfile?.userType || "";
  const photoURL = userProfile?.photoURL || currentUser?.photoURL || "";

  const isActive = (path: string) => location.pathname === path;

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLoginDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setUserDropdownOpen(false);
      toast.success("Logged out successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to logout.");
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const navLinks = [
    { label: "Discover", path: "/" },
    { label: "Neighborhoods", path: "/neighborhoods" },
    { label: "Saved", path: "/saved-locations" },
    { label: "Services", path: "/find-accommodation" },
    { label: "Community", path: "/about" },
  ];

  return (
    <nav className="sticky top-0 z-50 glass-nav">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Brand */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-[#006c56] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow duration-300">
              <Leaf className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-display font-bold text-foreground tracking-tight">
              Edu<span className="text-primary">Stay</span>
            </span>
          </Link>

          {/* Desktop Navigation — centered links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link to={link.path} key={link.label}>
                <button
                  className={`px-4 py-2 rounded-full text-sm font-body font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn ? (
              /* Logged-in user dropdown */
              <div className="relative" ref={userDropdownRef}>
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-accent/50 transition-all duration-300"
                >
                  <Avatar className="h-7 w-7">
                    {photoURL && <AvatarImage src={photoURL} alt={userName} />}
                    <AvatarFallback className="bg-primary text-primary-foreground font-display font-semibold text-xs">
                      {getInitials(userName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-body font-medium text-foreground max-w-[120px] truncate">
                    {userName}
                  </span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      userDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl glass-card p-2 animate-bloom shadow-float z-50">
                    <div className="px-4 py-2 border-b border-border/50 mb-1">
                      <p className="text-sm font-semibold">{userName}</p>
                      <p className="text-xs text-muted-foreground capitalize">{userType}</p>
                    </div>
                    <Link
                      to={userType === "student" ? "/student/dashboard" : "/owner/dashboard"}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-foreground hover:bg-accent/60 transition-colors duration-200"
                    >
                      <User className="h-4 w-4 text-primary" />
                      Dashboard
                    </Link>
                    <Link
                      to={userType === "student" ? "/student/profile" : "/owner/profile"}
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-foreground hover:bg-accent/60 transition-colors duration-200"
                    >
                      <User className="h-4 w-4 text-primary" />
                      My Profile
                    </Link>
                    {userType === "owner" && (
                      <Link
                        to="/owner/list-property"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body font-semibold text-primary bg-accent/40 hover:bg-accent/70 transition-colors duration-200"
                      >
                        <Leaf className="h-4 w-4" />
                        List Your Property
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-red-600 hover:bg-red-50 transition-colors duration-200 w-full text-left mt-1"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Login Dropdown for unauthenticated users */
              <div className="relative" ref={dropdownRef}>
                <Button
                  size="sm"
                  className="rounded-full bg-primary hover:bg-primary/90 text-white font-body font-medium px-6 hover-glow transition-all duration-300"
                  onClick={() => setLoginDropdownOpen(!loginDropdownOpen)}
                >
                  Login
                  <ChevronDown
                    className={`h-3.5 w-3.5 ml-1.5 transition-transform duration-200 ${
                      loginDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>

                {/* Dropdown Menu */}
                {loginDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 rounded-2xl glass-card p-2 animate-bloom shadow-float z-50">
                    <Link
                      to="/student/login"
                      onClick={() => setLoginDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-foreground hover:bg-accent/60 transition-colors duration-200"
                    >
                      <User className="h-4 w-4 text-primary" />
                      Student Login
                    </Link>
                    <Link
                      to="/owner/login"
                      onClick={() => setLoginDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-foreground hover:bg-accent/60 transition-colors duration-200"
                    >
                      <Building className="h-4 w-4 text-primary" />
                      Owner Login
                    </Link>
                    <Link
                      to="/admin/login"
                      onClick={() => setLoginDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body text-foreground hover:bg-accent/60 transition-colors duration-200"
                    >
                      <Shield className="h-4 w-4 text-primary" />
                      Admin Login
                    </Link>
                    <div className="my-1" />
                    <Link
                      to="/owner/list-property"
                      onClick={() => setLoginDropdownOpen(false)}
                      className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-body font-semibold text-primary bg-accent/40 hover:bg-accent/70 transition-colors duration-200"
                    >
                      <Leaf className="h-4 w-4" />
                      List Your Property
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-1 animate-float-up">
            {navLinks.map((link) => (
              <Link to={link.path} key={link.label} onClick={() => setMobileMenuOpen(false)}>
                <button
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-body font-medium transition-all ${
                    isActive(link.path)
                      ? "bg-primary text-white"
                      : "text-foreground hover:bg-accent/50"
                  }`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
            <div className="pt-2 space-y-1">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 px-4 py-2 mb-1">
                    <Avatar className="h-7 w-7">
                      {photoURL && <AvatarImage src={photoURL} alt={userName} />}
                      <AvatarFallback className="bg-primary text-primary-foreground font-display font-semibold text-xs">
                        {getInitials(userName)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold">{userName}</p>
                      <p className="text-xs text-muted-foreground capitalize">{userType}</p>
                    </div>
                  </div>
                  <Link
                    to={userType === "student" ? "/student/dashboard" : "/owner/dashboard"}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-body text-foreground hover:bg-accent/50 flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" /> Dashboard
                    </button>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left px-4 py-3 rounded-xl text-sm font-body text-red-600 hover:bg-red-50 flex items-center gap-2"
                  >
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/student/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-body text-foreground hover:bg-accent/50 flex items-center gap-2">
                      <User className="h-4 w-4 text-primary" /> Student Login
                    </button>
                  </Link>
                  <Link to="/owner/login" onClick={() => setMobileMenuOpen(false)}>
                    <button className="w-full text-left px-4 py-3 rounded-xl text-sm font-body text-foreground hover:bg-accent/50 flex items-center gap-2">
                      <Building className="h-4 w-4 text-primary" /> Owner Login
                    </button>
                  </Link>
                  <Link to="/owner/list-property" onClick={() => setMobileMenuOpen(false)}>
                    <Button
                      size="sm"
                      className="w-full rounded-xl bg-primary hover:bg-primary/90 text-white font-body mt-1"
                    >
                      List Your Property
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

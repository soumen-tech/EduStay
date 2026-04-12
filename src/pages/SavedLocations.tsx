import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Home,
  Briefcase,
  GraduationCap,
  MapPin,
  Clock,
  ArrowUpLeft,
  Plus,
  Navigation,
  Map,
  Bookmark,
  User,
  Heart,
  Leaf,
  HelpCircle,
  Compass,
  X,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import room1 from "@/assets/room1.jpg";

import { useAuth } from "@/contexts/AuthContext";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

/* ─── Interfaces ─── */
export interface SavedLocation {
  id: string;
  label: string;
  iconType: string;
  address: string;
  createdAt: any;
}

const recentSearches = [
  {
    id: "r1",
    name: "Artisan Coffee Collective",
    address: "32 Gardenia Street, East End",
  },
  {
    id: "r2",
    name: "Botanical Gardens Metro",
    address: "Central Transit Hub",
  },
  {
    id: "r3",
    name: "Yoga Sanctuary & Spa",
    address: "Pine Ridge Plaza, Ste 401",
  },
];

const SavedLocations = () => {
  const { currentUser } = useAuth();
  
  const [hubs, setHubs] = useState<SavedLocation[]>([]);
  const [recents, setRecents] = useState(recentSearches);
  const [loading, setLoading] = useState(true);

  // States for Add Modal
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newLabel, setNewLabel] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newIconType, setNewIconType] = useState("home");
  const [isAdding, setIsAdding] = useState(false);

  // Real-time listener for user's saved locations
  useEffect(() => {
    if (!currentUser) {
      setHubs([]);
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "users", currentUser.uid, "savedLocations"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const locationsData: SavedLocation[] = [];
      snapshot.forEach((docSnap) => {
        locationsData.push({ id: docSnap.id, ...docSnap.data() } as SavedLocation);
      });
      setHubs(locationsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching saved locations:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const removeHub = async (id: string) => {
    if (!currentUser) return;
    try {
      await deleteDoc(doc(db, "users", currentUser.uid, "savedLocations", id));
    } catch (error) {
      console.error("Error removing location:", error);
    }
  };

  const handleAddLocation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !newLabel || !newAddress) return;

    setIsAdding(true);
    try {
      await addDoc(collection(db, "users", currentUser.uid, "savedLocations"), {
        label: newLabel,
        address: newAddress,
        iconType: newIconType,
        createdAt: serverTimestamp(),
      });
      setIsAddModalOpen(false);
      setNewLabel("");
      setNewAddress("");
      setNewIconType("home");
    } catch (error) {
      console.error("Error adding location:", error);
    } finally {
      setIsAdding(false);
    }
  };

  const clearRecents = () => {
    setRecents([]);
  };

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "home":
        return <Home className="h-5 w-5" />;
      case "office":
        return <Briefcase className="h-5 w-5" />;
      case "university":
        return <GraduationCap className="h-5 w-5" />;
      default:
        return <MapPin className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col surface">
      <Navbar />

      <div className="flex flex-1">
        {/* ── Side Navigation (Desktop) ── */}
        <aside
          className="hidden lg:flex flex-col w-72 flex-shrink-0 sticky top-16 h-[calc(100vh-64px)] bg-accent/40 backdrop-blur-2xl z-30"
          style={{ borderRadius: "0 2rem 2rem 0" }}
        >
          {/* Brand */}
          <div className="px-8 pt-8 pb-4">
            <span className="text-xl font-display font-black text-primary">
              E<span className="text-foreground">S.</span>
            </span>
          </div>

          {/* Welcome */}
          <div className="px-8 mb-8">
            <h2 className="font-display font-bold text-base text-foreground">
              Welcome home
            </h2>
            <p className="text-xs font-body text-muted-foreground mt-0.5">
              Find your sanctuary
            </p>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 flex flex-col gap-1.5 px-4">
            <Link
              to="/map"
              className="flex items-center gap-3 px-5 py-3 rounded-full text-sm font-body font-medium text-foreground/70 hover:bg-accent/70 transition-all duration-200"
            >
              <Map className="h-5 w-5" />
              Map Explorer
            </Link>
            <Link
              to="/neighborhoods"
              className="flex items-center gap-3 px-5 py-3 rounded-full text-sm font-body font-medium text-foreground/70 hover:bg-accent/70 transition-all duration-200"
            >
              <MapPin className="h-5 w-5" />
              Neighborhoods
            </Link>
            <Link
              to="/saved-locations"
              className="flex items-center gap-3 px-5 py-3 rounded-full text-sm font-body font-semibold text-white bg-primary shadow-lg shadow-primary/25 transition-all duration-200"
            >
              <Bookmark className="h-5 w-5 fill-white" />
              Saved Places
            </Link>
            <Link
              to="/student/profile"
              className="flex items-center gap-3 px-5 py-3 rounded-full text-sm font-body font-medium text-foreground/70 hover:bg-accent/70 transition-all duration-200"
            >
              <User className="h-5 w-5" />
              My Profile
            </Link>
            <Link
              to="/support"
              className="flex items-center gap-3 px-5 py-3 rounded-full text-sm font-body font-medium text-foreground/70 hover:bg-accent/70 transition-all duration-200 mt-auto"
            >
              <HelpCircle className="h-5 w-5" />
              Help Center
            </Link>
          </nav>

          {/* List PG Button */}
          <div className="px-6 pb-8 pt-4">
            <Link to="/owner/list-property">
              <button className="w-full bg-foreground text-background py-3.5 rounded-xl font-display font-bold text-sm shadow-lg shadow-foreground/10 hover:bg-foreground/90 active:scale-[0.98] transition-all duration-200">
                List your PG
              </button>
            </Link>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <main className="flex-1 relative overflow-hidden">
          {/* Background Blur Image */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <img
              src={room1}
              alt=""
              className="w-full h-full object-cover scale-110 blur-3xl opacity-[0.15]"
            />
          </div>

          <div className="max-w-5xl mx-auto px-6 lg:px-10 py-10 lg:py-14 relative z-10">
            {/* ── Hero Header ── */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
              <div>
                <p className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-2">
                  Your Sanctuaries
                </p>
                <h1 className="text-4xl md:text-5xl font-display font-extrabold text-primary tracking-tight mb-3">
                  Saved Locations
                </h1>
                <p className="text-base font-body text-muted-foreground leading-relaxed max-w-xl">
                  Access your curated sanctuaries and previous explorations in a
                  single glance.
                </p>
              </div>

              {/* Add New Location CTA */}
              <button 
                onClick={() => setIsAddModalOpen(true)}
                className="group relative bg-primary text-white px-8 py-4 rounded-xl font-display font-bold text-sm shadow-[0_20px_40px_-10px_rgba(0,81,64,0.3)] hover:shadow-[0_25px_50px_-12px_rgba(0,81,64,0.5)] transition-all duration-300 flex items-center gap-2.5 self-start md:self-auto hover-glow"
              >
                <Plus className="h-5 w-5" />
                Add New Location
                <div className="absolute inset-0 rounded-xl bg-emerald-400 opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              </button>
            </div>

            {!currentUser ? (
              <div className="glass-card rounded-2xl p-10 text-center shadow-float">
                <Bookmark className="h-12 w-12 text-primary/30 mx-auto mb-4" />
                <h2 className="text-xl font-display font-bold text-foreground mb-2">
                  Please log in to save locations
                </h2>
                <p className="text-muted-foreground font-body text-sm mb-6 max-w-sm mx-auto">
                  You need to be signed in to securely save and access your designated hubs across devices.
                </p>
                <Link to="/student/login">
                  <button className="bg-primary text-white px-8 py-3 rounded-full font-display font-bold text-sm shadow-lg hover:bg-primary/90 transition-colors">
                    Sign In Now
                  </button>
                </Link>
              </div>
            ) : (
              /* ── Bento Grid ── */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* ── Core Hubs Panel ── */}
                <div className="lg:col-span-7 glass-card rounded-2xl p-8 lg:p-10 shadow-float min-h-[400px]">
                  <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-display font-bold text-primary">
                      Core Hubs
                    </h2>
                    <span className="bg-accent text-foreground/70 text-[10px] font-body font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {hubs.length} Saved
                    </span>
                  </div>

                  {loading ? (
                    <div className="flex flex-col items-center justify-center py-16 opacity-50">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-4" />
                      <p className="text-sm font-body text-muted-foreground">Loading hubs...</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {hubs.map((hub) => (
                        <div
                          key={hub.id}
                          className="group flex items-start gap-5 p-5 rounded-2xl transition-all duration-300 hover:bg-white/60"
                        >
                          {/* Icon */}
                          <div className="w-12 h-12 rounded-full bg-accent/80 flex items-center justify-center text-primary group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                            {getIcon(hub.iconType)}
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-display font-bold text-foreground mb-0.5">
                              {hub.label}
                            </h3>
                            <p className="text-sm font-body text-muted-foreground leading-relaxed">
                              {hub.address}
                            </p>

                            {/* Hover Actions */}
                            <div className="mt-3 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              <button className="text-xs font-body font-bold text-primary hover:underline">
                                Directions
                              </button>
                              <button
                                className="text-xs font-body font-bold text-muted-foreground hover:text-red-500 transition-colors"
                                onClick={() => removeHub(hub.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {hubs.length === 0 && (
                        <div className="text-center py-10">
                          <MapPin className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                          <p className="text-sm font-body text-muted-foreground mb-4">
                            You have not saved any hubs securely to your account yet.
                          </p>
                          <button
                            onClick={() => setIsAddModalOpen(true)}
                            className="text-xs font-body font-bold text-primary hover:underline"
                          >
                            + Add securely to Firestore
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* ── Right Column ── */}
                <div className="lg:col-span-5 flex flex-col gap-8">
                  {/* ── Recents Panel ── */}
                  <div className="glass-card rounded-2xl p-8 lg:p-10 shadow-float flex-1">
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-xl font-display font-bold text-primary">
                        Recents
                      </h2>
                      <button
                        className="text-xs font-body font-bold text-muted-foreground hover:text-primary transition-colors"
                        onClick={clearRecents}
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="flex flex-col gap-2">
                      {recents.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 rounded-xl hover:bg-white/40 transition-colors cursor-pointer group"
                        >
                          <Clock className="h-5 w-5 text-muted-foreground/50 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-display font-bold text-foreground truncate">
                              {item.name}
                            </p>
                            <p className="text-xs font-body text-muted-foreground truncate">
                              {item.address}
                            </p>
                          </div>
                          <ArrowUpLeft className="h-4 w-4 text-muted-foreground/40 group-hover:text-primary transition-colors flex-shrink-0" />
                        </div>
                      ))}

                      {recents.length === 0 && (
                        <div className="text-center py-8">
                          <Clock className="h-8 w-8 text-muted-foreground/30 mx-auto mb-2" />
                          <p className="text-xs font-body text-muted-foreground">
                            No recent searches
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ── Explore Map CTA Card ── */}
                  <div className="gradient-hero rounded-2xl p-7 relative overflow-hidden group">
                    <div className="relative z-10">
                      <div className="flex items-center gap-2 mb-2">
                        <Leaf className="h-4 w-4 text-white/50" />
                        <span className="text-[10px] font-body font-bold text-white/50 uppercase tracking-widest">
                          Discover
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-lg text-white mb-2">
                        Explore the Map
                      </h4>
                      <p className="text-sm font-body text-white/70 mb-5 max-w-[220px] leading-relaxed">
                        Visualize your saved hubs in the context of the city's
                        greenest paths.
                      </p>
                      <Link to="/neighborhoods">
                        <button className="bg-white text-primary px-5 py-2.5 rounded-full font-display font-bold text-sm shadow-xl hover:bg-white/90 active:scale-[0.97] transition-all duration-200">
                          Open Explorer
                        </button>
                      </Link>
                    </div>

                    {/* Decorative bg image */}
                    <div className="absolute -right-10 -bottom-10 w-48 h-48 rounded-full overflow-hidden opacity-30 group-hover:scale-110 transition-transform duration-700">
                      <img
                        src={room1}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute top-4 right-8 w-20 h-20 rounded-full bg-white/5 blur-2xl" />
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* ── Mobile Bottom Nav ── */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 z-50 flex justify-around items-center px-6 pb-7 pt-3 bg-white/80 backdrop-blur-2xl shadow-[0_-10px_40px_rgba(0,81,64,0.08)]"
        style={{ borderRadius: "2rem 2rem 0 0" }}
      >
        <Link
          to="/neighborhoods"
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <Compass className="h-5 w-5" />
          <span className="text-[10px] font-body font-bold uppercase tracking-widest">
            Explore
          </span>
        </Link>
        <Link
          to="/map"
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <Map className="h-5 w-5" />
          <span className="text-[10px] font-body font-bold uppercase tracking-widest">
            Map
          </span>
        </Link>
        <Link
          to="/saved-locations"
          className="flex items-center justify-center bg-primary text-white rounded-full w-12 h-12 -mt-6 shadow-lg shadow-primary/40"
        >
          <Heart className="h-5 w-5 fill-white" />
        </Link>
        <Link
          to="/student/profile"
          className="flex flex-col items-center gap-1 text-muted-foreground"
        >
          <User className="h-5 w-5" />
          <span className="text-[10px] font-body font-bold uppercase tracking-widest">
            Me
          </span>
        </Link>
      </nav>

      <div className="hidden lg:block">
        <Footer />
      </div>

      {/* ── Add Location Modal ── */}
      {isAddModalOpen && currentUser && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-background w-full max-w-md rounded-2xl p-6 shadow-2xl relative animate-float-up-fast">
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-accent text-muted-foreground transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
            
            <h3 className="text-xl font-display font-bold text-foreground mb-4">
              Add Secure Location
            </h3>
            
            <form onSubmit={handleAddLocation} className="space-y-4">
              <div>
                <label className="block text-xs font-body font-bold text-muted-foreground mb-1">
                  Location Type
                </label>
                <div className="flex gap-2">
                  {["home", "office", "university", "other"].map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setNewIconType(type)}
                      className={`flex-1 py-2 px-3 rounded-lg flex justify-center items-center border transition-all ${
                        newIconType === type
                          ? "bg-primary text-white border-primary"
                          : "bg-surface border-border flex-1 hover:bg-accent text-muted-foreground"
                      }`}
                    >
                      {type === "home" && <Home className="h-4 w-4" />}
                      {type === "office" && <Briefcase className="h-4 w-4" />}
                      {type === "university" && <GraduationCap className="h-4 w-4" />}
                      {type === "other" && <MapPin className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-body font-bold text-muted-foreground mb-1">
                  Label
                </label>
                <input
                  type="text"
                  required
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="e.g. My Workspace"
                  className="w-full bg-surface border border-border mt-1 px-4 py-2.5 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-body font-bold text-muted-foreground mb-1">
                  Full Address
                </label>
                <input
                  type="text"
                  required
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                  placeholder="e.g. 123 Tech Park, Sector 5"
                  className="w-full bg-surface border border-border mt-1 px-4 py-2.5 rounded-xl text-sm font-body focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 transition-all"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isAdding}
                  className="w-full bg-primary text-white py-3 rounded-xl font-display font-bold text-sm hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAdding ? "Saving securely..." : "Save to Firebase"}
                </button>
                <p className="text-[10px] text-center font-body text-muted-foreground mt-3 flex items-center justify-center gap-1">
                  <Leaf className="h-3 w-3" />
                  Your data is securely stored in Google Firebase Firestore.
                </p>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SavedLocations;

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  Search,
  MapPin,
  Star,
  Wifi,
  Wind,
  Train,
  BookOpen,
  Heart,
  Bell,
  ArrowRight,
  Zap,
  TrendingUp,
  Users,
  Building,
  Leaf,
  ChevronRight,
  Navigation,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import neighborhoodSaltLake from "@/assets/neighborhood-saltlake.png";
import room1 from "@/assets/room1.jpg";
import room2 from "@/assets/room2.jpg";
import room3 from "@/assets/room3.jpg";
import room4 from "@/assets/room4.jpg";

/* ─── Neighborhood Data ─── */
const neighborhoods = [
  {
    id: "salt-lake",
    name: "Salt Lake - IT Hub",
    subtitle: "Sector V Area",
    image: neighborhoodSaltLake,
    priceRange: "₹12k - 25k",
    priceLabel: "AVG. MONTHLY",
    badge: "POPULAR",
    badgeColor: "gold",
    tags: ["WiFi 6", "AC Rooms", "Metro Link", "Library Access"],
    listings: 48,
    rating: 4.8,
    demand: "High",
  },
  {
    id: "gariahat",
    name: "Gariahat - Student Central",
    subtitle: "Southside Market",
    image: room2,
    priceRange: "₹8k - 18k",
    priceLabel: "AVG. MONTHLY",
    badge: "TRENDING",
    badgeColor: "emerald",
    tags: ["Meals", "Laundry", "Bus Route", "24/7 Security"],
    listings: 35,
    rating: 4.7,
    demand: "Medium",
  },
  {
    id: "newtown",
    name: "New Town - Tech Park",
    subtitle: "Smart City Zone",
    image: room3,
    priceRange: "₹15k - 30k",
    priceLabel: "AVG. MONTHLY",
    badge: "PREMIUM",
    badgeColor: "emerald",
    tags: ["WiFi 6", "Gym", "Co-Working", "Pool"],
    listings: 22,
    rating: 4.9,
    demand: "High",
  },
  {
    id: "parkstreet",
    name: "Park Street - Lifestyle",
    subtitle: "Heritage Quarter",
    image: room4,
    priceRange: "₹18k - 35k",
    priceLabel: "AVG. MONTHLY",
    badge: "POPULAR",
    badgeColor: "gold",
    tags: ["AC Rooms", "Meals", "Metro Link", "Rooftop"],
    listings: 18,
    rating: 4.6,
    demand: "Medium",
  },
];

/* ─── Map location pins ─── */
const mapPins = [
  { id: "salt-lake", label: "IT HUB", x: 62, y: 28 },
  { id: "gariahat", label: "STUDENT HUB", x: 38, y: 55 },
  { id: "newtown", label: "TECH PARK", x: 78, y: 45 },
  { id: "parkstreet", label: "LIFESTYLE", x: 30, y: 35 },
  { id: "aot", label: "UNIVERSITY", x: 50, y: 68 },
];

const NeighborhoodExplorer = () => {
  const navigate = useNavigate();
  const [activePin, setActivePin] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  const filteredNeighborhoods = neighborhoods.filter(
    (n) =>
      n.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getBadgeClasses = (color: string) => {
    if (color === "gold") {
      return "bg-gradient-to-r from-amber-400 to-amber-500 text-amber-950";
    }
    return "bg-gradient-to-br from-primary to-[#006c56] text-white";
  };

  return (
    <div className="min-h-screen flex flex-col surface">
      <Navbar />

      {/* ── Main Content: Split Layout ── */}
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* ── LEFT: Interactive Map ── */}
        <div className="relative lg:w-[45%] xl:w-[50%] h-[350px] lg:h-auto lg:min-h-[calc(100vh-64px)] lg:sticky lg:top-16 overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a3d2e] via-[#0d4a3a] to-[#062e22]">
            {/* Grid Overlay */}
            <div
              className="absolute inset-0 opacity-[0.06]"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)
                `,
                backgroundSize: "60px 60px",
              }}
            />

            {/* Road Lines - Decorative */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.12]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Main roads */}
              <path d="M 10,20 L 90,20" stroke="white" strokeWidth="0.5" fill="none" />
              <path d="M 10,50 L 90,50" stroke="white" strokeWidth="0.5" fill="none" />
              <path d="M 10,80 L 90,80" stroke="white" strokeWidth="0.4" fill="none" />
              <path d="M 25,0 L 25,100" stroke="white" strokeWidth="0.5" fill="none" />
              <path d="M 55,0 L 55,100" stroke="white" strokeWidth="0.5" fill="none" />
              <path d="M 80,0 L 80,100" stroke="white" strokeWidth="0.4" fill="none" />
              {/* Diagonal roads */}
              <path d="M 10,10 L 50,50" stroke="white" strokeWidth="0.3" fill="none" />
              <path d="M 50,50 L 90,90" stroke="white" strokeWidth="0.3" fill="none" />
              <path d="M 10,90 L 50,50" stroke="white" strokeWidth="0.3" fill="none" />
              {/* River curve */}
              <path
                d="M 0,75 Q 30,65 50,72 T 100,68"
                stroke="rgba(120,215,187,0.4)"
                strokeWidth="2"
                fill="none"
              />
            </svg>

            {/* Green areas - abstract */}
            <div className="absolute top-[15%] left-[10%] w-20 h-14 rounded-full bg-emerald-600/15 blur-xl" />
            <div className="absolute bottom-[25%] right-[15%] w-24 h-16 rounded-full bg-emerald-500/10 blur-xl" />
            <div className="absolute top-[60%] left-[40%] w-16 h-16 rounded-full bg-teal-500/10 blur-xl" />
          </div>

          {/* Map Pins */}
          {mapPins.map((pin) => (
            <button
              key={pin.id}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-10 transition-all duration-300 group ${
                activePin === pin.id || hoveredCard === pin.id
                  ? "scale-110"
                  : "scale-100 hover:scale-105"
              }`}
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
              onMouseEnter={() => setActivePin(pin.id)}
              onMouseLeave={() => setActivePin(null)}
              onClick={() => {
                const card = document.getElementById(`card-${pin.id}`);
                card?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
            >
              {/* Pin Body */}
              <div
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md border transition-all duration-300 ${
                  activePin === pin.id || hoveredCard === pin.id
                    ? "bg-white/25 border-white/40 shadow-lg shadow-emerald-400/20"
                    : "bg-white/10 border-white/15 hover:bg-white/20"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                    activePin === pin.id || hoveredCard === pin.id
                      ? "bg-emerald-300"
                      : "bg-emerald-400/70"
                  }`}
                />
                <span className="text-[10px] font-body font-bold text-white/90 tracking-wider whitespace-nowrap">
                  {pin.label}
                </span>
              </div>

              {/* Pulse ring */}
              {(activePin === pin.id || hoveredCard === pin.id) && (
                <div className="absolute inset-0 rounded-full animate-ping bg-white/10" />
              )}
            </button>
          ))}

          {/* Live Update Banner */}
          <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6 z-20">
            <div className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-2xl px-5 py-4 shadow-float">
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-body font-bold text-emerald-300 uppercase tracking-widest">
                    Live Update
                  </span>
                </div>
              </div>
              <p className="text-sm font-body text-white/90 leading-relaxed">
                <span className="font-semibold text-white">342</span> New PGs found today.{" "}
                <span className="text-white/70">
                  Demand is high in Salt Lake Sector V. Consider booking tours this weekend.
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT: Neighborhood Cards ── */}
        <div className="flex-1 lg:w-[55%] xl:w-[50%]">
          {/* Header Section */}
          <div className="px-6 lg:px-10 pt-8 lg:pt-10 pb-6">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="glass-card rounded-full flex items-center px-4 py-2.5 shadow-sm hover:shadow-md transition-shadow duration-300 max-w-md">
                <Search className="h-4 w-4 text-primary flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search areas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent text-sm font-body text-foreground placeholder:text-muted-foreground outline-none w-full ml-3"
                />
              </div>
            </div>

            {/* Title */}
            <div>
              <p className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-2">
                Curated Spaces
              </p>
              <h1 className="text-3xl lg:text-4xl font-display font-bold text-foreground leading-tight">
                Neighborhood Explorer
              </h1>
              <p className="text-sm font-body text-muted-foreground mt-3 leading-relaxed max-w-lg">
                Curated urban sanctuaries near your workplace or university.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center gap-6 mt-6">
              {[
                { icon: Building, value: "123", label: "PGs Available" },
                { icon: TrendingUp, value: "4.8", label: "Avg Rating" },
                { icon: Users, value: "2.1k", label: "Active Students" },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                    <stat.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-display font-bold text-foreground">{stat.value}</p>
                    <p className="text-[10px] font-body text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Neighborhood Cards Grid */}
          <div className="px-6 lg:px-10 pb-10 space-y-5">
            {filteredNeighborhoods.map((hood) => (
              <div
                key={hood.id}
                id={`card-${hood.id}`}
                className="group glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer transition-all duration-500"
                onMouseEnter={() => setHoveredCard(hood.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => navigate("/properties")}
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative sm:w-[240px] h-48 sm:h-auto overflow-hidden flex-shrink-0">
                    <div className="absolute inset-0 img-zoom">
                      <img
                        src={hood.image}
                        alt={hood.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Badge */}
                    <div className="absolute top-3 left-3 z-10">
                      <span
                        className={`text-[10px] font-body font-bold uppercase tracking-wider px-3 py-1 rounded-full ${getBadgeClasses(
                          hood.badgeColor
                        )}`}
                      >
                        {hood.badge}
                      </span>
                    </div>

                    {/* Rating */}
                    <div className="absolute top-3 right-3 z-10">
                      <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2 py-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-semibold text-foreground">
                          {hood.rating}
                        </span>
                      </div>
                    </div>

                    {/* Heart */}
                    <button
                      className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart className="h-4 w-4 text-foreground/50 hover:text-red-500 transition-colors" />
                    </button>
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between">
                    <div>
                      {/* Title Row */}
                      <div className="flex items-start justify-between mb-1">
                        <div>
                          <h3 className="font-display font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300">
                            {hood.name}
                          </h3>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3 text-primary" />
                            <span className="text-xs font-body text-muted-foreground">
                              {hood.subtitle}
                            </span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right flex-shrink-0 ml-4">
                          <p className="text-lg font-display font-bold text-primary">
                            {hood.priceRange}
                          </p>
                          <p className="text-[9px] font-body text-muted-foreground uppercase tracking-wider">
                            {hood.priceLabel}
                          </p>
                        </div>
                      </div>

                      {/* Listings count & demand */}
                      <div className="flex items-center gap-3 mt-3">
                        <span className="text-xs font-body text-muted-foreground">
                          <span className="font-semibold text-foreground">{hood.listings}</span>{" "}
                          listings
                        </span>
                        <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                        <span
                          className={`text-xs font-body font-medium ${
                            hood.demand === "High" ? "text-emerald-600" : "text-amber-600"
                          }`}
                        >
                          {hood.demand} Demand
                        </span>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {hood.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 text-[11px] font-body font-medium text-foreground/70 bg-accent/60 px-2.5 py-1 rounded-full"
                        >
                          {tag === "WiFi 6" && <Wifi className="h-3 w-3" />}
                          {tag === "AC Rooms" && <Wind className="h-3 w-3" />}
                          {tag === "Metro Link" && <Train className="h-3 w-3" />}
                          {tag === "Library Access" && <BookOpen className="h-3 w-3" />}
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Explore Arrow */}
                    <div className="flex items-center justify-end mt-4">
                      <span className="flex items-center gap-1 text-xs font-body font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explore
                        <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* No Results */}
            {filteredNeighborhoods.length === 0 && (
              <div className="text-center py-16">
                <Navigation className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-lg font-display font-semibold text-foreground">
                  No neighborhoods found
                </p>
                <p className="text-sm font-body text-muted-foreground mt-1">
                  Try a different search term
                </p>
              </div>
            )}

            {/* Explore All CTA */}
            <div className="mt-8">
              <div className="gradient-hero rounded-2xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-4 right-8 w-32 h-32 rounded-full bg-white/5 blur-2xl" />
                <div className="absolute bottom-4 left-8 w-24 h-24 rounded-full bg-white/5 blur-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-3">
                    <Leaf className="h-5 w-5 opacity-60" />
                    <span className="text-[10px] font-body font-bold text-white/60 uppercase tracking-widest">
                      Discover More
                    </span>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2">
                    Explore All Neighborhoods
                  </h3>
                  <p className="text-sm font-body text-white/70 mb-5 max-w-md">
                    View all curated neighborhoods with verified PGs, hostels, and co-living spaces
                    near your university.
                  </p>
                  <Link to="/properties">
                    <button className="inline-flex items-center gap-2 bg-white text-primary font-body font-semibold text-sm px-6 py-2.5 rounded-full hover:bg-white/90 transition-all duration-300 hover-glow">
                      Browse All Properties
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NeighborhoodExplorer;

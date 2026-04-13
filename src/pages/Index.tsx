import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Star, Shield, Clock, Leaf, ArrowRight, Wifi, Utensils, MapPin, ChevronDown, Home, DollarSign, Building } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";
import room1 from "@/assets/room1.jpg";
import room2 from "@/assets/room2.jpg";
import room3 from "@/assets/room3.jpg";
import room4 from "@/assets/room4.jpg";
import LocationSearchPopover from "@/components/LocationSearchPopover";
import { useState } from "react";

const Index = () => {
  const navigate = useNavigate();
  const [searchLocation, setSearchLocation] = useState("");
  const [budgetRange, setBudgetRange] = useState("");
  const [pgType, setPgType] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchLocation) params.set("location", searchLocation);
    if (budgetRange) params.set("budget", budgetRange);
    if (pgType) params.set("type", pgType);
    navigate(`/find-accommodation?${params.toString()}`);
  };

  const neighborhoods = [
    {
      name: "The Emerald Grove",
      location: "Kalyani/Nadia, Bangaon",
      image: room1,
      count: 12,
      rating: 4.8,
      price: 12500,
      facilities: ["Wi-Fi", "Meals"],
    },
    {
      name: "Sage Residency",
      location: "1200 sq.ft, Bangaon",
      image: room2,
      count: 8,
      rating: 4.7,
      price: 8500,
      facilities: ["Meals", "Attached"],
    },
    {
      name: "Ivy Terrace",
      location: "Kalyani/Nadia, Bangaon",
      image: room3,
      count: 15,
      rating: 4.9,
      price: 15000,
      facilities: ["Wi-Fi", "Gym"],
    },
    {
      name: "The Veranda",
      location: "Adisaptagram, Bangaon",
      image: room4,
      count: 10,
      rating: 4.6,
      price: 11000,
      facilities: ["Wi-Fi", "Meals"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col surface">
      <Navbar />

      {/* ── Hero Section ── */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        {/* Background Illustration Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#e8f5e9]/40 via-[#f8faf9] to-[#f8faf9]" />
        <div
          className="absolute inset-0 bg-contain bg-top bg-no-repeat opacity-20 mix-blend-multiply"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Decorative Circles */}
        <div className="absolute top-10 right-[20%] w-80 h-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-10 left-[10%] w-96 h-96 rounded-full bg-accent/30 blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 mb-4 animate-float-up">
              <span className="text-xs font-body font-semibold text-primary/70 uppercase tracking-widest">
                Urban
              </span>
              <span className="text-xs font-body text-muted-foreground uppercase tracking-widest">
                SANCTUARY
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-4 leading-tight tracking-tight text-foreground animate-float-up-delay-1">
              Find Your Perfect Stay{" "}
              <span className="text-primary">Near You</span>
            </h1>
            <p className="text-base md:text-lg mb-10 text-muted-foreground font-body leading-relaxed max-w-xl mx-auto animate-float-up-delay-2">
              Affordable PGs for students & working professionals. Experience the Urban Sanctuary.
            </p>

            {/* ── Multi-field Search Bar ── */}
            <div className="max-w-3xl mx-auto animate-float-up-delay-3">
              <div className="glass-card rounded-full flex items-center px-3 py-2 gap-0 shadow-float">
                {/* Location — navigates to Neighborhood Explorer or FindAccommodation */}
                <LocationSearchPopover 
                  currentLocation={searchLocation} 
                  onLocationSelect={setSearchLocation} 
                />

                {/* Budget Range */}
                <div className="flex items-center gap-2 flex-1 px-4 py-2 border-r border-border/15">
                  <DollarSign className="h-4 w-4 text-primary flex-shrink-0" />
                  <select
                    value={budgetRange}
                    onChange={(e) => setBudgetRange(e.target.value)}
                    className="bg-transparent text-sm font-body text-foreground outline-none w-full appearance-none cursor-pointer"
                  >
                    <option value="" className="text-muted-foreground">Budget Range</option>
                    <option value="0-3000">₹0 – ₹3,000</option>
                    <option value="3000-5000">₹3,000 – ₹5,000</option>
                    <option value="5000-8000">₹5,000 – ₹8,000</option>
                    <option value="8000-15000">₹8,000 – ₹15,000</option>
                    <option value="15000+">₹15,000+</option>
                  </select>
                </div>

                {/* PG Type */}
                <div className="flex items-center gap-2 flex-1 px-4 py-2">
                  <Building className="h-4 w-4 text-primary flex-shrink-0" />
                  <select
                    value={pgType}
                    onChange={(e) => setPgType(e.target.value)}
                    className="bg-transparent text-sm font-body text-foreground outline-none w-full appearance-none cursor-pointer"
                  >
                    <option value="" className="text-muted-foreground">PG Type</option>
                    <option value="PG">PG</option>
                    <option value="Hostel">Hostel</option>
                    <option value="Mess">Mess</option>
                    <option value="Co-Living">Co-Living</option>
                  </select>
                </div>

                {/* Search Button */}
                <Button
                  onClick={handleSearch}
                  className="rounded-full bg-primary hover:bg-primary/90 text-white font-body font-semibold text-sm px-6 py-2 hover-glow transition-all duration-300 flex-shrink-0"
                >
                  Search
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Neighborhoods ── */}
      <section className="py-16 surface">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-xs font-body font-semibold text-primary uppercase tracking-widest mb-2">
                Curated Spaces
              </p>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Featured Neighborhoods
              </h2>
            </div>
            <Link to="/properties">
              <button className="flex items-center gap-1 text-sm font-body font-medium text-primary hover:text-primary/80 transition-colors group">
                View all listings
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {neighborhoods.map((hood, idx) => (
              <Link to="/properties" key={idx}>
                <div className="group glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer">
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden img-zoom">
                    <img
                      src={hood.image}
                      alt={hood.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Rating badge */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm rounded-full px-2.5 py-1">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-xs font-semibold text-foreground">{hood.rating}</span>
                    </div>
                    {/* Count badge */}
                    <div className="absolute top-3 left-3">
                      <span className="chip bg-primary text-white text-xs px-2.5 py-1 rounded-full font-medium">
                        {hood.count} listings
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-foreground text-base mb-1">
                      {hood.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mb-3">
                      <MapPin className="h-3 w-3 text-primary" />
                      <span>{hood.location}</span>
                    </div>

                    {/* Price + Facilities */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-display font-bold text-primary">
                          ₹{hood.price.toLocaleString()}
                        </span>
                        <span className="text-xs text-muted-foreground">/mo</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {hood.facilities.includes("Wi-Fi") && (
                          <span className="w-7 h-7 rounded-lg bg-accent/60 flex items-center justify-center">
                            <Wifi className="h-3.5 w-3.5 text-primary" />
                          </span>
                        )}
                        {hood.facilities.includes("Meals") && (
                          <span className="w-7 h-7 rounded-lg bg-accent/60 flex items-center justify-center">
                            <Utensils className="h-3.5 w-3.5 text-primary" />
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats Section ── */}
      <section className="py-16 surface-low">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto text-center">
            {[
              { value: "500+", label: "Verified PGs" },
              { value: "10k+", label: "Happy Residents" },
              { value: "12+", label: "City Hubs" },
              { value: "4.8", label: "Avg. Rating" },
            ].map((stat, idx) => (
              <div key={idx} className="space-y-1">
                <p className="text-3xl md:text-4xl font-display font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-xs font-body text-muted-foreground uppercase tracking-wider">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EduStay Promise Section ── */}
      <section className="py-20 surface">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sm font-body font-semibold text-primary uppercase tracking-widest mb-3">
              Why EduStay
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              The EduStay Promise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Verified Listings",
                desc: "Every property is personally verified for authenticity, safety, and quality standards",
              },
              {
                icon: Clock,
                title: "Quick Discovery",
                desc: "Find your perfect sanctuary in minutes with our intelligent matching filters",
              },
              {
                icon: Star,
                title: "Trusted Community",
                desc: "Connect directly with verified property owners backed by real student reviews",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-8 text-center hover-lift"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-5">
                  <feature.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-display font-semibold mb-3 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-20 surface-low">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sm font-body font-semibold text-primary uppercase tracking-widest mb-3">
              Resident Experiences
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              What Students Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "The focus on light and air quality is noticeable. I've never felt more at home away from home. EduStay made finding my PG effortless.",
                name: "Riya Sharma",
                role: "AOT, 1st Year",
                rating: 5,
              },
              {
                quote: "Verified listings gave me confidence in booking. The community events are actually meaningful — it feels like a real community.",
                name: "Ankit Das",
                role: "AOT, 2nd Year",
                rating: 5,
              },
              {
                quote: "The interface is clean and the search filters are powerful. Found my perfect PG near college within 10 minutes.",
                name: "Priya Mukherjee",
                role: "AOT, Final Year",
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div
                key={idx}
                className="glass-card rounded-2xl p-7 hover-lift"
              >
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="mb-6 text-foreground font-body leading-relaxed text-sm italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-display font-semibold text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground font-body">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 gradient-hero text-white relative overflow-hidden">
        <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full bg-white/5 blur-3xl" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <Leaf className="h-10 w-10 mx-auto mb-6 opacity-60" />
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Have a property near Academy of Technology?
          </h2>
          <p className="text-lg mb-10 opacity-80 font-body max-w-lg mx-auto">
            List your property on EduStay and connect with students looking for their urban sanctuary
          </p>
          <Link to="/owner/list-property">
            <Button
              size="lg"
              className="rounded-full bg-white text-primary font-display font-semibold px-8 hover:bg-white/90 hover-glow transition-all duration-300"
            >
              List Your Property
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
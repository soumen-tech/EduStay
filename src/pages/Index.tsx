import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, Star, Shield, Clock, Leaf, ArrowRight, Wifi, Utensils, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import heroBg from "@/assets/hero-bg.jpg";
import room1 from "@/assets/room1.jpg";
import room2 from "@/assets/room2.jpg";
import room3 from "@/assets/room3.jpg";
import room4 from "@/assets/room4.jpg";

const Index = () => {
  const featuredProperties = [{
    id: 1,
    image: room1,
    name: "Ghosh Residency PG",
    price: 4500,
    distance: "800m",
    type: "PG",
    facilities: ["Wi-Fi", "Meals"],
    owner: "Mr. S. Ghosh",
    rating: 4.5,
    gender: "Boys",
    savedCount: 42
  }, {
    id: 2,
    image: room2,
    name: "Mitra Boys Hostel",
    price: 4000,
    distance: "1km",
    type: "Hostel",
    facilities: ["Wi-Fi"],
    owner: "Mrs. Mitra",
    rating: 4.2,
    gender: "Boys",
    savedCount: 35
  }, {
    id: 3,
    image: room3,
    name: "Saha Mess & Rooms",
    price: 5000,
    distance: "600m",
    type: "Mess",
    facilities: ["Meals", "Attached"],
    owner: "Mr. Saha",
    rating: 4.7,
    gender: "Both",
    savedCount: 58
  }, {
    id: 4,
    image: room1,
    name: "Dutta Girls PG",
    price: 4200,
    distance: "1.2km",
    type: "PG",
    facilities: ["Wi-Fi", "Meals", "Attached"],
    owner: "Mrs. R. Dutta",
    rating: 4.6,
    gender: "Girls",
    savedCount: 67
  }, {
    id: 5,
    image: room2,
    name: "Banerjee Student Hostel",
    price: 3800,
    distance: "900m",
    type: "Hostel",
    facilities: ["Wi-Fi", "Laundry"],
    owner: "Mr. A. Banerjee",
    rating: 4.3,
    gender: "Boys",
    savedCount: 29
  }, {
    id: 6,
    image: room3,
    name: "Roy Co-Living Space",
    price: 5200,
    distance: "700m",
    type: "PG",
    facilities: ["Wi-Fi", "Meals", "Gym"],
    owner: "Mr. P. Roy",
    rating: 4.8,
    gender: "Both",
    savedCount: 73
  }];

  const neighborhoods = [
    { name: "The Emerald Grove", desc: "Lush greenery & serene pathways", image: room1, count: 12 },
    { name: "Sage Residency", desc: "Modern living with nature", image: room2, count: 8 },
    { name: "Ivy Terrace", desc: "Elevated views & fresh air", image: room3, count: 15 },
    { name: "The Veranda", desc: "Community-focused living", image: room4, count: 10 },
  ];

  return (
    <div className="min-h-screen flex flex-col surface">
      <Navbar />
      
      {/* ── Hero Section ── */}
      <section className="relative py-24 md:py-36 overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 gradient-hero" />
        {/* Background image overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-overlay transition-opacity duration-700" 
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Decorative circles */}
        <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm mb-6 animate-float-up">
              <Leaf className="h-4 w-4" />
              <span className="text-sm font-body font-medium">Your Urban Sanctuary</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold mb-6 leading-tight tracking-tight animate-float-up-delay-1">
              Find Your Perfect Stay<br />
              <span className="text-verdant-300">Near You</span>
            </h1>
            <p className="text-lg md:text-xl mb-10 opacity-90 font-body leading-relaxed max-w-xl mx-auto animate-float-up-delay-2">
              Affordable PGs for students & working professionals. Experience the Urban Sanctuary.
            </p>

            {/* Search CTA */}
            <div className="max-w-lg mx-auto animate-float-up-delay-3">
              <Link to="/find-accommodation" className="w-full block">
                <div className="glass rounded-full flex items-center px-6 py-4 gap-3 hover:bg-white/20 transition-all duration-300 group cursor-pointer">
                  <Search className="h-5 w-5 text-white/80 group-hover:text-white transition-colors" />
                  <span className="text-white/70 font-body text-left flex-1">Search for location, PG, or amenity...</span>
                  <div className="bg-white text-primary rounded-full px-5 py-2 font-body font-semibold text-sm hover-glow transition-all duration-300">
                    Search
                  </div>
                </div>
              </Link>
            </div>

            {/* Quick Stats */}
            <div className="flex items-center justify-center gap-8 mt-10 animate-float-up-delay-3">
              <div className="text-center">
                <p className="text-2xl font-display font-bold">500+</p>
                <p className="text-xs text-white/70 font-body">Verified PGs</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-display font-bold">2000+</p>
                <p className="text-xs text-white/70 font-body">Happy Students</p>
              </div>
              <div className="w-px h-10 bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-display font-bold">4.8★</p>
                <p className="text-xs text-white/70 font-body">Avg Rating</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Neighborhoods ── */}
      <section className="py-20 surface-low">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <p className="text-sm font-body font-semibold text-primary uppercase tracking-widest mb-3">
              Explore
            </p>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Featured Neighborhoods
            </h2>
            <p className="text-muted-foreground font-body max-w-md mx-auto">
              Discover curated living spaces crafted for the modern student
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {neighborhoods.map((hood, idx) => (
              <Link to="/properties" key={idx}>
                <div className="group glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer">
                  <div className="relative h-44 overflow-hidden img-zoom">
                    <img src={hood.image} alt={hood.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4">
                      <h3 className="font-display font-bold text-white text-lg">{hood.name}</h3>
                      <p className="text-white/80 text-xs font-body">{hood.desc}</p>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <span className="chip text-xs">{hood.count} properties</span>
                    <ArrowRight className="h-4 w-4 text-primary group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Properties ── */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-sm font-body font-semibold text-primary uppercase tracking-widest mb-3">
                Curated for you
              </p>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
                Featured Properties
              </h2>
            </div>
            <Link to="/properties">
              <Button variant="ghost" className="rounded-full font-body group text-primary hover:bg-accent">
                View All
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => <PropertyCard key={property.id} {...property} />)}
          </div>
        </div>
      </section>

      {/* ── Features Section ── */}
      <section className="py-20 surface-low">
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
      <section className="py-20">
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
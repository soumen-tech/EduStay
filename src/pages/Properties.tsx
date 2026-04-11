import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { SlidersHorizontal, X, Search, MapPin, ArrowLeft, Map } from "lucide-react";
import room1 from "@/assets/room1.jpg";
import room2 from "@/assets/room2.jpg";
import room3 from "@/assets/room3.jpg";
import room4 from "@/assets/room4.jpg";

const Properties = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([3000, 10000]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("verified");

  const allProperties = [
    { id: 1, image: room1, name: "Ghosh Residency PG", price: 4500, distance: "800m", type: "PG", facilities: ["Wi-Fi", "Meals"], owner: "Mr. S. Ghosh", verified: true, rating: 4.5, gender: "Boys", savedCount: 42 },
    { id: 2, image: room2, name: "Mitra Boys Hostel", price: 4000, distance: "1km", type: "Hostel", facilities: ["Wi-Fi"], owner: "Mrs. Mitra", verified: true, rating: 4.2, gender: "Boys", savedCount: 35 },
    { id: 3, image: room3, name: "Saha Mess & Rooms", price: 5000, distance: "600m", type: "Mess", facilities: ["Meals"], owner: "Mr. Saha", verified: false, rating: 3.8, gender: "Both", savedCount: 58 },
    { id: 4, image: room4, name: "AOT Comfort Stay", price: 4800, distance: "900m", type: "PG", facilities: ["Wi-Fi", "Laundry"], owner: "Mr. Roy", verified: true, rating: 4.7, gender: "Boys", savedCount: 29 },
    { id: 5, image: room1, name: "Sunshine Girls PG", price: 4300, distance: "1.2km", type: "PG", facilities: ["Wi-Fi", "Meals", "Laundry"], owner: "Mrs. Sen", verified: true, rating: 4.6, gender: "Girls", savedCount: 67 },
    { id: 6, image: room2, name: "Roy Co-Living Space", price: 5200, distance: "700m", type: "PG", facilities: ["Wi-Fi", "Meals", "Gym"], owner: "Mr. P. Roy", verified: true, rating: 4.8, gender: "Both", savedCount: 73 },
    { id: 7, image: room3, name: "Sen Girls Hostel", price: 4300, distance: "1.5km", type: "Hostel", facilities: ["Wi-Fi", "Meals"], owner: "Mrs. M. Sen", verified: true, rating: 4.4, gender: "Girls", savedCount: 51 },
    { id: 8, image: room4, name: "Chakraborty Mess", price: 3500, distance: "1.1km", type: "Mess", facilities: ["Meals", "Laundry"], owner: "Mr. S. Chakraborty", verified: false, rating: 4.1, gender: "Boys", savedCount: 38 }
  ];

  const filteredProperties = allProperties.filter(prop => {
    if (verifiedOnly && !prop.verified) return false;
    if (prop.price < priceRange[0] || prop.price > priceRange[1]) return false;
    if (selectedGender !== "all" && prop.gender !== selectedGender) return false;
    if (selectedType !== "all" && prop.type !== selectedType) return false;
    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "verified") {
      if (a.verified && !b.verified) return -1;
      if (!a.verified && b.verified) return 1;
      return b.rating - a.rating;
    }
    if (sortBy === "price-asc") return a.price - b.price;
    if (sortBy === "price-desc") return b.price - a.price;
    return 0;
  });

  const activeFiltersCount = [verifiedOnly, selectedGender !== "all", selectedType !== "all"].filter(Boolean).length;
  const resetFilters = () => {
    setPriceRange([3000, 10000]);
    setVerifiedOnly(false);
    setSelectedGender("all");
    setSelectedType("all");
  };

  return (
    <div className="min-h-screen flex flex-col surface">
      <Navbar />
      <main className="flex-1">
        {/* Back + Breadcrumb */}
        <div className="container mx-auto px-4 pt-6">
          <div className="flex items-center gap-2 text-sm font-body text-muted-foreground mb-4">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground font-medium">Neighborhoods</span>
          </div>
        </div>

        {/* Hero Header */}
        <section className="gradient-hero text-white py-14 relative overflow-hidden">
          <div className="absolute top-10 right-20 w-64 h-64 rounded-full bg-white/5 blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-3">
              Urban Sanctuaries Near AOT
            </h1>
            <p className="text-lg opacity-80 font-body">
              Showing {sortedProperties.length} boutique PG residences
            </p>
          </div>
        </section>

        {/* Search + Filters Bar */}
        <section className="py-6 surface-low">
          <div className="container mx-auto px-4 space-y-4">
            {/* Floating Search Bar */}
            <div className="glass-card rounded-full flex items-center px-5 py-3 gap-3 max-w-xl">
              <Search className="h-4 w-4 text-primary flex-shrink-0" />
              <input
                type="text"
                placeholder="Search by name, area, or amenity..."
                className="flex-1 bg-transparent outline-none text-sm font-body text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
              <div className="flex gap-2 items-center flex-wrap">
                <Button
                  variant="ghost"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`rounded-full font-body text-sm transition-all duration-300 ${
                    showFilters ? 'bg-primary text-white hover:bg-primary/90' : 'hover:bg-accent'
                  }`}
                >
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Refine Search {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="rounded-full bg-white w-[220px] text-sm font-body shadow-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Verified → Rating</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                {activeFiltersCount > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="rounded-full font-body text-sm text-muted-foreground hover:text-foreground"
                  >
                    <X className="h-3.5 w-3.5 mr-1" /> Reset
                  </Button>
                )}
              </div>
              <Link to="/map">
                <Button variant="ghost" className="rounded-full font-body text-sm hover:bg-accent gap-2">
                  <Map className="h-4 w-4" />
                  Map View
                </Button>
              </Link>
            </div>

            {/* Filter Panel */}
            {showFilters && (
              <div className="glass-card rounded-2xl p-6 animate-float-up space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-semibold">Refine Search</h3>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full h-8 w-8"
                    onClick={() => setShowFilters(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3">
                    <Label className="font-body text-sm font-medium">
                      Budget: ₹{priceRange[0].toLocaleString()} – ₹{priceRange[1].toLocaleString()}
                    </Label>
                    <Slider min={2000} max={15000} step={500} value={priceRange} onValueChange={setPriceRange} />
                  </div>
                  <div className="space-y-3">
                    <Label className="font-body text-sm font-medium">Gender</Label>
                    <Select value={selectedGender} onValueChange={setSelectedGender}>
                      <SelectTrigger className="rounded-xl bg-white"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Boys">Boys</SelectItem>
                        <SelectItem value="Girls">Girls</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between md:justify-start md:gap-4">
                    <Label className="font-body text-sm font-medium">Verified Only</Label>
                    <Switch checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Property Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>

            {sortedProperties.length === 0 && (
              <div className="text-center py-20">
                <MapPin className="h-12 w-12 text-muted-foreground/40 mx-auto mb-4" />
                <p className="font-display font-semibold text-lg text-foreground mb-2">
                  No sanctuaries found
                </p>
                <p className="text-muted-foreground font-body text-sm">
                  Try adjusting your filters to discover more options
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Neighborhood Glance CTA */}
        <section className="py-12 surface-low">
          <div className="container mx-auto px-4">
            <div className="glass-card rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display font-bold text-lg mb-2">Neighborhood Glance</h3>
                <p className="text-muted-foreground font-body text-sm">
                  See commute times and nearby cafes on our interactive map.
                </p>
              </div>
              <Link to="/map">
                <Button className="rounded-full bg-primary text-white font-body hover-glow transition-all duration-300">
                  <Map className="h-4 w-4 mr-2" />
                  Open Map
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;

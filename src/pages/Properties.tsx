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
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SlidersHorizontal, X, Wifi, Utensils, Droplet, Shirt, ArrowLeft } from "lucide-react";
import room1 from "@/assets/room1.jpg";
import room2 from "@/assets/room2.jpg";
import room3 from "@/assets/room3.jpg";
import room4 from "@/assets/room4.jpg";

const Properties = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([3000, 10000]);
  const [distance, setDistance] = useState([5]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [selectedGender, setSelectedGender] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [amenities, setAmenities] = useState({
    wifi: false,
    meals: false,
    attachedBath: false,
    laundry: false
  });
  const [sortBy, setSortBy] = useState("verified");
  const [searchLocation, setSearchLocation] = useState("");

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
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-6">
          <Link to="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        <section className="gradient-hero text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Available Properties</h1>
            <p className="text-lg opacity-90">Browse verified rooms, PGs, and mess facilities</p>
          </div>
        </section>

        <section className="py-8 bg-secondary">
          <div className="container mx-auto px-4 space-y-4">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex gap-2 items-center flex-wrap">
                <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                </Button>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="bg-white w-[240px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="verified">Verified → Rating</SelectItem>
                    <SelectItem value="price-asc">Price: Low to High</SelectItem>
                    <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
                {activeFiltersCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={resetFilters}>
                    <X className="h-4 w-4 mr-2" />Reset
                  </Button>
                )}
              </div>
              <p className="text-muted-foreground">{sortedProperties.length} properties</p>
            </div>

            {showFilters && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Filters</span>
                    <Button variant="ghost" size="sm" onClick={() => setShowFilters(false)}><X className="h-4 w-4" /></Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Price: ₹{priceRange[0]} - ₹{priceRange[1]}</Label>
                    <Slider min={2000} max={15000} step={500} value={priceRange} onValueChange={setPriceRange} />
                  </div>
                  <div>
                    <Label>Gender</Label>
                    <Select value={selectedGender} onValueChange={setSelectedGender}>
                      <SelectTrigger className="bg-white"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="Boys">Boys</SelectItem>
                        <SelectItem value="Girls">Girls</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center justify-between">
                    <Label>Verified Only</Label>
                    <Switch checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;

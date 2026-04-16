import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Search, SlidersHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import room1 from "@/assets/room1.jpg";
import room2 from "@/assets/room2.jpg";
import room3 from "@/assets/room3.jpg";
import room4 from "@/assets/room4.jpg";
import { LocationCombobox } from "@/components/LocationCombobox";
import { useLocationAPIs, useDebounce } from "@/hooks/useLocationAPIs";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const FindAccommodation = () => {
  const [searchParams] = useSearchParams();
  const initialMinBudget = searchParams.get("minBudget");
  const initialMaxBudget = searchParams.get("maxBudget");
  const initialGender = searchParams.get("gender");

  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [college, setCollege] = useState("");
  const [instSearchQuery, setInstSearchQuery] = useState("");

  const {
    states, statesLoading,
    cities, citiesLoading, fetchCities,
    institutions, instLoading, fetchInstitutions
  } = useLocationAPIs();

  const debouncedInstQuery = useDebounce(instSearchQuery, 500);

  useEffect(() => {
    fetchCities(state);
  }, [state]);

  useEffect(() => {
    fetchInstitutions(debouncedInstQuery, city);
  }, [debouncedInstQuery, city]);

  const handleStateChange = (value: string) => {
    setState(value);
    setCity("");
    setCollege("");
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    setCollege("");
  };
  const [maxDistance, setMaxDistance] = useState([5]);
  const [roomType, setRoomType] = useState("");
  const [priceRange, setPriceRange] = useState([
    initialMinBudget ? parseInt(initialMinBudget) : 3000,
    initialMaxBudget ? parseInt(initialMaxBudget) : 6000
  ]);
  const [minRating, setMinRating] = useState("");
  const [gender, setGender] = useState(initialGender || "");
  const [sortBy, setSortBy] = useState("verified");
  const [showResults, setShowResults] = useState(false);
  
  const [amenities, setAmenities] = useState({
    wifi: false,
    meals: false,
    attached: false,
    laundry: false,
  });

  // Extended demo listings with 20+ properties
  const allProperties = [
    { id: 1, image: room1, name: "Ghosh Residency PG", price: 4500, distance: "800m", lat: 22.804, lng: 88.397, type: "PG", facilities: ["Wi-Fi", "Meals"], owner: "Mr. S. Ghosh", rating: 4.5, gender: "Boys", savedCount: 42, verified: true, roomType: "Double" },
    { id: 2, image: room2, name: "Mitra Boys Hostel", price: 4000, distance: "1km", lat: 22.805, lng: 88.405, type: "Hostel", facilities: ["Wi-Fi"], owner: "Mrs. Mitra", rating: 4.2, gender: "Boys", savedCount: 35, verified: true, roomType: "Shared" },
    { id: 3, image: room3, name: "Saha Mess & Rooms", price: 5000, distance: "600m", lat: 22.795, lng: 88.395, type: "Mess", facilities: ["Meals", "Attached"], owner: "Mr. Saha", rating: 4.7, gender: "Both", savedCount: 58, verified: true, roomType: "Single" },
    { id: 4, image: room1, name: "Dutta Girls PG", price: 4200, distance: "1.2km", lat: 22.798, lng: 88.408, type: "PG", facilities: ["Wi-Fi", "Meals", "Attached"], owner: "Mrs. R. Dutta", rating: 4.6, gender: "Girls", savedCount: 67, verified: true, roomType: "Double" },
    { id: 5, image: room2, name: "Banerjee Student Hostel", price: 3800, distance: "900m", lat: 22.792, lng: 88.401, type: "Hostel", facilities: ["Wi-Fi", "Laundry"], owner: "Mr. A. Banerjee", rating: 4.3, gender: "Boys", savedCount: 29, verified: false, roomType: "Shared" },
    { id: 6, image: room3, name: "Roy Co-Living Space", price: 5200, distance: "700m", lat: 22.803, lng: 88.397, type: "PG", facilities: ["Wi-Fi", "Meals"], owner: "Mr. P. Roy", rating: 4.8, gender: "Both", savedCount: 73, verified: true, roomType: "Single" },
    { id: 7, image: room4, name: "Sen Girls Hostel", price: 4300, distance: "1.5km", lat: 22.808, lng: 88.410, type: "Hostel", facilities: ["Wi-Fi", "Meals"], owner: "Mrs. M. Sen", rating: 4.4, gender: "Girls", savedCount: 51, verified: true, roomType: "Double" },
    { id: 8, image: room1, name: "Chakraborty Mess", price: 3500, distance: "1.1km", lat: 22.790, lng: 88.398, type: "Mess", facilities: ["Meals", "Laundry"], owner: "Mr. S. Chakraborty", rating: 4.1, gender: "Boys", savedCount: 38, verified: false, roomType: "Shared" },
    { id: 9, image: room2, name: "Das Brothers PG", price: 4700, distance: "1.3km", lat: 22.809, lng: 88.392, type: "PG", facilities: ["Wi-Fi", "Attached"], owner: "Das Brothers", rating: 4.5, gender: "Boys", savedCount: 45, verified: true, roomType: "Double" },
    { id: 10, image: room3, name: "Mukherjee Girls Residence", price: 4900, distance: "950m", lat: 22.801, lng: 88.390, type: "PG", facilities: ["Wi-Fi", "Meals", "Laundry"], owner: "Mrs. Mukherjee", rating: 4.7, gender: "Girls", savedCount: 62, verified: true, roomType: "Single" },
    { id: 11, image: room4, name: "Bose Student Living", price: 3900, distance: "1.8km", lat: 22.812, lng: 88.415, type: "Hostel", facilities: ["Wi-Fi"], owner: "Mr. N. Bose", rating: 4.0, gender: "Both", savedCount: 33, verified: false, roomType: "Shared" },
    { id: 12, image: room1, name: "Pal Family PG", price: 4400, distance: "650m", lat: 22.796, lng: 88.404, type: "PG", facilities: ["Meals", "Attached"], owner: "Pal Family", rating: 4.6, gender: "Girls", savedCount: 54, verified: true, roomType: "Double" },
    { id: 13, image: room2, name: "Sharma Boys Mess", price: 3600, distance: "2km", lat: 22.815, lng: 88.388, type: "Mess", facilities: ["Meals"], owner: "Mr. K. Sharma", rating: 3.9, gender: "Boys", savedCount: 27, verified: false, roomType: "Shared" },
    { id: 14, image: room3, name: "Modern Student Hub", price: 5500, distance: "500m", lat: 22.800, lng: 88.398, type: "PG", facilities: ["Wi-Fi", "Meals", "Laundry", "Attached"], owner: "Hub Management", rating: 4.9, gender: "Both", savedCount: 89, verified: true, roomType: "Single" },
    { id: 15, image: room4, name: "Gupta Residency", price: 4100, distance: "1.4km", lat: 22.788, lng: 88.411, type: "Hostel", facilities: ["Wi-Fi", "Attached"], owner: "Mr. V. Gupta", rating: 4.3, gender: "Boys", savedCount: 41, verified: true, roomType: "Double" },
    { id: 16, image: room1, name: "Singh Girls Hostel", price: 4600, distance: "850m", lat: 22.805, lng: 88.396, type: "Hostel", facilities: ["Wi-Fi", "Meals"], owner: "Mrs. P. Singh", rating: 4.5, gender: "Girls", savedCount: 56, verified: true, roomType: "Shared" },
    { id: 17, image: room2, name: "Verma Student Mess", price: 3400, distance: "1.7km", lat: 22.814, lng: 88.409, type: "Mess", facilities: ["Meals", "Laundry"], owner: "Mr. Verma", rating: 3.8, gender: "Boys", savedCount: 22, verified: false, roomType: "Shared" },
    { id: 18, image: room3, name: "Agarwal Co-Ed PG", price: 4800, distance: "750m", lat: 22.798, lng: 88.395, type: "PG", facilities: ["Wi-Fi", "Attached"], owner: "Agarwal Family", rating: 4.6, gender: "Both", savedCount: 64, verified: true, roomType: "Double" },
    { id: 19, image: room4, name: "Kumar Deluxe PG", price: 5300, distance: "600m", lat: 22.802, lng: 88.399, type: "PG", facilities: ["Wi-Fi", "Meals", "Attached", "Laundry"], owner: "Mr. R. Kumar", rating: 4.8, gender: "Boys", savedCount: 71, verified: true, roomType: "Single" },
    { id: 20, image: room1, name: "Joshi Girls Residence", price: 4500, distance: "1.1km", lat: 22.791, lng: 88.406, type: "PG", facilities: ["Wi-Fi", "Meals"], owner: "Mrs. Joshi", rating: 4.4, gender: "Girls", savedCount: 48, verified: true, roomType: "Double" },
    { id: 21, image: room2, name: "Patel Economy Hostel", price: 3300, distance: "2.2km", lat: 22.785, lng: 88.392, type: "Hostel", facilities: ["Wi-Fi"], owner: "Mr. H. Patel", rating: 3.7, gender: "Boys", savedCount: 19, verified: false, roomType: "Shared" },
    { id: 22, image: room3, name: "Reddy Premium Living", price: 5800, distance: "450m", lat: 22.799, lng: 88.404, type: "PG", facilities: ["Wi-Fi", "Meals", "Attached", "Laundry"], owner: "Reddy Ventures", rating: 4.9, gender: "Both", savedCount: 95, verified: true, roomType: "Single" },
  ];

  const targetLatStr = searchParams.get("lat");
  const targetLngStr = searchParams.get("lng");
  const targetLocationName = searchParams.get("location");
  
  const targetLat = targetLatStr ? parseFloat(targetLatStr) : null;
  const targetLng = targetLngStr ? parseFloat(targetLngStr) : null;

  const geometryLib = useMapsLibrary("geometry");
  const [propertiesWithDistance, setPropertiesWithDistance] = useState(allProperties.map(p => ({ ...p, _rawDistance: parseFloat(p.distance.replace('km', '000').replace('m', '')) })));

  useEffect(() => {
    // If we have a target coordinate and Google Maps Geometry is loaded
    if (geometryLib && targetLat && targetLng) {
      const targetLatLng = new google.maps.LatLng(targetLat, targetLng);
      const updatedProps = allProperties.map(p => {
        if (p.lat && p.lng) {
          const propLatLng = new google.maps.LatLng(p.lat, p.lng);
          const distMeters = geometryLib.spherical.computeDistanceBetween(targetLatLng, propLatLng);
          
          let distString = "";
          if (distMeters < 1000) {
            distString = `${Math.round(distMeters)}m`;
          } else {
            distString = `${(distMeters / 1000).toFixed(1)}km (${Math.round(distMeters)}m)`;
          }
          
          return { ...p, distance: distString, _rawDistance: distMeters };
        }
        return { ...p, _rawDistance: 999999 };
      });
      setPropertiesWithDistance(updatedProps);
    } else {
       // Reset to default
       setPropertiesWithDistance(allProperties.map(p => ({ ...p, _rawDistance: parseFloat(p.distance.replace('km', '000').replace('m', '')) })));
    }
    
    // Auto-search if location was passed in params
    if (targetLocationName || (targetLat && targetLng)) {
      setShowResults(true);
    }
  }, [geometryLib, targetLat, targetLng, targetLocationName]);

  const handleFind = async () => {
    setShowResults(true);
    
    // Save to Firebase Database
    try {
      await addDoc(collection(db, "searches"), {
        state,
        city,
        collegeOrOffice: college,
        maxDistance: maxDistance[0],
        roomType,
        priceRange,
        gender,
        minRating,
        timestamp: serverTimestamp(),
      });
      console.log("User search data successfully stored in database.");
    } catch (error) {
      console.error("Error saving user search to database:", error);
    }
  };

  const filteredProperties = propertiesWithDistance.filter((property) => {
    // Price filter
    if (property.price < priceRange[0] || property.price > priceRange[1]) return false;
    
    // Gender filter
    if (gender && gender !== "all" && property.gender !== gender && property.gender !== "Both") return false;
    
    // Rating filter
    if (minRating && property.rating < parseFloat(minRating)) return false;
    
    // Room type filter
    if (roomType && property.roomType !== roomType) return false;
    
    // Amenities filter
    if (amenities.wifi && !property.facilities.includes("Wi-Fi")) return false;
    if (amenities.meals && !property.facilities.includes("Meals")) return false;
    if (amenities.attached && !property.facilities.includes("Attached")) return false;
    if (amenities.laundry && !property.facilities.includes("Laundry")) return false;
    
    return true;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    switch (sortBy) {
      case "verified":
        return (b.verified ? 1 : 0) - (a.verified ? 1 : 0);
      case "rating":
        return b.rating - a.rating;
      case "distance":
        return a._rawDistance - b._rawDistance;
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <svg className="h-4 w-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
            Go back to Home
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Find Accommodation</h1>
          <p className="text-muted-foreground">
            {targetLocationName ? `Properties near ${targetLocationName}` : "Use filters to find your perfect stay near Academy of Technology"}
          </p>
          <Badge variant="outline" className="mt-2">Demo Content — Fictional</Badge>
        </div>

        {/* Filters Panel */}
        <div className="bg-card rounded-lg shadow-card p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-semibold">Filter Options</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* State Filter */}
            <div className="space-y-2">
              <Label>State</Label>
              <LocationCombobox
                value={state}
                onValueChange={handleStateChange}
                items={states}
                loading={statesLoading}
                placeholder="Select State"
                searchPlaceholder="Search state..."
                emptyText="No state found."
              />
            </div>

            {/* City Filter */}
            <div className="space-y-2">
              <Label>City</Label>
              <LocationCombobox
                value={city}
                onValueChange={handleCityChange}
                items={cities}
                loading={citiesLoading}
                disabled={!state}
                placeholder="Select City"
                searchPlaceholder="Search city..."
                emptyText="No city found."
              />
            </div>

            {/* College/Office Filter */}
            <div className="space-y-2">
              <Label>College / Office</Label>
              <LocationCombobox
                value={college}
                onValueChange={setCollege}
                items={institutions}
                loading={instLoading}
                disabled={!city}
                placeholder="Select Region"
                searchPlaceholder="Search colleges or offices..."
                emptyText="No locations found. Try typing."
                onSearchChange={setInstSearchQuery}
                filterLocal={false}
              />
            </div>

            {/* Max Distance */}
            <div className="space-y-2">
              <Label>Max Distance: {maxDistance[0]}km</Label>
              <Slider
                value={maxDistance}
                onValueChange={setMaxDistance}
                min={0.5}
                max={10}
                step={0.5}
                className="mt-2"
              />
            </div>

            {/* Room Type */}
            <div className="space-y-2">
              <Label>Room Type</Label>
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Single">Single</SelectItem>
                  <SelectItem value="Double">Double</SelectItem>
                  <SelectItem value="Shared">Shared</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <Label>Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="Boys">Boys Only</SelectItem>
                  <SelectItem value="Girls">Girls Only</SelectItem>
                  <SelectItem value="Both">Both</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Price Range */}
            <div className="space-y-2 md:col-span-2">
              <Label>Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}</Label>
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                min={3000}
                max={7000}
                step={100}
                className="mt-2"
              />
            </div>

            {/* Star Rating */}
            <div className="space-y-2">
              <Label>Minimum Rating</Label>
              <Select value={minRating} onValueChange={setMinRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Any" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4.5">4.5★ and above</SelectItem>
                  <SelectItem value="4.0">4.0★ and above</SelectItem>
                  <SelectItem value="3.5">3.5★ and above</SelectItem>
                  <SelectItem value="3.0">3.0★ and above</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Sort By */}
            <div className="space-y-2">
              <Label>Sort By</Label>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="verified">Edustay Verified</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Amenities */}
          <div className="mt-6">
            <Label className="mb-3 block">Amenities</Label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="wifi"
                  checked={amenities.wifi}
                  onCheckedChange={(checked) => setAmenities({ ...amenities, wifi: checked as boolean })}
                />
                <Label htmlFor="wifi" className="cursor-pointer">Wi-Fi</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="meals"
                  checked={amenities.meals}
                  onCheckedChange={(checked) => setAmenities({ ...amenities, meals: checked as boolean })}
                />
                <Label htmlFor="meals" className="cursor-pointer">Meals</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="attached"
                  checked={amenities.attached}
                  onCheckedChange={(checked) => setAmenities({ ...amenities, attached: checked as boolean })}
                />
                <Label htmlFor="attached" className="cursor-pointer">Attached Bath</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="laundry"
                  checked={amenities.laundry}
                  onCheckedChange={(checked) => setAmenities({ ...amenities, laundry: checked as boolean })}
                />
                <Label htmlFor="laundry" className="cursor-pointer">Laundry</Label>
              </div>
            </div>
          </div>

          <Button onClick={handleFind} className="w-full mt-6 bg-primary hover:bg-primary/90" size="lg">
            <Search className="h-5 w-5 mr-2" />
            Find
          </Button>
        </div>

        {/* Results */}
        {showResults && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">
                {sortedProperties.length} {sortedProperties.length === 1 ? 'Property' : 'Properties'} Found
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProperties.map((property) => (
                <PropertyCard key={property.id} {...property} />
              ))}
            </div>

            {sortedProperties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No properties match your filters. Try adjusting your search criteria.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindAccommodation;

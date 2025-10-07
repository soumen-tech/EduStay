import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, Shield, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import heroBg from "@/assets/hero-bg.jpg";
import room1 from "@/assets/room1.jpg";
import room2 from "@/assets/room2.jpg";
import room3 from "@/assets/room3.jpg";

const Index = () => {
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");

  const featuredProperties = [
    {
      id: 1,
      image: room1,
      name: "Ghosh Residency PG",
      price: 4500,
      distance: "800m",
      type: "PG",
      facilities: ["Wi-Fi", "Meals"],
      owner: "Mr. S. Ghosh"
    },
    {
      id: 2,
      image: room2,
      name: "Mitra Boys Hostel",
      price: 4000,
      distance: "1km",
      type: "Hostel",
      facilities: ["Wi-Fi"],
      owner: "Mrs. Mitra"
    },
    {
      id: 3,
      image: room3,
      name: "Saha Mess & Rooms",
      price: 5000,
      distance: "600m",
      type: "Mess",
      facilities: ["Meals", "Attached"],
      owner: "Mr. Saha"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 gradient-hero opacity-90"></div>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroBg})` }}
        ></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Find Your Perfect Stay Near Academy of Technology
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90">
              EduStay connects students with verified room owners near their colleges
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-xl p-4 md:p-6 shadow-hover">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="room">Room</SelectItem>
                    <SelectItem value="pg">PG</SelectItem>
                    <SelectItem value="mess">Mess</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={budget} onValueChange={setBudget}>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Price Range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3000-4000">₹3000-4000</SelectItem>
                    <SelectItem value="4000-5000">₹4000-5000</SelectItem>
                    <SelectItem value="5000+">₹5000+</SelectItem>
                  </SelectContent>
                </Select>

                <Input placeholder="Max Distance" className="bg-white" />

                <Link to="/properties" className="w-full">
                  <Button className="w-full bg-accent hover:bg-accent/90 h-10">
                    <Search className="h-4 w-4 mr-2" />
                    Search Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified Listings</h3>
              <p className="text-muted-foreground">
                All properties are verified for authenticity and safety
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Clock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Search</h3>
              <p className="text-muted-foreground">
                Find your perfect stay in minutes with our smart filters
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Star className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trusted Owners</h3>
              <p className="text-muted-foreground">
                Connect directly with verified property owners
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the best student accommodations near Academy of Technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          <div className="text-center">
            <Link to="/properties">
              <Button size="lg" variant="outline">
                View All Properties
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Students Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card rounded-lg p-6 shadow-card">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="mb-4 text-muted-foreground">
                "EduStay helped me find an affordable PG near AOT quickly."
              </p>
              <p className="font-semibold">— Riya, 1st Year</p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-card">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="mb-4 text-muted-foreground">
                "Verified listings gave me confidence in booking."
              </p>
              <p className="font-semibold">— Ankit, 2nd Year</p>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-card">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                ))}
              </div>
              <p className="mb-4 text-muted-foreground">
                "The interface is clean and easy to navigate."
              </p>
              <p className="font-semibold">— Priya, Final Year</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Have a property near Academy of Technology?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            List your property on EduStay and connect with students
          </p>
          <Link to="/owner/list-property">
            <Button size="lg" variant="secondary">
              List Your Property
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import room1 from "@/assets/room1.jpg";
import room2 from "@/assets/room2.jpg";
import room3 from "@/assets/room3.jpg";
import room4 from "@/assets/room4.jpg";

const Properties = () => {
  const properties = [
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
    },
    {
      id: 4,
      image: room4,
      name: "AOT Comfort Stay",
      price: 4800,
      distance: "900m",
      type: "PG",
      facilities: ["Wi-Fi", "Meals"],
      owner: "Mr. Roy"
    },
    {
      id: 5,
      image: room1,
      name: "Student Paradise PG",
      price: 4200,
      distance: "750m",
      type: "PG",
      facilities: ["Wi-Fi", "Attached"],
      owner: "Mrs. Das"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Header */}
        <section className="gradient-hero text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Available Properties</h1>
            <p className="text-lg opacity-90">
              Browse verified rooms, PGs, and mess facilities near Academy of Technology
            </p>
          </div>
        </section>

        {/* Filters */}
        <section className="bg-secondary py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search properties..." className="pl-9 bg-white" />
              </div>
              
              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Property Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="room">Room</SelectItem>
                  <SelectItem value="pg">PG</SelectItem>
                  <SelectItem value="mess">Mess</SelectItem>
                  <SelectItem value="hostel">Hostel</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Budget Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Budgets</SelectItem>
                  <SelectItem value="3000-4000">₹3000-4000</SelectItem>
                  <SelectItem value="4000-5000">₹4000-5000</SelectItem>
                  <SelectItem value="5000+">₹5000+</SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Distance" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Distance</SelectItem>
                  <SelectItem value="500">Within 500m</SelectItem>
                  <SelectItem value="1000">Within 1km</SelectItem>
                  <SelectItem value="2000">Within 2km</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>

        {/* Properties Grid */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing <span className="font-semibold text-foreground">{properties.length}</span> properties
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
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

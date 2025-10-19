import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import PropertyCard from "@/components/PropertyCard";
import room1 from "@/assets/room1.jpg";
import room2 from "@/assets/room2.jpg";
import room3 from "@/assets/room3.jpg";

const SavedListings = () => {
  // Demo saved listings
  const savedProperties = [
    {
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
    },
    {
      id: 6,
      image: room2,
      name: "Roy Co-Living Space",
      price: 5200,
      distance: "700m",
      type: "PG",
      facilities: ["Wi-Fi", "Meals", "Gym"],
      owner: "Mr. P. Roy",
      rating: 4.8,
      gender: "Both",
      savedCount: 73
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-secondary">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <svg className="h-4 w-4 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
            Go back to Previous Page
          </Button>
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Saved Listings</h1>
          <p className="text-muted-foreground">Properties you've bookmarked for later</p>
          <p className="text-sm text-yellow-600 mt-2">⚠️ Demo Content — Fictional</p>
        </div>

        {savedProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedProperties.map(property => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <Building2 className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No Saved Listings</h3>
            <p className="text-muted-foreground mb-6">
              You haven't saved any properties yet. Start exploring!
            </p>
            <Link to="/find-accommodation">
              <Button>Find Accommodation</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default SavedListings;

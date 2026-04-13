import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ArrowLeft } from "lucide-react";
import { APIProvider, Map, AdvancedMarker, Pin } from "@vis.gl/react-google-maps";

const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "YOUR_API_KEY";

const MapView = () => {
  const locations = [
    { id: 1, name: "Ghosh Residency PG", distance: "800m", lat: 22.8, lng: 88.4, rating: 4.5, gender: "Boys", price: 4500 },
    { id: 2, name: "Mitra Boys Hostel", distance: "1km", lat: 22.805, lng: 88.405, rating: 4.2, gender: "Boys", price: 4000 },
    { id: 3, name: "Saha Mess & Rooms", distance: "600m", lat: 22.795, lng: 88.395, rating: 4.7, gender: "Both", price: 5000 },
    { id: 4, name: "AOT Comfort Stay", distance: "900m", lat: 22.802, lng: 88.402, rating: 4.3, gender: "Boys", price: 4800 },
    { id: 5, name: "Dutta Girls PG", distance: "1.2km", lat: 22.798, lng: 88.408, rating: 4.6, gender: "Girls", price: 4200 },
    { id: 6, name: "Roy Co-Living", distance: "700m", lat: 22.803, lng: 88.397, rating: 4.8, gender: "Both", price: 5200 },
  ];

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

        {/* Header */}
        <section className="gradient-hero text-white py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Map View - Adisaptagram</h1>
            <p className="text-lg opacity-90">
              Properties near Academy of Technology, Adisaptagram, Hooghly
            </p>
            <Badge className="mt-3 bg-yellow-500 text-black">
              Demo Map - Fictional Locations
            </Badge>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Google Map */}
              <div className="lg:col-span-2">
                <Card className="shadow-hover">
                  <CardContent className="p-0 h-[500px]">
                    <APIProvider apiKey={API_KEY} solutionChannel="gmp_mcp_codeassist_v0.1_github">
                      <Map
                        defaultZoom={15}
                        defaultCenter={{ lat: 22.800, lng: 88.402 }}
                        mapId="DEMO_MAP_ID"
                        gestureHandling="greedy"
                        disableDefaultUI={false}
                        className="w-full h-full rounded-lg"
                      >
                        {locations.map((location) => (
                          <AdvancedMarker
                            key={location.id}
                            position={{ lat: location.lat, lng: location.lng }}
                            title={location.name}
                          >
                            <Pin background="#16a34a" borderColor="#14532d" glyphColor="#14532d" />
                          </AdvancedMarker>
                        ))}
                      </Map>
                    </APIProvider>
                  </CardContent>
                </Card>
              </div>

              {/* Locations List */}
              <div>
                <Card className="shadow-hover">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-4">Nearby Properties</h3>
                    <div className="space-y-4">
                      {locations.map((location) => (
                        <div
                          key={location.id}
                          className="p-4 bg-secondary rounded-lg hover:bg-secondary/80 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium">{location.name}</h4>
                                <div className="flex items-center gap-1">
                                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{location.rating}</span>
                                </div>
                              </div>
                              <p className="text-sm text-muted-foreground mb-2">
                                {location.distance} from AOT • {location.gender}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-sm font-semibold text-primary">₹{location.price}/mo</span>
                                <Link to={`/property/${location.id}`}>
                                  <Button size="sm" variant="outline" className="h-7 text-xs">
                                    View Details
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-hover mt-6">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-2">Academy of Technology</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Adi Saptagram, Hooghly, West Bengal
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Reference Point</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default MapView;

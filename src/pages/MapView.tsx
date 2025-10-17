import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Star, ArrowLeft } from "lucide-react";

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
              {/* Map Placeholder */}
              <div className="lg:col-span-2">
                <Card className="shadow-hover">
                  <CardContent className="p-0">
                    <div className="h-[500px] bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center relative overflow-hidden">
                      {/* Decorative map elements */}
                      <div className="absolute inset-0 opacity-20">
                        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
                      </div>
                      
                      <div className="text-center z-10">
                        <MapPin className="h-16 w-16 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">Map View</h3>
                        <p className="text-muted-foreground">
                          Interactive map showing properties near Academy of Technology
                        </p>
                        <p className="text-sm text-muted-foreground mt-2">
                          (Static demo - Actual implementation would use Google Maps or Mapbox)
                        </p>
                      </div>

                      {/* Demo markers */}
                      {locations.map((location, index) => (
                        <div
                          key={location.id}
                          className="absolute"
                          style={{
                            top: `${25 + index * 15}%`,
                            left: `${30 + index * 12}%`,
                          }}
                        >
                          <div className="relative group cursor-pointer">
                            <MapPin className="h-8 w-8 text-accent drop-shadow-lg animate-bounce" style={{ animationDelay: `${index * 0.2}s` }} />
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block">
                              <div className="bg-background border shadow-lg rounded-lg p-2 whitespace-nowrap">
                                <p className="text-sm font-medium">{location.name}</p>
                                <p className="text-xs text-muted-foreground">{location.distance} from AOT</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
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

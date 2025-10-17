import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Phone, Mail, Wifi, Utensils, Shirt, BookOpen, Wind, Check, Shield, Camera, AlertCircle, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import room1 from "@/assets/room1.jpg";
import room2 from "@/assets/room2.jpg";
import room3 from "@/assets/room3.jpg";
import room4 from "@/assets/room4.jpg";

const PropertyDetails = () => {
  const { id } = useParams();
  const [selectedDuration, setSelectedDuration] = useState("1year");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Demo property data
  const property = {
    id: 1,
    name: "Ghosh Residency PG",
    tagline: "Premium PG with Home-like Comfort",
    rating: 4.5,
    reviewCount: 28,
    verified: true,
    verifiedPhotos: true,
    maxCapacity: 12,
    gender: "Boys",
    type: "PG",
    monthlyRent: 4500,
    securityDeposit: 5000,
    furnishing: "Fully Furnished",
    bedType: "Single",
    attachedBathroom: true,
    wifi: true,
    meals: true,
    laundry: true,
    studyTable: true,
    balcony: true,
    images: [room1, room2, room3, room4],
    specialities: "Spacious rooms with balcony offering scenic garden views. Quiet environment perfect for focused studies. Well-maintained property with regular housekeeping.",
    complimentary: ["Bedding & Pillows", "Study Lamp", "Wardrobe", "Water Purifier Access"],
    owner: {
      name: "Mr. S. Ghosh",
      phone: "+91 98765 43210",
      email: "s.ghosh@example.com",
      address: "Near Academy of Technology, Adi Saptagram"
    },
    distance: "800m from AOT",
    rules: [
      "No smoking or alcohol inside premises",
      "Guests allowed only in common areas (9 AM - 8 PM)",
      "Maintain cleanliness in shared spaces",
      "Respect quiet hours (10 PM - 7 AM)",
      "Prior notice required for extended leave"
    ],
    durations: {
      "1year": { price: 4500, deposit: 5000, label: "1 Year" },
      "2years": { price: 4200, deposit: 4000, label: "2 Years" },
      "4years": { price: 4000, deposit: 3500, label: "4 Years" }
    },
    reviews: [
      { name: "Rahul M.", college: "AOT, 2nd Year", rating: 5, comment: "Excellent PG with great food and clean rooms. Owner is very cooperative.", date: "2 weeks ago", verified: true },
      { name: "Ankit S.", college: "AOT, 3rd Year", rating: 4, comment: "Good place for students. Wifi speed is decent and study environment is quiet.", date: "1 month ago", verified: true },
      { name: "Priyam D.", college: "AOT, Final Year", rating: 5, comment: "Stayed here for 2 years. Best PG near college with homely atmosphere.", date: "2 months ago", verified: true }
    ]
  };

  const currentPlan = property.durations[selectedDuration as keyof typeof property.durations];

  const handleBooking = () => {
    toast.success("Demo: Booking request submitted! (Non-functional demo)");
  };

  const handleMessage = () => {
    toast.info("Demo: Message owner feature (Non-functional demo)");
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-secondary">
        <div className="container mx-auto px-4 py-8">
          {/* Demo Badge */}
          <div className="mb-4">
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
              ⚠️ Demo Content - Fictional Data
            </Badge>
          </div>

          {/* Header Section */}
          <div className="bg-background rounded-lg shadow-lg p-6 mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2">{property.name}</h1>
                <p className="text-muted-foreground mb-3">{property.tagline}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {property.verified && (
                    <Badge className="bg-green-600 hover:bg-green-700">
                      <Shield className="h-3 w-3 mr-1" />
                      EduStay Verified
                    </Badge>
                  )}
                  {property.verifiedPhotos && (
                    <Badge className="bg-blue-600 hover:bg-blue-700">
                      <Camera className="h-3 w-3 mr-1" />
                      Verified Photos
                    </Badge>
                  )}
                  <Badge variant="secondary">Max Capacity: {property.maxCapacity}</Badge>
                  <Badge variant="secondary">Gender: {property.gender}</Badge>
                </div>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{property.rating}</span>
                    <span className="text-muted-foreground">({property.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{property.distance}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                    <span>Saved by 87 users</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-accent hover:bg-accent/90">
                      Rent This Room
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Book {property.name}</DialogTitle>
                      <DialogDescription>
                        Complete your booking details (Demo Mode)
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Selected Duration</label>
                        <p className="text-lg font-semibold text-primary">{currentPlan.label}</p>
                        <p className="text-sm text-muted-foreground">₹{currentPlan.price}/month • Deposit: ₹{currentPlan.deposit}</p>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-green-700 text-sm">
                          <Shield className="h-4 w-4" />
                          <span>Payment held in escrow • Released on check-in</span>
                        </div>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                        <p className="text-sm text-amber-800">
                          <strong>Cancellation Policy:</strong> Free cancellation up to 7 days before move-in. 
                          See full terms for landlord cancellation rights.
                        </p>
                      </div>
                      <Button onClick={handleBooking} className="w-full">
                        Confirm Booking (Demo)
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="outline" size="lg" onClick={handleMessage}>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Message Owner
                </Button>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="relative">
                <img 
                  src={property.images[currentImageIndex]} 
                  alt={`${property.name} - Photo ${currentImageIndex + 1}`}
                  className="w-full h-[400px] object-cover rounded-t-lg"
                />
                <div className="absolute inset-0 flex items-center justify-between p-4">
                  <Button variant="outline" size="icon" onClick={prevImage} className="bg-white/80 hover:bg-white">
                    ←
                  </Button>
                  <Button variant="outline" size="icon" onClick={nextImage} className="bg-white/80 hover:bg-white">
                    →
                  </Button>
                </div>
                <div className="absolute bottom-4 right-4">
                  <Badge className="bg-black/60 text-white">
                    {currentImageIndex + 1} / {property.images.length}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2 p-4">
                {property.images.map((img, idx) => (
                  <img 
                    key={idx}
                    src={img} 
                    alt={`Thumbnail ${idx + 1}`}
                    className={`h-20 object-cover rounded cursor-pointer border-2 ${
                      idx === currentImageIndex ? 'border-primary' : 'border-transparent'
                    }`}
                    onClick={() => setCurrentImageIndex(idx)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Room Details */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Room Details & Amenities</h2>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Room Type</p>
                        <p className="font-medium">{property.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Furnishing</p>
                        <p className="font-medium">{property.furnishing}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="text-sm text-muted-foreground">Bed Type</p>
                        <p className="font-medium">{property.bedType}</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                    {property.wifi && (
                      <div className="flex items-center gap-2">
                        <Wifi className="h-5 w-5 text-primary" />
                        <span>High-Speed WiFi</span>
                      </div>
                    )}
                    {property.meals && (
                      <div className="flex items-center gap-2">
                        <Utensils className="h-5 w-5 text-primary" />
                        <span>Meals Included</span>
                      </div>
                    )}
                    {property.laundry && (
                      <div className="flex items-center gap-2">
                        <Shirt className="h-5 w-5 text-primary" />
                        <span>Laundry Service</span>
                      </div>
                    )}
                    {property.studyTable && (
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span>Study Table</span>
                      </div>
                    )}
                    {property.balcony && (
                      <div className="flex items-center gap-2">
                        <Wind className="h-5 w-5 text-primary" />
                        <span>Balcony</span>
                      </div>
                    )}
                    {property.attachedBathroom && (
                      <div className="flex items-center gap-2">
                        <Check className="h-5 w-5 text-primary" />
                        <span>Attached Bath</span>
                      </div>
                    )}
                  </div>

                  <div className="bg-secondary p-4 rounded-lg mb-4">
                    <h3 className="font-semibold mb-2">Specialities</h3>
                    <p className="text-muted-foreground">{property.specialities}</p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2">Complimentary Items</h3>
                    <div className="flex flex-wrap gap-2">
                      {property.complimentary.map((item, idx) => (
                        <Badge key={idx} variant="secondary">{item}</Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Rent Duration Options */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Rent Duration & Pricing</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Object.entries(property.durations).map(([key, plan]) => (
                      <div 
                        key={key}
                        onClick={() => setSelectedDuration(key)}
                        className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedDuration === key ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <div className="text-center">
                          <p className="font-semibold text-lg mb-2">{plan.label}</p>
                          <p className="text-3xl font-bold text-primary mb-1">₹{plan.price}</p>
                          <p className="text-sm text-muted-foreground mb-2">per month</p>
                          <p className="text-sm">Deposit: ₹{plan.deposit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Effective monthly cost decreases with longer duration commitments
                  </p>
                </CardContent>
              </Card>

              {/* Rules & Policies */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">House Rules</h2>
                  <ul className="space-y-2">
                    {property.rules.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <AlertCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4 italic">
                    For more information, contact the owner.
                  </p>
                </CardContent>
              </Card>

              {/* Reviews Section */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-2xl font-bold mb-4">Ratings & Reviews</h2>
                  
                  <div className="flex items-center gap-8 mb-6 p-4 bg-secondary rounded-lg">
                    <div className="text-center">
                      <p className="text-4xl font-bold text-primary">{property.rating}</p>
                      <div className="flex gap-1 my-2">
                        {[1,2,3,4,5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">{property.reviewCount} reviews</p>
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      {[5,4,3,2,1].map((rating) => (
                        <div key={rating} className="flex items-center gap-2">
                          <span className="text-sm w-8">{rating}★</span>
                          <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-400" 
                              style={{ width: `${rating === 5 ? '60%' : rating === 4 ? '30%' : '10%'}` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    {property.reviews.map((review, idx) => (
                      <div key={idx} className="border-b pb-4 last:border-0">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{review.name}</p>
                              {review.verified && (
                                <Badge variant="secondary" className="text-xs">
                                  <Shield className="h-3 w-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{review.college}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{review.date}</p>
                        </div>
                        <div className="flex gap-1 mb-2">
                          {[1,2,3,4,5].map((star) => (
                            <Star 
                              key={star} 
                              className={`h-4 w-4 ${star <= review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                        <p className="text-muted-foreground">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-4 text-center">
                    Only verified student accounts may post reviews
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Owner Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4">Property Owner</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-lg">{property.owner.name}</p>
                      <p className="text-sm text-muted-foreground">{property.owner.address}</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full justify-start" onClick={handleMessage}>
                        <Phone className="h-4 w-4 mr-2" />
                        {property.owner.phone}
                      </Button>
                      <Button variant="outline" className="w-full justify-start" onClick={handleMessage}>
                        <Mail className="h-4 w-4 mr-2" />
                        Contact via Email
                      </Button>
                    </div>

                    <Button variant="destructive" className="w-full mt-4" onClick={() => toast.info("Demo: Report feature")}>
                      <AlertCircle className="h-4 w-4 mr-2" />
                      Report Listing
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Safety & Helpline */}
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <h3 className="font-bold text-lg mb-4 text-green-900">Safety & Helpline</h3>
                  
                  <Tabs defaultValue="helpline" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="helpline">Helpline</TabsTrigger>
                      <TabsTrigger value="emergency">Emergency</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="helpline" className="space-y-2 mt-4">
                      <div className="bg-white p-3 rounded border">
                        <p className="font-medium text-sm">Student Affairs Office</p>
                        <Button variant="link" className="p-0 h-auto text-primary">
                          <Phone className="h-3 w-3 mr-1" />
                          +91 12345 67890
                        </Button>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <p className="font-medium text-sm">Local Police (Non-Emergency)</p>
                        <Button variant="link" className="p-0 h-auto text-primary">
                          <Phone className="h-3 w-3 mr-1" />
                          +91 98765 43211
                        </Button>
                      </div>
                      <div className="bg-white p-3 rounded border">
                        <p className="font-medium text-sm">Platform Support</p>
                        <Button variant="link" className="p-0 h-auto text-primary">
                          support@edustay.com
                        </Button>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="emergency" className="space-y-2 mt-4">
                      <Button variant="destructive" className="w-full justify-start" onClick={() => toast.error("Demo: Emergency call (100)")}>
                        <Phone className="h-4 w-4 mr-2" />
                        Emergency Police - 100
                      </Button>
                      <Button variant="destructive" className="w-full justify-start" onClick={() => toast.error("Demo: Emergency call (102)")}>
                        <Phone className="h-4 w-4 mr-2" />
                        Ambulance - 102
                      </Button>
                      <Button variant="destructive" className="w-full justify-start" onClick={() => toast.error("Demo: Emergency call (101)")}>
                        <Phone className="h-4 w-4 mr-2" />
                        Fire Brigade - 101
                      </Button>
                      <Button variant="outline" className="w-full mt-3" onClick={() => toast.success("Demo: Location shared")}>
                        <MapPin className="h-4 w-4 mr-2" />
                        Share Location
                      </Button>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* Map Preview */}
              <Card>
                <CardContent className="p-0">
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-primary mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Map Preview</p>
                      <p className="text-xs text-muted-foreground">{property.distance}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetails;

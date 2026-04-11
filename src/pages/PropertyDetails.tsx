import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Phone, Mail, Wifi, Utensils, Shirt, BookOpen, Wind, Check, Shield, Camera, AlertCircle, MessageSquare, Leaf, ArrowLeft, Calendar } from "lucide-react";
import { toast } from "sonner";
import room1 from "@/assets/room1.jpg";
import room2 from "@/assets/room2.jpg";
import room3 from "@/assets/room3.jpg";
import room4 from "@/assets/room4.jpg";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDuration, setSelectedDuration] = useState("1year");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleBackClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

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
    specialities: "Designed for the modern professional seeking peace amidst urban chaos. Greenview Residency offers more than just a room; it provides a biophilic living experience. Every corner is curated with natural materials, high-performance acoustics, and abundant greenery to ensure your home remains a true restorative sanctuary.",
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
      { name: "Rahul M.", college: "AOT, 2nd Year", rating: 5, comment: "The focus on light and air quality is noticeable. I've never slept better in the city. The community events are actually meaningful.", date: "2 weeks ago", verified: true },
      { name: "Ankit S.", college: "AOT, 3rd Year", rating: 4, comment: "The glassmorphism design in the common areas is stunning. It feels like living in a premium boutique hotel but with the warmth of home.", date: "1 month ago", verified: true },
      { name: "Priyam D.", college: "AOT, Final Year", rating: 5, comment: "Stayed here for 2 years. Best PG near college with homely atmosphere and excellent food.", date: "2 months ago", verified: true }
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

  const amenities = [
    { icon: Wifi, label: "High-Speed WiFi", active: property.wifi },
    { icon: Utensils, label: "Meals Included", active: property.meals },
    { icon: Shirt, label: "Laundry Service", active: property.laundry },
    { icon: BookOpen, label: "Study Table", active: property.studyTable },
    { icon: Wind, label: "Balcony", active: property.balcony },
    { icon: Check, label: "Attached Bath", active: property.attachedBathroom },
  ];

  return (
    <div className="min-h-screen flex flex-col surface">
      <Navbar />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm font-body text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/properties" className="hover:text-primary transition-colors">Neighborhoods</Link>
            <span>/</span>
            <span className="text-foreground font-medium">{property.name}</span>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-12">
          {/* Demo Badge */}
          <div className="mb-4">
            <span className="chip bg-amber-50 text-amber-700 text-xs px-3 py-1.5 rounded-full">
              ⚠️ Demo Content — Fictional Data
            </span>
          </div>

          {/* ── Photo Gallery ── */}
          <div className="glass-card rounded-2xl overflow-hidden mb-8">
            <div className="relative">
              <img 
                src={property.images[currentImageIndex]} 
                alt={`${property.name} - Photo ${currentImageIndex + 1}`}
                className="w-full h-[400px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-between p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevImage}
                  className="rounded-full bg-white/60 backdrop-blur-sm hover:bg-white/80 h-10 w-10"
                >
                  ←
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextImage}
                  className="rounded-full bg-white/60 backdrop-blur-sm hover:bg-white/80 h-10 w-10"
                >
                  →
                </Button>
              </div>
              <div className="absolute bottom-4 right-4">
                <span className="chip bg-black/50 text-white backdrop-blur-sm rounded-full px-3 py-1 text-xs">
                  {currentImageIndex + 1} / {property.images.length}
                </span>
              </div>
              {/* Verified badges */}
              <div className="absolute top-4 left-4 flex gap-2">
                {property.verified && (
                  <span className="chip bg-primary text-white rounded-full px-3 py-1 text-xs flex items-center gap-1">
                    <Shield className="h-3 w-3" /> Verified
                  </span>
                )}
                {property.verifiedPhotos && (
                  <span className="chip bg-white/80 backdrop-blur-sm text-foreground rounded-full px-3 py-1 text-xs flex items-center gap-1">
                    <Camera className="h-3 w-3" /> Verified Photos
                  </span>
                )}
              </div>
            </div>
            {/* Thumbnails */}
            <div className="flex gap-2 p-4">
              {property.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`flex-1 h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                    idx === currentImageIndex 
                      ? 'ring-2 ring-primary ring-offset-2 scale-[0.97]' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* ── Main Content Grid ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Header */}
              <div className="glass-card rounded-2xl p-7">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl font-display font-bold text-foreground mb-2">{property.name}</h1>
                    <p className="text-muted-foreground font-body mb-4">{property.tagline}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="chip rounded-full">{property.type}</span>
                      <span className="chip rounded-full">Max {property.maxCapacity}</span>
                      <span className="chip rounded-full">{property.gender}</span>
                    </div>
                    <div className="flex items-center gap-5 flex-wrap text-sm font-body">
                      <div className="flex items-center gap-1.5">
                        <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        <span className="font-semibold">{property.rating}</span>
                        <span className="text-muted-foreground">({property.reviewCount} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{property.distance}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="lg" className="rounded-full bg-primary text-white font-body hover-glow transition-all duration-300">
                          Reserve Sanctuary
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-md rounded-2xl">
                        <DialogHeader>
                          <DialogTitle className="font-display">Book {property.name}</DialogTitle>
                          <DialogDescription className="font-body">
                            Complete your booking details (Demo Mode)
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="surface-low rounded-xl p-4">
                            <p className="text-sm text-muted-foreground font-body">Selected Duration</p>
                            <p className="text-lg font-display font-bold text-primary">{currentPlan.label}</p>
                            <p className="text-sm text-muted-foreground font-body">₹{currentPlan.price}/month • Deposit: ₹{currentPlan.deposit}</p>
                          </div>
                          <div className="bg-primary/5 rounded-xl p-4">
                            <div className="flex items-center gap-2 text-primary text-sm font-body">
                              <Shield className="h-4 w-4" />
                              <span>Payment held in escrow • Released on check-in</span>
                            </div>
                          </div>
                          <p className="text-xs text-muted-foreground font-body text-center">
                            You won't be charged yet. We'll contact you for a virtual tour.
                          </p>
                          <Button onClick={handleBooking} className="w-full rounded-full bg-primary hover-glow font-body">
                            Confirm Booking (Demo)
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button variant="ghost" size="lg" onClick={handleMessage} className="rounded-full hover:bg-accent font-body">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Message
                    </Button>
                  </div>
                </div>
              </div>

              {/* About this Sanctuary */}
              <div className="glass-card rounded-2xl p-7">
                <h2 className="text-2xl font-display font-bold mb-4">About this Sanctuary</h2>
                <p className="text-muted-foreground font-body leading-relaxed mb-6">
                  {property.specialities}
                </p>
                <div className="flex flex-wrap gap-2">
                  {property.complimentary.map((item, idx) => (
                    <span key={idx} className="chip rounded-full text-xs">{item}</span>
                  ))}
                </div>
              </div>

              {/* World-Class Amenities */}
              <div className="glass-card rounded-2xl p-7">
                <h2 className="text-2xl font-display font-bold mb-6">World-Class Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {amenities.filter(a => a.active).map((amenity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-4 surface-low rounded-xl">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <amenity.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-body text-sm font-medium text-foreground">{amenity.label}</span>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  <div className="flex items-center gap-3 p-4 surface-low rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-body text-sm font-medium text-foreground">{property.furnishing}</span>
                      <p className="text-xs text-muted-foreground">Room Type</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 surface-low rounded-xl">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-body text-sm font-medium text-foreground">{property.bedType} Bed</span>
                      <p className="text-xs text-muted-foreground">Bed Type</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rent Duration & Pricing */}
              <div className="glass-card rounded-2xl p-7">
                <h2 className="text-2xl font-display font-bold mb-6">Duration & Pricing</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {Object.entries(property.durations).map(([key, plan]) => (
                    <button
                      key={key}
                      onClick={() => {
                        setSelectedDuration(key);
                        const bookingData = {
                          propertyId: property.id,
                          propertyName: property.name,
                          propertyImage: property.images[0],
                          owner: property.owner.name,
                          rating: property.rating,
                          duration: plan.label,
                          monthlyPrice: plan.price,
                          securityDeposit: plan.deposit
                        };
                        navigate('/payment', { state: { bookingData } });
                      }}
                      className={`rounded-2xl p-5 text-center transition-all duration-300 ${
                        selectedDuration === key
                          ? 'bg-primary text-white shadow-lg scale-[1.02]'
                          : 'surface-low hover:bg-accent'
                      }`}
                    >
                      <p className="font-display font-semibold text-lg mb-2">{plan.label}</p>
                      <p className={`text-3xl font-display font-bold mb-1 ${
                        selectedDuration === key ? 'text-white' : 'text-primary'
                      }`}>
                        ₹{plan.price}
                      </p>
                      <p className={`text-sm mb-2 ${selectedDuration === key ? 'text-white/70' : 'text-muted-foreground'}`}>
                        per month
                      </p>
                      <p className={`text-xs ${selectedDuration === key ? 'text-white/60' : 'text-muted-foreground'}`}>
                        Deposit: ₹{plan.deposit}
                      </p>
                    </button>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground mt-4 text-center font-body">
                  Click any duration to proceed to payment • Monthly cost decreases with longer commitments
                </p>
              </div>

              {/* House Rules */}
              <div className="glass-card rounded-2xl p-7">
                <h2 className="text-2xl font-display font-bold mb-5">House Rules</h2>
                <div className="space-y-3">
                  {property.rules.map((rule, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3 surface-low rounded-xl">
                      <AlertCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="font-body text-sm text-foreground">{rule}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Resident Experiences */}
              <div className="glass-card rounded-2xl p-7">
                <h2 className="text-2xl font-display font-bold mb-6">Resident Experiences</h2>
                
                <div className="flex items-center gap-8 mb-8 surface-low rounded-2xl p-5">
                  <div className="text-center">
                    <p className="text-4xl font-display font-bold text-primary">{property.rating}</p>
                    <div className="flex gap-0.5 my-2 justify-center">
                      {[1,2,3,4,5].map((star) => (
                        <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground font-body">{property.reviewCount} reviews</p>
                  </div>
                  
                  <div className="flex-1 space-y-1.5">
                    {[5,4,3,2,1].map((rating) => (
                      <div key={rating} className="flex items-center gap-2">
                        <span className="text-xs w-6 text-muted-foreground">{rating}★</span>
                        <div className="flex-1 h-1.5 bg-white rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-amber-400 rounded-full" 
                            style={{ width: `${rating === 5 ? '60%' : rating === 4 ? '30%' : '10%'}` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  {property.reviews.map((review, idx) => (
                    <div key={idx} className="surface-low rounded-2xl p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-display font-semibold text-sm">{review.name}</p>
                            {review.verified && (
                              <span className="chip bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                                <Shield className="h-3 w-3" /> Verified
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground font-body">{review.college}</p>
                        </div>
                        <p className="text-xs text-muted-foreground font-body">{review.date}</p>
                      </div>
                      <div className="flex gap-0.5 mb-2">
                        {[1,2,3,4,5].map((star) => (
                          <Star 
                            key={star} 
                            className={`h-3.5 w-3.5 ${star <= review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-sm text-foreground font-body leading-relaxed italic">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}
                </div>
                
                <p className="text-xs text-muted-foreground mt-5 text-center font-body">
                  Only verified student accounts may post reviews
                </p>
              </div>
            </div>

            {/* ── Sidebar ── */}
            <div className="space-y-6">
              {/* Owner Info */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-bold text-lg mb-4">Property Owner</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-display font-semibold text-lg">{property.owner.name}</p>
                    <p className="text-sm text-muted-foreground font-body">{property.owner.address}</p>
                  </div>
                  <div className="space-y-2">
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-xl hover:bg-accent font-body text-sm"
                      onClick={handleMessage}
                    >
                      <Phone className="h-4 w-4 mr-2 text-primary" />
                      {property.owner.phone}
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start rounded-xl hover:bg-accent font-body text-sm"
                      onClick={handleMessage}
                    >
                      <Mail className="h-4 w-4 mr-2 text-primary" />
                      Contact via Email
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    className="w-full rounded-xl font-body text-sm text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => toast.info("Demo: Report feature")}
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Report Listing
                  </Button>
                </div>
              </div>

              {/* Safety & Helpline */}
              <div className="glass-card rounded-2xl p-6 bg-primary/5">
                <h3 className="font-display font-bold text-lg mb-4 text-primary">Safety & Helpline</h3>
                
                <Tabs defaultValue="helpline" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 rounded-xl bg-white/60">
                    <TabsTrigger value="helpline" className="rounded-xl font-body text-xs">Helpline</TabsTrigger>
                    <TabsTrigger value="emergency" className="rounded-xl font-body text-xs">Emergency</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="helpline" className="space-y-2 mt-4">
                    {[
                      { label: "Student Affairs Office", number: "+91 12345 67890" },
                      { label: "Local Police (Non-Emergency)", number: "+91 98765 43211" },
                      { label: "Platform Support", number: "support@edustay.com" },
                    ].map((item, idx) => (
                      <div key={idx} className="bg-white rounded-xl p-3">
                        <p className="font-body text-xs font-medium text-foreground">{item.label}</p>
                        <p className="text-xs text-primary font-body">{item.number}</p>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="emergency" className="space-y-2 mt-4">
                    {[
                      { label: "Emergency Police", number: "100" },
                      { label: "Ambulance", number: "102" },
                      { label: "Fire Brigade", number: "101" },
                    ].map((item, idx) => (
                      <Button
                        key={idx}
                        variant="ghost"
                        className="w-full justify-start rounded-xl bg-red-50 text-red-600 hover:bg-red-100 font-body text-sm"
                        onClick={() => toast.error(`Demo: Emergency call (${item.number})`)}
                      >
                        <Phone className="h-4 w-4 mr-2" />
                        {item.label} — {item.number}
                      </Button>
                    ))}
                    <Button
                      variant="ghost"
                      className="w-full mt-2 rounded-xl font-body text-sm hover:bg-accent"
                      onClick={() => toast.success("Demo: Location shared")}
                    >
                      <MapPin className="h-4 w-4 mr-2" />
                      Share Location
                    </Button>
                  </TabsContent>
                </Tabs>
              </div>

              {/* Map Preview */}
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-primary/5 to-accent/20 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-10 w-10 text-primary mx-auto mb-2" />
                    <p className="text-sm font-display font-semibold text-foreground">Map Preview</p>
                    <p className="text-xs text-muted-foreground font-body">{property.distance}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PropertyDetails;

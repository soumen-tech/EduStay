import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Wifi, Utensils, Home, User, Heart, Star, Check } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";

interface PropertyCardProps {
  id: number;
  image: string;
  name: string;
  price: number;
  distance: string;
  type: string;
  facilities: string[];
  owner: string;
  rating?: number;
  gender?: string;
  savedCount?: number;
}

const PropertyCard = ({ id, image, name, price, distance, type, facilities, owner, rating = 4.5, gender = "Both", savedCount = 0 }: PropertyCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [currentSavedCount, setCurrentSavedCount] = useState(savedCount);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if property is saved in localStorage (for demo/guest mode)
    const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    setIsSaved(savedProperties.includes(id));
  }, [id]);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('userSession') || localStorage.getItem('ownerSession');
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    
    if (!isSaved) {
      // Save property
      const newSavedProperties = [...savedProperties, id];
      localStorage.setItem('savedProperties', JSON.stringify(newSavedProperties));
      setIsSaved(true);
      setCurrentSavedCount(prev => prev + 1);

      const toastId = toast.success(
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4" />
          <span>Saved {isLoggedIn ? '' : '(Demo)'}</span>
        </div>,
        {
          duration: 5000,
          action: {
            label: "Undo",
            onClick: () => {
              // Undo save
              const filtered = savedProperties.filter((propId: number) => propId !== id);
              localStorage.setItem('savedProperties', JSON.stringify(filtered));
              setIsSaved(false);
              setCurrentSavedCount(prev => prev - 1);
              toast.dismiss(toastId);
            }
          }
        }
      );

      // Show tooltip for guest users
      if (!isLoggedIn) {
        setTimeout(() => {
          toast.info("Login to save permanently", { duration: 3000 });
        }, 500);
      }
    } else {
      // Unsave property
      const filtered = savedProperties.filter((propId: number) => propId !== id);
      localStorage.setItem('savedProperties', JSON.stringify(filtered));
      setIsSaved(false);
      setCurrentSavedCount(prev => prev - 1);
      toast.info("Removed from saved");
    }
  };

  const facilityIcons = {
    "Wi-Fi": Wifi,
    "Meals": Utensils,
    "Attached": Home,
  };

  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-hover transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3 bg-primary">
          {type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg">{name}</h3>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>{distance} from AOT</span>
          </div>
          <Badge variant="outline" className="text-xs">{gender}</Badge>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {facilities.map((facility) => {
            const Icon = facilityIcons[facility as keyof typeof facilityIcons] || Home;
            return (
              <div key={facility} className="flex items-center gap-1 text-xs bg-secondary px-2 py-1 rounded-full">
                <Icon className="h-3 w-3" />
                <span>{facility}</span>
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>Owner: {owner}</span>
          </div>
          {currentSavedCount > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Heart className="h-3 w-3" />
              <span>{currentSavedCount} saved</span>
            </div>
          )}
        </div>
        <p className="text-2xl font-bold text-primary">
          ₹{price.toLocaleString()}
          <span className="text-sm font-normal text-muted-foreground">/month</span>
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleSave} 
          className={`flex-1 transition-all duration-300 ${
            isAnimating ? 'scale-110' : ''
          } ${
            isSaved ? 'bg-red-50 border-red-300 text-red-600 hover:bg-red-100' : ''
          }`}
          style={{
            animation: isAnimating ? 'pulse 0.6s ease-in-out' : 'none'
          }}
        >
          <Heart className={`h-4 w-4 mr-2 transition-all duration-300 ${
            isSaved ? 'fill-red-600' : ''
          }`} />
          {isSaved ? 'Saved' : 'Save'}
        </Button>
        <Link to={`/property/${id}`} className="flex-1">
          <Button size="sm" className="w-full bg-accent hover:bg-accent/90">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;

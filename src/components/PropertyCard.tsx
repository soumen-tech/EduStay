import { Link } from "react-router-dom";
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
    const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    setIsSaved(savedProperties.includes(id));
  }, [id]);

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const isLoggedIn = localStorage.getItem('userSession') || localStorage.getItem('ownerSession');
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 600);

    const savedProperties = JSON.parse(localStorage.getItem('savedProperties') || '[]');
    
    if (!isSaved) {
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
              const filtered = savedProperties.filter((propId: number) => propId !== id);
              localStorage.setItem('savedProperties', JSON.stringify(filtered));
              setIsSaved(false);
              setCurrentSavedCount(prev => prev - 1);
              toast.dismiss(toastId);
            }
          }
        }
      );

      if (!isLoggedIn) {
        setTimeout(() => {
          toast.info("Login to save permanently", { duration: 3000 });
        }, 500);
      }
    } else {
      const filtered = savedProperties.filter((propId: number) => propId !== id);
      localStorage.setItem('savedProperties', JSON.stringify(filtered));
      setIsSaved(false);
      setCurrentSavedCount(prev => prev - 1);
      toast.info("Removed from saved");
    }
  };

  const facilityIcons: Record<string, typeof Wifi> = {
    "Wi-Fi": Wifi,
    "Meals": Utensils,
    "Attached": Home,
  };

  return (
    <div className="group glass-card rounded-2xl overflow-hidden hover-lift cursor-pointer">
      {/* Image Section */}
      <div className="relative h-52 overflow-hidden img-zoom">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Type Badge */}
        <div className="absolute top-3 right-3">
          <span className="chip bg-white/90 text-foreground backdrop-blur-sm font-semibold text-xs px-3 py-1 rounded-full">
            {type}
          </span>
        </div>

        {/* Save Button */}
        <button
          onClick={handleSave}
          className={`absolute top-3 left-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
            isSaved 
              ? 'bg-red-500 text-white' 
              : 'bg-white/80 backdrop-blur-sm text-foreground hover:bg-white'
          } ${isAnimating ? 'scale-125' : 'scale-100'}`}
        >
          <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Content Section */}
      <div className="p-5">
        {/* Title + Rating */}
        <div className="flex items-start justify-between mb-2">
          <h3 className="font-display font-semibold text-lg text-foreground leading-tight">
            {name}
          </h3>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-foreground">{rating}</span>
          </div>
        </div>

        {/* Location + Gender */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 text-primary" />
            <span>{distance} from AOT</span>
          </div>
          <span className="chip text-xs">{gender}</span>
        </div>

        {/* Amenity Chips */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {facilities.map((facility) => {
            const Icon = facilityIcons[facility] || Home;
            return (
              <span key={facility} className="chip flex items-center gap-1 text-xs">
                <Icon className="h-3 w-3" />
                {facility}
              </span>
            );
          })}
        </div>

        {/* Owner + Saved */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span>{owner}</span>
          </div>
          {currentSavedCount > 0 && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Heart className="h-3 w-3" />
              <span>{currentSavedCount}</span>
            </div>
          )}
        </div>

        {/* Price */}
        <div className="mb-4">
          <span className="text-2xl font-display font-bold text-primary">
            ₹{price.toLocaleString()}
          </span>
          <span className="text-sm text-muted-foreground ml-1">/month</span>
        </div>

        {/* Actions */}
        <Link to={`/property/${id}`} className="block">
          <Button
            size="sm"
            className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-body hover-glow transition-all duration-300"
          >
            View Sanctuary
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default PropertyCard;

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Wifi, Utensils, Home, User } from "lucide-react";

interface PropertyCardProps {
  image: string;
  name: string;
  price: number;
  distance: string;
  type: string;
  facilities: string[];
  owner: string;
}

const PropertyCard = ({ image, name, price, distance, type, facilities, owner }: PropertyCardProps) => {
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
        <h3 className="font-semibold text-lg mb-2">{name}</h3>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="h-4 w-4" />
          <span>{distance} from AOT</span>
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <User className="h-4 w-4" />
          <span>Owner: {owner}</span>
        </div>
        <p className="text-2xl font-bold text-primary">
          ₹{price.toLocaleString()}
          <span className="text-sm font-normal text-muted-foreground">/month</span>
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 gap-2">
        <Button variant="outline" className="flex-1">View Details</Button>
        <Button className="flex-1 bg-accent hover:bg-accent/90">Contact Owner</Button>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;

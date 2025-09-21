import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Users, Calendar, ExternalLink } from "lucide-react";

interface PropertyCardProps {
  title: string;
  location: string;
  price: string;
  rating: number;
  guests: number;
  platform: "Airbnb" | "VRBO" | "Hotel";
  image: string;
  availability: string;
  isNew?: boolean;
}

const PropertyCard = ({ 
  title, 
  location, 
  price, 
  rating, 
  guests, 
  platform, 
  image, 
  availability,
  isNew = false 
}: PropertyCardProps) => {
  const platformColors = {
    Airbnb: "bg-gradient-ocean",
    VRBO: "bg-gradient-tropical", 
    Hotel: "bg-gradient-sunset"
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {isNew && (
        <div className="bg-sunset text-white px-3 py-1 text-sm font-medium">
          🎉 Just Found!
        </div>
      )}
      
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className={`absolute top-3 left-3 ${platformColors[platform]} text-white border-0`}>
          {platform}
        </Badge>
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
          {price}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-ocean transition-colors">
              {title}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-sunset text-sunset" />
                <span>{rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{guests} guests</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-tropical" />
            <span className="text-tropical font-medium">{availability}</span>
          </div>

          <Button className="w-full bg-ocean hover:bg-ocean/90 text-white">
            <ExternalLink className="h-4 w-4 mr-2" />
            View on {platform}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
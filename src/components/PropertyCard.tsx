import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Users, Calendar, ExternalLink } from "lucide-react";
import { Property } from "@/services/api";

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const platformColors = {
    airbnb: "bg-gradient-ocean",
    vrbo: "bg-gradient-tropical", 
    hotels: "bg-gradient-sunset"
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency}${price}/night`;
  };

  const formatAvailability = (lastSeen: string) => {
    const date = new Date(lastSeen);
    return `Available from ${date.toLocaleDateString()}`;
  };

  const getPlatformName = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'airbnb': return 'Airbnb';
      case 'vrbo': return 'VRBO';
      case 'hotels': return 'Hotel';
      default: return platform;
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {property.justFound && (
        <div className="bg-sunset text-white px-3 py-1 text-sm font-medium">
          🎉 Just Found!
        </div>
      )}
      
      <div className="relative">
        <img 
          src={property.images[0] || "/placeholder.svg"} 
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <Badge className={`absolute top-3 left-3 ${platformColors[property.platform.toLowerCase() as keyof typeof platformColors] || 'bg-gradient-ocean'} text-white border-0`}>
          {getPlatformName(property.platform)}
        </Badge>
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
          {formatPrice(property.price, property.currency)}
        </div>
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-ocean transition-colors">
              {property.title}
            </h3>
            <div className="flex items-center gap-1 text-muted-foreground mt-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{property.location}</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-sunset text-sunset" />
                <span>{property.rating} ({property.reviewCount})</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>{property.guests} guests</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-tropical" />
            <span className="text-tropical font-medium">{formatAvailability(property.lastSeen)}</span>
          </div>

          <Button 
            className="w-full bg-ocean hover:bg-ocean/90 text-white"
            onClick={() => window.open(property.bookingUrl, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on {getPlatformName(property.platform)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
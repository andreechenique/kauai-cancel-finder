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

  const platformNames = {
    airbnb: "Airbnb",
    vrbo: "VRBO",
    hotels: "Hotel"
  };

  const formatPrice = (price: number, currency: string) => {
    return `${currency === 'USD' ? '$' : currency}${price}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getImageUrl = (images: string[]) => {
    return images.length > 0 ? images[0] : '/placeholder-property.jpg';
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
          src={getImageUrl(property.images)} 
          alt={property.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-property.jpg';
          }}
        />
        <Badge className={`absolute top-3 left-3 ${platformColors[property.platform as keyof typeof platformColors]} text-white border-0`}>
          {platformNames[property.platform as keyof typeof platformNames]}
        </Badge>
        <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
          {formatPrice(property.price, property.currency)}/night
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

          <div className="text-sm text-muted-foreground">
            <p className="line-clamp-2">{property.description}</p>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-tropical" />
            <span className="text-tropical font-medium">
              Available • Last seen {formatDate(property.lastSeen)}
            </span>
          </div>

          {property.amenities.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {property.amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {amenity.replace('_', ' ')}
                </Badge>
              ))}
              {property.amenities.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{property.amenities.length - 3} more
                </Badge>
              )}
            </div>
          )}

          <Button 
            className="w-full bg-ocean hover:bg-ocean/90 text-white"
            onClick={() => window.open(property.bookingUrl, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            View on {platformNames[property.platform as keyof typeof platformNames]}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
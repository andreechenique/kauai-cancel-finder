import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin, 
  Users, 
  DollarSign, 
  Bell, 
  Home, 
  Wifi, 
  Car, 
  Waves, 
  UtensilsCrossed,
  Dumbbell,
  Dog,
  Snowflake,
  Tv,
  Coffee,
  Loader2
} from "lucide-react";
import { apiService } from "@/services/api";

interface SearchFormData {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  minPrice: number;
  maxPrice: number;
  propertyType: string;
  platforms: string[];
  amenities: string[];
}

const AdvancedSearchForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<SearchFormData>({
    location: "Hanalei, Kauai",
    checkIn: "",
    checkOut: "",
    guests: 2,
    minPrice: 100,
    maxPrice: 800,
    propertyType: "any",
    platforms: ["airbnb", "vrbo", "hotels"],
    amenities: []
  });

  const amenityOptions = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "parking", label: "Parking", icon: Car },
    { id: "pool", label: "Pool", icon: Waves },
    { id: "kitchen", label: "Kitchen", icon: UtensilsCrossed },
    { id: "gym", label: "Gym", icon: Dumbbell },
    { id: "pet_friendly", label: "Pet Friendly", icon: Dog },
    { id: "air_conditioning", label: "A/C", icon: Snowflake },
    { id: "tv", label: "TV", icon: Tv },
    { id: "coffee_maker", label: "Coffee Maker", icon: Coffee },
  ];

  const updateFormData = (field: keyof SearchFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const toggleAmenity = (amenityId: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter(id => id !== amenityId)
        : [...prev.amenities, amenityId]
    }));
  };

  const togglePlatform = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platforms: prev.platforms.includes(platform)
        ? prev.platforms.filter(p => p !== platform)
        : [...prev.platforms, platform]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const monitoringRequest = {
        location: formData.location,
        checkIn: formData.checkIn,
        checkOut: formData.checkOut,
        guests: formData.guests,
        minPrice: formData.minPrice,
        maxPrice: formData.maxPrice,
        propertyType: formData.propertyType !== "any" ? formData.propertyType : undefined,
        platforms: formData.platforms,
        amenities: formData.amenities,
      };

      const response = await apiService.createMonitor(monitoringRequest);
      console.log("Monitor created:", response);
      
      // Reset form or show success message
    } catch (error) {
      console.error("Failed to create monitor:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Home className="h-6 w-6 text-ocean" />
          Advanced Search
        </h2>
        <p className="text-muted-foreground">
          Specify your exact requirements for the perfect stay
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Location & Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Select value={formData.location} onValueChange={(value) => updateFormData("location", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hanalei, Kauai">Hanalei</SelectItem>
                <SelectItem value="Princeville, Kauai">Princeville</SelectItem>
                <SelectItem value="Poipu, Kauai">Poipu</SelectItem>
                <SelectItem value="Kapaa, Kauai">Kapaa</SelectItem>
                <SelectItem value="Lihue, Kauai">Lihue</SelectItem>
                <SelectItem value="Waimea, Kauai">Waimea</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkin" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Check-in
            </Label>
            <Input
              id="checkin"
              type="date"
              value={formData.checkIn}
              onChange={(e) => updateFormData("checkIn", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkout" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Check-out
            </Label>
            <Input
              id="checkout"
              type="date"
              value={formData.checkOut}
              onChange={(e) => updateFormData("checkOut", e.target.value)}
            />
          </div>
        </div>

        {/* Guests & Price Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Guests: {formData.guests}
            </Label>
            <Slider
              value={[formData.guests]}
              onValueChange={(value) => updateFormData("guests", value[0])}
              max={12}
              min={1}
              step={1}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Price Range: ${formData.minPrice} - ${formData.maxPrice}/night
            </Label>
            <div className="px-2">
              <Slider
                value={[formData.minPrice, formData.maxPrice]}
                onValueChange={(value) => {
                  updateFormData("minPrice", value[0]);
                  updateFormData("maxPrice", value[1]);
                }}
                max={1000}
                min={50}
                step={25}
                className="w-full"
              />
            </div>
          </div>
        </div>

        {/* Property Type */}
        <div className="space-y-2">
          <Label>Property Type</Label>
          <Select value={formData.propertyType} onValueChange={(value) => updateFormData("propertyType", value)}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="any">Any Type</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="condo">Condo</SelectItem>
              <SelectItem value="villa">Villa</SelectItem>
              <SelectItem value="hotel">Hotel</SelectItem>
              <SelectItem value="resort">Resort</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Platforms */}
        <div className="space-y-3">
          <Label>Platforms to Monitor</Label>
          <div className="flex flex-wrap gap-3">
            {[
              { id: "airbnb", label: "Airbnb", color: "bg-gradient-ocean" },
              { id: "vrbo", label: "VRBO", color: "bg-gradient-tropical" },
              { id: "hotels", label: "Hotels.com", color: "bg-gradient-sunset" }
            ].map((platform) => (
              <div key={platform.id} className="flex items-center space-x-2">
                <Checkbox
                  id={platform.id}
                  checked={formData.platforms.includes(platform.id)}
                  onCheckedChange={() => togglePlatform(platform.id)}
                />
                <Label
                  htmlFor={platform.id}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {platform.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {/* Amenities */}
        <div className="space-y-3">
          <Label>Desired Amenities</Label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {amenityOptions.map((amenity) => {
              const IconComponent = amenity.icon;
              return (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={formData.amenities.includes(amenity.id)}
                    onCheckedChange={() => toggleAmenity(amenity.id)}
                  />
                  <Label
                    htmlFor={amenity.id}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-2"
                  >
                    <IconComponent className="h-4 w-4" />
                    {amenity.label}
                  </Label>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Amenities Display */}
        {formData.amenities.length > 0 && (
          <div className="space-y-2">
            <Label>Selected Amenities:</Label>
            <div className="flex flex-wrap gap-2">
              {formData.amenities.map((amenityId) => {
                const amenity = amenityOptions.find(a => a.id === amenityId);
                return amenity ? (
                  <Badge key={amenityId} variant="secondary">
                    {amenity.label}
                  </Badge>
                ) : null;
              })}
            </div>
          </div>
        )}

        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="w-full bg-gradient-ocean hover:opacity-90 text-primary-foreground"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Starting Monitoring...
            </>
          ) : (
            <>
              <Bell className="h-4 w-4 mr-2" />
              Start Advanced Monitoring
            </>
          )}
        </Button>

        <div className="text-sm text-muted-foreground text-center">
          We'll check your selected platforms every 15 minutes for properties matching your criteria
        </div>
      </form>
    </div>
  );
};

export default AdvancedSearchForm;
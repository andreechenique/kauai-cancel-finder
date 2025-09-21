import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users, Bell } from "lucide-react";

const SearchForm = () => {
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [location, setLocation] = useState("Hanalei, Kauai");
  const [guests, setGuests] = useState("2");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would typically start monitoring for the specified criteria
    console.log("Starting search monitoring for:", { checkIn, checkOut, location, guests });
  };

  return (
    <Card className="p-6 bg-white/95 backdrop-blur-sm border-0 shadow-xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">Monitor Vacation Rentals</h2>
          <p className="text-muted-foreground">Get notified instantly when properties become available</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Location
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Hanalei, Kauai"
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Guests
            </Label>
            <Input
              id="guests"
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              placeholder="2"
              min="1"
              className="bg-background"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="checkin" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Check-in
            </Label>
            <Input
              id="checkin"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="bg-background"
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
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="bg-background"
            />
          </div>
        </div>

        <Button type="submit" className="w-full bg-gradient-ocean hover:opacity-90 text-primary-foreground">
          <Bell className="h-4 w-4 mr-2" />
          Start Monitoring
        </Button>

        <div className="text-sm text-muted-foreground text-center">
          We'll check Airbnb, VRBO, and major hotels every 15 minutes
        </div>
      </form>
    </Card>
  );
};

export default SearchForm;
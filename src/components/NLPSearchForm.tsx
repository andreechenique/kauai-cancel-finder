import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Sparkles, MapPin, Calendar, Users, DollarSign } from "lucide-react";
import { extractTripDetailsFromText } from "@/services/textExtraction";
import { apiService } from "@/services/api";

interface ExtractedDetails {
  location?: string;
  checkin?: string;
  checkout?: string;
  guests?: number;
  budget?: number;
  propertyType?: string;
  amenities?: string[];
}

const NLPSearchForm = () => {
  const [inputText, setInputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedDetails, setExtractedDetails] = useState<ExtractedDetails | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleExtractDetails = async () => {
    if (!inputText.trim()) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      const details = await extractTripDetailsFromText(inputText);
      setExtractedDetails(details);
    } catch (err) {
      setError("Failed to process your request. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStartMonitoring = async () => {
    if (!extractedDetails) return;
    
    setIsProcessing(true);
    
    try {
      const monitoringRequest = {
        location: extractedDetails.location || "Kauai, HI",
        guests: extractedDetails.guests || 2,
        checkIn: extractedDetails.checkin || "",
        checkOut: extractedDetails.checkout || "",
        budget: extractedDetails.budget,
        propertyType: extractedDetails.propertyType,
        amenities: extractedDetails.amenities,
      };

      const response = await apiService.createMonitor(monitoringRequest);
      
      console.log("Monitor created:", response);
      setExtractedDetails(null);
      setInputText("");
    } catch (error) {
      console.error("Failed to create monitor:", error);
      setError("Failed to start monitoring. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const clearResults = () => {
    setExtractedDetails(null);
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2 flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-tropical" />
          Natural Language Search
        </h2>
        <p className="text-muted-foreground">
          Describe your perfect vacation in your own words
        </p>
      </div>

      <Card className="p-6">
        <div className="space-y-4">
          <Textarea
            placeholder="I'm looking for a beachfront villa in Santorini for 4 people from March 15-22, with a pool and kitchen, budget around $400/night..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[120px] resize-none"
          />
          
          <div className="flex gap-2">
            <Button 
              onClick={handleExtractDetails}
              disabled={!inputText.trim() || isProcessing}
              className="bg-gradient-tropical hover:opacity-90"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Analyze Request
                </>
              )}
            </Button>
            
            {extractedDetails && (
              <Button variant="outline" onClick={clearResults}>
                Clear
              </Button>
            )}
          </div>
        </div>
      </Card>

      {error && (
        <Card className="p-4 border-destructive bg-destructive/5">
          <p className="text-destructive text-sm">{error}</p>
        </Card>
      )}

      {extractedDetails && (
        <Card className="p-6 bg-gradient-to-r from-tropical/5 to-ocean/5 border-tropical/20">
          <h3 className="font-semibold mb-4 text-tropical">Extracted Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {extractedDetails.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Location: {extractedDetails.location}</span>
              </div>
            )}
            
            {extractedDetails.guests && (
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Guests: {extractedDetails.guests}</span>
              </div>
            )}
            
            {extractedDetails.checkin && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Check-in: {extractedDetails.checkin}</span>
              </div>
            )}
            
            {extractedDetails.checkout && (
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Check-out: {extractedDetails.checkout}</span>
              </div>
            )}
            
            {extractedDetails.budget && (
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Budget: ${extractedDetails.budget}/night</span>
              </div>
            )}
            
            {extractedDetails.propertyType && (
              <div className="flex items-center gap-2">
                <span className="text-sm">Type: {extractedDetails.propertyType}</span>
              </div>
            )}
          </div>
          
          {extractedDetails.amenities && extractedDetails.amenities.length > 0 && (
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Amenities:</p>
              <div className="flex flex-wrap gap-2">
                {extractedDetails.amenities.map((amenity, index) => (
                  <Badge key={index} variant="secondary">
                    {amenity.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          <Button 
            onClick={handleStartMonitoring}
            disabled={isProcessing}
            className="w-full bg-gradient-ocean hover:opacity-90"
          >
            {isProcessing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Starting Monitoring...
              </>
            ) : (
              "Start Monitoring"
            )}
          </Button>
        </Card>
      )}
    </div>
  );
};

export default NLPSearchForm;
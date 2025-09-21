import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchForm from "@/components/SearchForm";
import PropertyCard from "@/components/PropertyCard";
import MonitoringDashboard from "@/components/MonitoringDashboard";
import { Search, Bell, Zap, Shield } from "lucide-react";
import heroImage from "@/assets/kauai-hero.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");

  const mockProperties = [
    {
      title: "Oceanfront Villa with Private Beach Access",
      location: "Hanalei Bay, Kauai",
      price: "$450/night",
      rating: 4.9,
      guests: 6,
      platform: "Airbnb" as const,
      image: property1,
      availability: "Available Mar 15-22",
      isNew: true
    },
    {
      title: "Luxury Resort Suite with Mountain Views",
      location: "Princeville, Kauai",
      price: "$320/night", 
      rating: 4.7,
      guests: 4,
      platform: "Hotel" as const,
      image: property2,
      availability: "Available Mar 18-25"
    },
    {
      title: "Charming Beach Cottage with Lanai",
      location: "Hanalei, Kauai",
      price: "$280/night",
      rating: 4.8,
      guests: 4,
      platform: "VRBO" as const,
      image: property3,
      availability: "Available Mar 20-27"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Never Miss a <span className="text-sunset">Kauai</span> Cancellation
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Get instant notifications when vacation rentals become available in your dream location
            </p>
            <Button 
              size="lg" 
              className="bg-gradient-ocean hover:opacity-90 text-primary-foreground px-8 py-4 text-lg"
              onClick={() => {
                const searchSection = document.getElementById('search-section');
                searchSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Search className="mr-2 h-5 w-5" />
              Start Monitoring Now
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple, automated, and reliable</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-gradient-ocean w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Set Your Criteria</h3>
              <p className="text-muted-foreground">
                Define your perfect stay: dates, location, number of guests, and property preferences
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-gradient-tropical w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Real-Time Monitoring</h3>
              <p className="text-muted-foreground">
                We check Airbnb, VRBO, and major hotels every 15 minutes for new availability
              </p>
            </Card>

            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <div className="bg-gradient-sunset w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <Bell className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Instant Alerts</h3>
              <p className="text-muted-foreground">
                Get notified immediately via email, SMS, or push notification when properties become available
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="search-section" className="py-20 px-4 bg-gradient-to-b from-ocean-light/10 to-tropical-light/10">
        <div className="max-w-6xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="search">New Search</TabsTrigger>
              <TabsTrigger value="monitoring">My Monitoring</TabsTrigger>
            </TabsList>

            <TabsContent value="search" className="space-y-8">
              <div className="max-w-2xl mx-auto">
                <SearchForm />
              </div>

              {/* Sample Results */}
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Recently Found Properties</h3>
                  <p className="text-muted-foreground">Properties that became available in the last 24 hours</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockProperties.map((property, index) => (
                    <PropertyCard key={index} {...property} />
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="monitoring">
              <MonitoringDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Backend Notice */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="p-8 bg-gradient-to-r from-ocean/5 to-tropical/5 border-ocean/20">
            <Shield className="h-12 w-12 mx-auto mb-4 text-ocean" />
            <h3 className="text-2xl font-bold mb-4">Ready to Build the Backend?</h3>
            <p className="text-lg text-muted-foreground mb-6">
              This beautiful interface is ready! To enable real-time monitoring, notifications, and data storage, 
              connect your Lovable project to Supabase for powerful backend functionality.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>✓ Store user search preferences</p>
              <p>✓ Schedule automated property checks</p>
              <p>✓ Send email/SMS notifications</p>
              <p>✓ Track property availability history</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
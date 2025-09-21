import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SearchForm from "@/components/SearchForm";
import PropertyCard from "@/components/PropertyCard";
import MonitoringDashboard from "@/components/MonitoringDashboard";
import { Search, Bell, Zap, Shield } from "lucide-react";
import Cookies from "js-cookie";
import kauaiHero from "@/assets/kauai-hero.jpg";
import santoriniHero from "@/assets/santorini-hero.jpg";
import baliHero from "@/assets/bali-hero.jpg";
import maldivesHero from "@/assets/maldives-hero.jpg";
import patagoniaHero from "@/assets/patagonia-hero.jpg";
import japanHero from "@/assets/japan-hero.jpg";
import property1 from "@/assets/property-1.jpg";
import property2 from "@/assets/property-2.jpg";
import property3 from "@/assets/property-3.jpg";

const destinations = [
  {
    name: "Kauai",
    location: "Hawaii, USA",
    image: kauaiHero,
    accent: "emerald"
  },
  {
    name: "Santorini", 
    location: "Greece",
    image: santoriniHero,
    accent: "blue"
  },
  {
    name: "Bali",
    location: "Indonesia", 
    image: baliHero,
    accent: "green"
  },
  {
    name: "Maldives",
    location: "Indian Ocean",
    image: maldivesHero,
    accent: "cyan"
  },
  {
    name: "Patagonia",
    location: "Chile & Argentina",
    image: patagoniaHero,
    accent: "slate"
  },
  {
    name: "Japan",
    location: "Cherry Blossom Season",
    image: japanHero,
    accent: "pink"
  }
];

const Index = () => {
  const [activeTab, setActiveTab] = useState("search");
  const [currentDestination, setCurrentDestination] = useState(0);
  const [favoriteDestinations, setFavoriteDestinations] = useState<string[]>([]);

  // Load favorite destinations from cookies
  useEffect(() => {
    const saved = Cookies.get('favoriteDestinations');
    if (saved) {
      setFavoriteDestinations(JSON.parse(saved));
    }
  }, []);

  // Save favorite destinations to cookies
  const addToFavorites = (destination: string) => {
    const updated = [...favoriteDestinations, destination];
    setFavoriteDestinations(updated);
    Cookies.set('favoriteDestinations', JSON.stringify(updated), { expires: 365 });
  };

  // Rotate through destinations every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % destinations.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const mockProperties = [
    {
      title: "Oceanfront Villa with Private Beach Access",
      location: "Santorini, Greece",
      price: "$450/night",
      rating: 4.9,
      guests: 6,
      platform: "Airbnb" as const,
      image: property1,
      availability: "Available Mar 15-22",
      isNew: true
    },
    {
      title: "Luxury Mountain Lodge with Infinity Pool",
      location: "Ubud, Bali",
      price: "$320/night", 
      rating: 4.7,
      guests: 4,
      platform: "Hotel" as const,
      image: property2,
      availability: "Available Mar 18-25"
    },
    {
      title: "Overwater Bungalow Paradise",
      location: "Maldives",
      price: "$680/night",
      rating: 4.8,
      guests: 2,
      platform: "VRBO" as const,
      image: property3,
      availability: "Available Mar 20-27"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div 
        className="relative h-screen bg-cover bg-center bg-no-repeat transition-all duration-1000"
        style={{ backgroundImage: `url(${destinations[currentDestination].image})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex items-center justify-center h-full px-4">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              Never Miss a <span className="text-sunset">{destinations[currentDestination].name}</span> Cancellation
            </h1>
            <p className="text-lg md:text-xl mb-2 text-white/80 animate-fade-in">
              {destinations[currentDestination].location}
            </p>
            <p className="text-xl md:text-2xl mb-8 text-white/90 animate-fade-in">
              Get instant notifications when vacation rentals become available in your dream location
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white/10 text-white border-white/20 hover:bg-white/20 px-6 py-4"
                onClick={() => addToFavorites(destinations[currentDestination].name)}
              >
                ♡ Save {destinations[currentDestination].name}
              </Button>
            </div>
            
            {/* Destination Indicators */}
            <div className="flex justify-center mt-8 gap-2">
              {destinations.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentDestination 
                      ? 'bg-white scale-125' 
                      : 'bg-white/40 hover:bg-white/60'
                  }`}
                  onClick={() => setCurrentDestination(index)}
                />
              ))}
            </div>
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
                 We monitor Airbnb, VRBO, and major hotels every 15 minutes across 200+ destinations worldwide
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
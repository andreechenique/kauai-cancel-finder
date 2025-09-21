import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  BarChart, 
  Users, 
  Search, 
  Bell, 
  Settings, 
  Activity, 
  TrendingUp,
  MapPin,
  Trash2,
  Plus,
  Loader2
} from "lucide-react";
import { apiService, Stats, Monitor, Property } from "@/services/api";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats | null>(null);
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [recentProperties, setRecentProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [statsData, monitorsData, propertiesData] = await Promise.all([
          apiService.getStats(),
          apiService.getMonitors(),
          apiService.getRecentProperties()
        ]);
        
        setStats(statsData);
        setMonitors(monitorsData);
        setRecentProperties(propertiesData);
      } catch (error) {
        console.error('Failed to load admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDeleteMonitor = async (id: number) => {
    try {
      await apiService.deleteMonitor(id);
      setMonitors(monitors.filter(monitor => monitor.id !== id));
    } catch (error) {
      console.error('Failed to delete monitor:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/" className="text-2xl font-bold text-ocean">
                TravelAlert Admin
              </Link>
              <Badge variant="secondary" className="bg-ocean/10 text-ocean">
                System Dashboard
              </Badge>
            </div>
            <Link to="/">
              <Button variant="outline">
                Back to Site
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full max-w-2xl grid-cols-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="monitors">Monitors</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
                  <BarChart className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.totalProperties || 0}</div>
                  <p className="text-xs text-muted-foreground">Tracked across all platforms</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Monitors</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.activeMonitors || 0}</div>
                  <p className="text-xs text-muted-foreground">Currently monitoring</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Alerts Today</CardTitle>
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats?.alertsToday || 0}</div>
                  <p className="text-xs text-muted-foreground">New property notifications</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Growth</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">+12%</div>
                  <p className="text-xs text-muted-foreground">vs last month</p>
                </CardContent>
              </Card>
            </div>

            {/* Platform Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="bg-gradient-ocean w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold text-lg">{stats?.platforms.airbnb || 0}</span>
                    </div>
                    <p className="text-sm font-medium">Airbnb</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-tropical w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold text-lg">{stats?.platforms.vrbo || 0}</span>
                    </div>
                    <p className="text-sm font-medium">VRBO</p>
                  </div>
                  <div className="text-center">
                    <div className="bg-gradient-sunset w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-white font-bold text-lg">{stats?.platforms.hotels || 0}</span>
                    </div>
                    <p className="text-sm font-medium">Hotels</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitors" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Active Monitors</h2>
              <Button className="bg-ocean hover:bg-ocean/90">
                <Plus className="h-4 w-4 mr-2" />
                New Monitor
              </Button>
            </div>

            <div className="grid gap-6">
              {monitors.map((monitor) => (
                <Card key={monitor.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{monitor.location}</span>
                          <Badge 
                            variant={monitor.status === 'active' ? 'default' : 'secondary'}
                            className={monitor.status === 'active' ? 'bg-tropical' : ''}
                          >
                            {monitor.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {monitor.checkIn} → {monitor.checkOut} • {monitor.guests} guests
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Created: {new Date(monitor.created).toLocaleDateString()}
                        </div>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteMonitor(monitor.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {monitors.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No Active Monitors</h3>
                    <p className="text-muted-foreground">Start monitoring properties to see them here.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="properties" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Recent Properties</h2>
              <Badge variant="secondary">{recentProperties.length} properties found</Badge>
            </div>

            <div className="grid gap-4">
              {recentProperties.map((property) => (
                <Card key={property.id}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex gap-4">
                        <img 
                          src={property.images[0] || "/placeholder.svg"} 
                          alt={property.title}
                          className="w-20 h-20 object-cover rounded"
                        />
                        <div className="space-y-1">
                          <h3 className="font-medium line-clamp-1">{property.title}</h3>
                          <p className="text-sm text-muted-foreground">{property.location}</p>
                          <div className="flex items-center gap-4 text-sm">
                            <span>{property.currency}{property.price}/night</span>
                            <span>★ {property.rating} ({property.reviewCount})</span>
                            <span>{property.guests} guests</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className="mb-2">{property.platform}</Badge>
                        <p className="text-xs text-muted-foreground">
                          Last seen: {new Date(property.lastSeen).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {recentProperties.length === 0 && (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Activity className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <h3 className="text-lg font-medium mb-2">No Recent Properties</h3>
                    <p className="text-muted-foreground">Properties will appear here as they become available.</p>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  System Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="api-endpoint">API Endpoint</Label>
                    <Input 
                      id="api-endpoint" 
                      value="https://zmhqivc51edl.manus.space/api/v1"
                      readOnly
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="check-interval">Check Interval (minutes)</Label>
                    <Input 
                      id="check-interval" 
                      type="number"
                      defaultValue="15"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notification Settings</h3>
                  <div className="space-y-2">
                    <Label>
                      <input type="checkbox" className="mr-2" defaultChecked />
                      Email notifications
                    </Label>
                  </div>
                  <div className="space-y-2">
                    <Label>
                      <input type="checkbox" className="mr-2" defaultChecked />
                      SMS notifications
                    </Label>
                  </div>
                  <div className="space-y-2">
                    <Label>
                      <input type="checkbox" className="mr-2" />
                      Push notifications
                    </Label>
                  </div>
                </div>

                <Button className="bg-ocean hover:bg-ocean/90">
                  Save Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Pause, Play, Trash2, Settings, Loader2 } from "lucide-react";
import { apiService, Monitor } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

const MonitoringDashboard = () => {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadMonitors();
  }, []);

  const loadMonitors = async () => {
    try {
      const data = await apiService.getMonitors();
      setMonitors(data);
    } catch (error) {
      console.error("Failed to load monitors:", error);
      toast({
        title: "Error",
        description: "Failed to load monitoring data.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    setDeletingId(id);
    try {
      await apiService.deleteMonitor(id);
      setMonitors(monitors.filter(m => m.id !== id));
      toast({
        title: "Monitor deleted",
        description: "Monitoring has been stopped for this search.",
      });
    } catch (error) {
      console.error("Failed to delete monitor:", error);
      toast({
        title: "Error",
        description: "Failed to delete monitor.",
        variant: "destructive",
      });
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTimeAgo = (dateString: string) => {
    const now = new Date();
    const created = new Date(dateString);
    const diffInMinutes = Math.floor((now.getTime() - created.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Active Monitoring</h2>
        <Badge variant="secondary" className="bg-tropical-light text-tropical">
          <Bell className="h-4 w-4 mr-1" />
          {monitors.filter(m => m.status === "active").length} Active
        </Badge>
      </div>

      <div className="grid gap-4">
        {monitors.map((monitor) => (
          <Card key={monitor.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{monitor.location}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={monitor.status === "active" ? "default" : "secondary"}
                    className={monitor.status === "active" ? "bg-tropical text-white" : ""}
                  >
                    {monitor.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-muted-foreground">Check-in:</span>
                  <div className="font-medium">{formatDate(monitor.checkIn)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Check-out:</span>
                  <div className="font-medium">{formatDate(monitor.checkOut)}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Guests:</span>
                  <div className="font-medium">{monitor.guests}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Created:</span>
                  <div className="font-medium text-ocean">{getTimeAgo(monitor.created)}</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Monitoring every 15 minutes
                </span>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="text-muted-foreground"
                    disabled
                  >
                    <Pause className="h-4 w-4 mr-1" /> Pause
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(monitor.id)}
                    disabled={deletingId === monitor.id}
                  >
                    {deletingId === monitor.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {monitors.length === 0 && (
        <Card className="p-8 text-center">
          <div className="text-muted-foreground">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No active monitoring searches</p>
            <p className="text-sm mt-1">Create your first search above to get started</p>
          </div>
        </Card>
      )}
    </div>
  );
};

export default MonitoringDashboard;
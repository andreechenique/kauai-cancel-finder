import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bell, Pause, Play, Trash2, Settings } from "lucide-react";

interface MonitoringSearch {
  id: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: "active" | "paused";
  lastChecked: string;
  foundProperties: number;
}

const mockSearches: MonitoringSearch[] = [
  {
    id: "1",
    location: "Hanalei, Kauai",
    checkIn: "2024-07-15",
    checkOut: "2024-07-22",
    guests: 4,
    status: "active",
    lastChecked: "2 minutes ago",
    foundProperties: 3
  },
  {
    id: "2", 
    location: "Princeville, Kauai",
    checkIn: "2024-08-01",
    checkOut: "2024-08-05",
    guests: 2,
    status: "paused",
    lastChecked: "1 hour ago",
    foundProperties: 1
  }
];

const MonitoringDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Active Monitoring</h2>
        <Badge variant="secondary" className="bg-tropical-light text-tropical">
          <Bell className="h-4 w-4 mr-1" />
          {mockSearches.filter(s => s.status === "active").length} Active
        </Badge>
      </div>

      <div className="grid gap-4">
        {mockSearches.map((search) => (
          <Card key={search.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{search.location}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={search.status === "active" ? "default" : "secondary"}
                    className={search.status === "active" ? "bg-tropical text-white" : ""}
                  >
                    {search.status}
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
                  <div className="font-medium">{search.checkIn}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Check-out:</span>
                  <div className="font-medium">{search.checkOut}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Guests:</span>
                  <div className="font-medium">{search.guests}</div>
                </div>
                <div>
                  <span className="text-muted-foreground">Found:</span>
                  <div className="font-medium text-ocean">{search.foundProperties} properties</div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Last checked: {search.lastChecked}
                </span>
                
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className={search.status === "active" ? "text-muted-foreground" : "text-tropical"}
                  >
                    {search.status === "active" ? (
                      <><Pause className="h-4 w-4 mr-1" /> Pause</>
                    ) : (
                      <><Play className="h-4 w-4 mr-1" /> Resume</>
                    )}
                  </Button>
                  <Button variant="outline" size="sm" className="text-destructive hover:text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {mockSearches.length === 0 && (
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
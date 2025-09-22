import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trash2, Calendar, MapPin, Users } from 'lucide-react';
import { apiClient } from '@/services/api';
import { Monitor } from '@/types/api';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

export const UserDashboard = () => {
  const [monitors, setMonitors] = useState<Monitor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchMonitors();
  }, []);

  const fetchMonitors = async () => {
    try {
      const data = await apiClient.getMonitors();
      setMonitors(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load your monitors.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMonitor = async (id: number) => {
    try {
      await apiClient.deleteMonitor(id);
      setMonitors(monitors.filter(m => m.id !== id));
      toast({
        title: "Monitor Deleted",
        description: "Monitor has been successfully removed.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete monitor.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading your monitors...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Active Monitors</h2>
      
      {monitors.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground mb-4">You don't have any active monitors yet.</p>
            <p className="text-sm text-muted-foreground">Create a search to start monitoring for available properties!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {monitors.map((monitor) => (
            <Card key={monitor.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg">Monitor #{monitor.id}</CardTitle>
                <Badge variant={monitor.status === 'active' ? 'default' : 'secondary'}>
                  {monitor.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 mr-2" />
                    {monitor.location}
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="w-4 h-4 mr-2" />
                    {monitor.guests} guests
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    {format(new Date(monitor.checkIn), 'MMM dd')} - {format(new Date(monitor.checkOut), 'MMM dd, yyyy')}
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    Created: {format(new Date(monitor.created), 'PPP')}
                  </div>
                  
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteMonitor(monitor.id)}
                    className="w-full mt-4"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Monitor
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
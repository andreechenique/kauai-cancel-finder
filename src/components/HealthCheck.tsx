import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, RefreshCw } from 'lucide-react';

interface HealthStatus {
  status: 'healthy' | 'unhealthy' | 'loading' | 'error';
  responseTime?: number;
  timestamp?: string;
}

export const HealthCheck: React.FC = () => {
  const [health, setHealth] = useState<HealthStatus>({ status: 'loading' });
  const [isChecking, setIsChecking] = useState(false);

  const checkHealth = async () => {
    setIsChecking(true);
    const startTime = Date.now();
    
    try {
      const response = await fetch('https://zmhqivc51edl.manus.space/api/v1/health');
      const responseTime = Date.now() - startTime;
      
      if (response.ok) {
        setHealth({
          status: 'healthy',
          responseTime,
          timestamp: new Date().toLocaleTimeString()
        });
      } else {
        setHealth({
          status: 'unhealthy',
          responseTime,
          timestamp: new Date().toLocaleTimeString()
        });
      }
    } catch (error) {
      setHealth({
        status: 'error',
        responseTime: Date.now() - startTime,
        timestamp: new Date().toLocaleTimeString()
      });
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    checkHealth();
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    switch (health.status) {
      case 'healthy': return 'bg-green-500';
      case 'unhealthy': return 'bg-yellow-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = () => {
    switch (health.status) {
      case 'healthy': return 'Healthy';
      case 'unhealthy': return 'Unhealthy';
      case 'error': return 'Error';
      case 'loading': return 'Checking...';
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Activity className="h-4 w-4" />
          API Health Status
        </CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={checkHealth}
          disabled={isChecking}
        >
          <RefreshCw className={`h-4 w-4 ${isChecking ? 'animate-spin' : ''}`} />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${getStatusColor()}`} />
            <Badge variant={health.status === 'healthy' ? 'default' : 'destructive'}>
              {getStatusText()}
            </Badge>
          </div>
          <div className="text-sm text-muted-foreground">
            {health.responseTime && `${health.responseTime}ms`}
          </div>
        </div>
        {health.timestamp && (
          <p className="text-xs text-muted-foreground mt-2">
            Last checked: {health.timestamp}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
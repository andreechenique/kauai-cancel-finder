import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import PropertyCard from '@/components/PropertyCard';
import { Property } from '@/types/api';
import { apiClient } from '@/services/api';

export const RecentProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentProperties = async () => {
      try {
        const data = await apiClient.getRecentProperties();
        setProperties(data);
      } catch (error) {
        console.error('Failed to load recent properties:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentProperties();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recently Found Properties</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No recent properties found.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
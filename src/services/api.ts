const API_BASE_URL = 'https://zmhqivc51edl.manus.space/api/v1';

export interface Property {
  id: number;
  title: string;
  location: string;
  price: number;
  currency: string;
  rating: number;
  reviewCount: number;
  guests: number;
  platform: string;
  images: string[];
  description: string;
  amenities: string[];
  bookingUrl: string;
  lastSeen: string;
  justFound?: boolean;
}

export interface Monitor {
  id: number;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: string;
  created: string;
}

export interface Stats {
  totalProperties: number;
  activeMonitors: number;
  alertsToday: number;
  platforms: {
    airbnb: number;
    vrbo: number;
    hotels: number;
  };
}

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getStats(): Promise<Stats> {
    return this.request('/stats');
  }

  async getRecentProperties(): Promise<Property[]> {
    return this.request('/properties/recent');
  }

  async getMonitors(): Promise<Monitor[]> {
    return this.request('/monitors');
  }

  async createMonitor(data: any): Promise<Monitor> {
    return this.request('/monitors', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async deleteMonitor(id: number): Promise<void> {
    return this.request(`/monitors/${id}`, {
      method: 'DELETE',
    });
  }
}

export const apiService = new ApiService();
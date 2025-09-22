export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

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
export type UserRole = 'agent' | 'traveler';

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: UserRole;
  avatar?: string;
}

export interface TravelPackage {
  id: string;
  title: string;
  description: string;
  destination: string;
  duration: number;
  price: number;
  imageUrl: string;
  inclusions: string[];
  exclusions: string[];
  itinerary: ItineraryDay[];
  agentId: string;
  createdAt: string;
  featured?: boolean;
}

export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
}

export interface SearchFilters {
  destination?: string;
  minPrice?: number;
  maxPrice?: number;
  duration?: number;
}

export type BookingStatus = 'confirmed' | 'cancelled' | 'pending';

export interface Booking {
  id: string;
  packageId: string;
  userId: string;
  userName: string;
  userEmail: string;
  travelers: number;
  totalPrice: number;
  status: BookingStatus;
  bookedAt: string;
  specialRequests?: string;
}
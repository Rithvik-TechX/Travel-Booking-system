import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking } from '../types';

interface BookingsContextType {
  bookings: Booking[];
  createBooking: (booking: Booking) => void;
  cancelBooking: (id: string) => void;
  getUserBookings: (userId: string) => Booking[];
  getBookingsByPackage: (packageId: string) => Booking[];
}

const BookingsContext = createContext<BookingsContextType | undefined>(undefined);

const STORAGE_KEY = 'travelease_bookings';

export const BookingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Error loading bookings from storage:', e);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const createBooking = (booking: Booking) => {
    setBookings(prev => [booking, ...prev]);
  };

  const cancelBooking = (id: string) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: 'cancelled' as const } : b))
    );
  };

  const getUserBookings = (userId: string) => {
    return bookings.filter(b => b.userId === userId);
  };

  const getBookingsByPackage = (packageId: string) => {
    return bookings.filter(b => b.packageId === packageId);
  };

  return (
    <BookingsContext.Provider value={{
      bookings,
      createBooking,
      cancelBooking,
      getUserBookings,
      getBookingsByPackage,
    }}>
      {children}
    </BookingsContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingsContext);
  if (context === undefined) {
    throw new Error('useBookings must be used within a BookingsProvider');
  }
  return context;
};

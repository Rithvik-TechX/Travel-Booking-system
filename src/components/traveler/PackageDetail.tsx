import React, { useState } from 'react';
import { Calendar, MapPin, Check, X, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { TravelPackage } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { useBookings } from '../../context/BookingsContext';
import { useToast } from '../../context/ToastContext';
import Button from '../common/Button';

interface PackageDetailProps {
  travelPackage: TravelPackage;
}

const PackageDetail: React.FC<PackageDetailProps> = ({ travelPackage }) => {
  const {
    title,
    description,
    destination,
    duration,
    price,
    imageUrl,
    inclusions,
    exclusions,
    itinerary,
    featured,
  } = travelPackage;

  const { currentUser, isAuthenticated } = useAuth();
  const { createBooking } = useBookings();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [travelers, setTravelers] = useState(1);
  const [specialRequests, setSpecialRequests] = useState('');
  const [isBooking, setIsBooking] = useState(false);

  const totalPrice = price * travelers;

  const handleBookClick = () => {
    if (!isAuthenticated) {
      showToast('Please login to book a package', 'warning');
      navigate('/login');
      return;
    }
    if (currentUser?.role === 'agent') {
      showToast('Agents cannot book packages. Please login as a traveler.', 'warning');
      return;
    }
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    if (!currentUser) return;
    setIsBooking(true);

    const booking = {
      id: Date.now().toString(),
      packageId: travelPackage.id,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      travelers,
      totalPrice,
      status: 'confirmed' as const,
      bookedAt: new Date().toISOString(),
      specialRequests: specialRequests || undefined,
    };

    setTimeout(() => {
      createBooking(booking);
      setIsBooking(false);
      setShowBookingModal(false);
      showToast(`Successfully booked "${title}"! Check My Bookings for details.`, 'success');
      setTravelers(1);
      setSpecialRequests('');
    }, 800);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="relative h-80">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
          {featured && (
            <div className="absolute top-0 right-0 bg-amber-500 text-white px-4 py-2 m-4 rounded-md font-medium">
              Featured
            </div>
          )}
        </div>

        <div className="p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{title}</h1>
          
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 text-blue-600 mr-1" />
              <span>{destination}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 text-blue-600 mr-1" />
              <span>{duration} days</span>
            </div>
            <div className="flex items-center text-gray-900 font-bold text-xl">
              <span className="text-green-600 mr-1">₹</span>
              <span>{price.toLocaleString()}</span>
              <span className="text-sm font-normal text-gray-500 ml-1">/ person</span>
            </div>
          </div>

          <div className="prose max-w-none mb-8">
            <h2 className="text-xl font-semibold mb-2">Overview</h2>
            <p className="text-gray-700">{description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">What's Included</h2>
              <ul className="space-y-2">
                {inclusions.map((item, index) => (
                  <li key={`inclusion-${index}`} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">What's Not Included</h2>
              <ul className="space-y-2">
                {exclusions.map((item, index) => (
                  <li key={`exclusion-${index}`} className="flex items-start">
                    <X className="h-5 w-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
            <div className="space-y-6">
              {itinerary.map((day, index) => (
                <div key={`day-${index}`} className="border-l-4 border-blue-500 pl-4">
                  <h3 className="text-lg font-medium text-gray-900">Day {day.day}: {day.title}</h3>
                  <p className="text-gray-700 mt-2">{day.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button size="lg" onClick={handleBookClick}>
              Book This Package — ₹{price.toLocaleString()}/person
            </Button>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowBookingModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none"
            >
              ×
            </button>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Book This Package</h2>
            <p className="text-gray-500 mb-6">{title}</p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Number of Travelers
                </label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.max(1, travelers - 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-bold"
                  >
                    −
                  </button>
                  <div className="flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-lg font-semibold w-6 text-center">{travelers}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTravelers(Math.min(20, travelers + 1))}
                    className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-lg font-bold"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Special Requests (optional)
                </label>
                <textarea
                  rows={3}
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="Any dietary requirements, accessibility needs, etc."
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex justify-between text-sm text-gray-600 mb-1">
                  <span>₹{price.toLocaleString()} × {travelers} traveler{travelers > 1 ? 's' : ''}</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-blue-200 pt-2 mt-2">
                  <span>Total</span>
                  <span className="text-emerald-600">₹{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <Button
                fullWidth
                size="lg"
                onClick={handleConfirmBooking}
                isLoading={isBooking}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageDetail;
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Users, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useBookings } from '../context/BookingsContext';
import { usePackages } from '../context/PackagesContext';
import { useToast } from '../context/ToastContext';
import MainLayout from './layouts/MainLayout';
import Button from '../components/common/Button';

const BookingsPage: React.FC = () => {
  const { currentUser } = useAuth();
  const { getUserBookings, cancelBooking } = useBookings();
  const { getPackageById } = usePackages();
  const { showToast } = useToast();

  const userBookings = currentUser ? getUserBookings(currentUser.id) : [];

  const handleCancel = (bookingId: string) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      cancelBooking(bookingId);
      showToast('Booking cancelled successfully', 'info');
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">Confirmed</span>;
      case 'cancelled':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800">Cancelled</span>;
      case 'pending':
        return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">Pending</span>;
      default:
        return null;
    }
  };

  return (
    <MainLayout>
      <div className="bg-gray-100 py-8 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">My Bookings</h1>

          {userBookings.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-12 text-center">
              <AlertCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-6">
                Start exploring our amazing travel packages and book your dream vacation!
              </p>
              <Link to="/packages">
                <Button>Browse Packages</Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {userBookings.map(booking => {
                const pkg = getPackageById(booking.packageId);
                return (
                  <div key={booking.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      {pkg && (
                        <div className="md:w-64 h-48 md:h-auto flex-shrink-0">
                          <img
                            src={pkg.imageUrl}
                            alt={pkg.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-grow p-6">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">
                              {pkg ? pkg.title : 'Package Unavailable'}
                            </h3>
                            {pkg && (
                              <div className="flex items-center text-gray-600 mt-1">
                                <MapPin className="h-4 w-4 text-blue-600 mr-1" />
                                <span className="text-sm">{pkg.destination}</span>
                              </div>
                            )}
                          </div>
                          {getStatusBadge(booking.status)}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Booking Date</p>
                            <p className="text-sm font-medium flex items-center mt-1">
                              <Calendar className="h-4 w-4 text-blue-600 mr-1" />
                              {new Date(booking.bookedAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Travelers</p>
                            <p className="text-sm font-medium flex items-center mt-1">
                              <Users className="h-4 w-4 text-blue-600 mr-1" />
                              {booking.travelers} {booking.travelers === 1 ? 'person' : 'people'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Duration</p>
                            <p className="text-sm font-medium mt-1">
                              {pkg ? `${pkg.duration} days` : '-'}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase">Total Price</p>
                            <p className="text-lg font-bold text-emerald-600 mt-1">
                              ₹{booking.totalPrice.toLocaleString()}
                            </p>
                          </div>
                        </div>

                        {booking.specialRequests && (
                          <div className="mt-3">
                            <p className="text-xs text-gray-500 uppercase">Special Requests</p>
                            <p className="text-sm text-gray-700 mt-1">{booking.specialRequests}</p>
                          </div>
                        )}

                        <div className="mt-4 flex gap-3">
                          {pkg && (
                            <Link to={`/packages/${pkg.id}`}>
                              <Button variant="outline" size="sm">View Package</Button>
                            </Link>
                          )}
                          {booking.status === 'confirmed' && (
                            <Button
                              variant="danger"
                              size="sm"
                              onClick={() => handleCancel(booking.id)}
                            >
                              Cancel Booking
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default BookingsPage;

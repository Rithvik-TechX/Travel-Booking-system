import React, { useState } from 'react';
import { Menu, X, Globe, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useBookings } from '../../context/BookingsContext';

const Navbar: React.FC = () => {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { getUserBookings } = useBookings();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeBookings = currentUser
    ? getUserBookings(currentUser.id).filter(b => b.status === 'confirmed').length
    : 0;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Globe className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-800">TravelEase</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              Home
            </Link>
            <Link to="/packages" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
              Packages
            </Link>
            
            {isAuthenticated ? (
              <>
                {currentUser?.role === 'agent' && (
                  <Link to="/agent/dashboard" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                    Agent Dashboard
                  </Link>
                )}
                {currentUser?.role === 'traveler' && (
                  <Link to="/bookings" className="relative px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                    <span className="flex items-center">
                      <Briefcase className="h-4 w-4 mr-1" />
                      My Bookings
                      {activeBookings > 0 && (
                        <span className="ml-1.5 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {activeBookings}
                        </span>
                      )}
                    </span>
                  </Link>
                )}
                <div className="relative ml-3">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      {currentUser?.avatar ? (
                        <img className="h-8 w-8 rounded-full" src={currentUser.avatar} alt="User avatar" />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                          <span className="text-white text-sm font-medium">
                            {currentUser?.name?.charAt(0) || 'U'}
                          </span>
                        </div>
                      )}
                      <span className="ml-2 text-sm font-medium text-gray-700">
                        {currentUser?.name}
                      </span>
                    </div>
                    <button
                      onClick={logout}
                      className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">
                  Login
                </Link>
                <Link to="/register" className="px-3 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700">
                  Register
                </Link>
              </>
            )}
          </div>
          
          <div className="flex md:hidden items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-50 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <Link to="/packages" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
              Packages
            </Link>
            
            {isAuthenticated ? (
              <>
                {currentUser?.role === 'agent' && (
                  <Link to="/agent/dashboard" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                    Agent Dashboard
                  </Link>
                )}
                {currentUser?.role === 'traveler' && (
                  <Link to="/bookings" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                    My Bookings {activeBookings > 0 && `(${activeBookings})`}
                  </Link>
                )}
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-5">
                    {currentUser?.avatar ? (
                      <img className="h-10 w-10 rounded-full" src={currentUser.avatar} alt="User avatar" />
                    ) : (
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-white font-medium">
                          {currentUser?.name?.charAt(0) || 'U'}
                        </span>
                      </div>
                    )}
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{currentUser?.name}</div>
                      <div className="text-sm font-medium text-gray-500">{currentUser?.email}</div>
                    </div>
                  </div>
                  <div className="mt-3 px-2">
                    <button
                      onClick={() => { logout(); setIsMenuOpen(false); }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50" onClick={() => setIsMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700" onClick={() => setIsMenuOpen(false)}>
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
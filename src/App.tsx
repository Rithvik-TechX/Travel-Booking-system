import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PackagesProvider } from './context/PackagesContext';
import { BookingsProvider } from './context/BookingsContext';
import { ToastProvider } from './context/ToastContext';
import ProtectedRoute from './components/common/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PackagesPage from './pages/packages/PackagesPage';
import PackageDetailPage from './pages/packages/PackageDetailPage';
import AgentDashboardPage from './pages/agent/AgentDashboardPage';
import CreatePackagePage from './pages/agent/CreatePackagePage';
import EditPackagePage from './pages/agent/EditPackagePage';
import BookingsPage from './pages/BookingsPage';

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <PackagesProvider>
          <BookingsProvider>
            <Router>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/packages" element={<PackagesPage />} />
                <Route path="/packages/:id" element={<PackageDetailPage />} />
                
                {/* Traveler Routes */}
                <Route path="/bookings" element={
                  <ProtectedRoute>
                    <BookingsPage />
                  </ProtectedRoute>
                } />
                
                {/* Agent Routes */}
                <Route path="/agent/dashboard" element={
                  <ProtectedRoute requiredRole="agent">
                    <AgentDashboardPage />
                  </ProtectedRoute>
                } />
                <Route path="/agent/create-package" element={
                  <ProtectedRoute requiredRole="agent">
                    <CreatePackagePage />
                  </ProtectedRoute>
                } />
                <Route path="/agent/edit-package/:id" element={
                  <ProtectedRoute requiredRole="agent">
                    <EditPackagePage />
                  </ProtectedRoute>
                } />
                
                {/* Fallback Route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Router>
          </BookingsProvider>
        </PackagesProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
 
export default App;
// PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './components/AuthContext';

// Component for protected routes
const PrivateRoute = ({ children, allowGuest = false }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking auth status
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-900"></div>
            </div>
        );
    }

    // Allow access if user is authenticated or if route allows guests
    if (user || allowGuest) {
        return children;
    }

    // Redirect to login page if not authenticated, saving the attempted path
    return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
};

// Component to redirect authenticated users away from login/register pages
export const RedirectIfAuthenticated = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking auth status
    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-900"></div>
            </div>
        );
    }

    // If user is authenticated, redirect to the intended destination or home
    if (user) {
        const destination = location.state?.from || '/';
        return <Navigate to={destination} replace />;
    }

    // If not authenticated, show the children (login/register page)
    return children;
};

export default PrivateRoute;
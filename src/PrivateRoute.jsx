// PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './components/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-900"></div>
            </div>
        );
    }

    if (!user) {
        // Save the attempted location
        return <Navigate to="/auth" state={{ from: location.pathname }} />;
    }

    return children;
};

export const RedirectIfAuthenticated = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-900"></div>
            </div>
        );
    }

    if (user) {
        // Redirect to the saved location or home
        const from = location.state?.from || '/';
        return <Navigate to={from} />;
    }

    return children;
};

export default PrivateRoute;
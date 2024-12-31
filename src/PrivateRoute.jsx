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
        // Save the attempted location and redirect to auth
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
        const from = location.state?.from;
        // If there's a saved location, go there, otherwise go home
        return <Navigate to={from || "/"} replace={true} />;
    }

    return children;
};

export default PrivateRoute;
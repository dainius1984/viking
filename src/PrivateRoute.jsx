// PrivateRoute.jsx
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './components/AuthContext';

const PrivateRoute = ({ children }) => {
    const { user, loading, checkUser } = useAuth();
    const location = useLocation();

    useEffect(() => {
        // Check backend session as well
        const checkSession = async () => {
            try {
                const response = await fetch('https://healthapi-zvfk.onrender.com/api/check-session', {
                    credentials: 'include'
                });
                if (!response.ok && user) {
                    // If backend session is invalid but frontend thinks we're logged in
                    checkUser(); // This will trigger a re-auth check
                }
            } catch (error) {
                console.error('Session check error:', error);
            }
        };

        checkSession();
    }, [user, checkUser]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-900"></div>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/auth" state={{ from: location.pathname }} replace />;
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
        const from = location.state?.from || '/';
        return <Navigate to={from} replace />;
    }

    return children;
};

export default PrivateRoute;
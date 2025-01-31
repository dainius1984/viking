// This component provides route protection and redirection based on authentication status.
// It contains two components:
// 1. RedirectIfAuthenticated - prevents authenticated users from accessing auth pages
// 2. PrivateRoute - protects routes that require authentication

import { Navigate } from 'react-router-dom';
import { useAuth } from './components/AuthContext';

// This component is used for pages that should NOT be accessible when logged in
// For example: login and registration pages
// If user is logged in, redirects to account page, otherwise shows the page content
export const RedirectIfAuthenticated = ({ children }) => {
    const { user } = useAuth();
    return user ? <Navigate to="/account" /> : children;
};

// This component protects routes that require authentication
// If user is not logged in, redirects to auth page
// Shows loading state while checking authentication
// If authenticated, renders the protected page content
const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    
    // Show loading indicator while checking authentication status
    if (loading) return <div>Loading...</div>;
    
    // If user is authenticated, show the protected content
    // Otherwise, redirect to the auth page
    return user ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
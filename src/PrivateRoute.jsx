// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuth } from './components/AuthContext';

export const RedirectIfAuthenticated = ({ children }) => {
    const { user } = useAuth();
    return user ? <Navigate to="/account" /> : children;
};

const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return user ? children : <Navigate to="/auth" />;
};

export default PrivateRoute;
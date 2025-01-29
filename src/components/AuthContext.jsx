// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  checkAppwriteSession, 
  checkApiSession, 
  loginUser, 
  registerUser, 
  logoutUser 
} from './authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkUser = async () => {
    try {
      // Try Appwrite session first
      const appwriteResult = await checkAppwriteSession();
      if (appwriteResult.success) {
        setUser(appwriteResult.session);
        return;
      }

      // Fallback to API session check
      const apiResult = await checkApiSession();
      if (apiResult.success && apiResult.authenticated) {
        setUser({ guest: true });
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const login = async (email, password) => {
    const result = await loginUser(email, password);
    if (result.success) {
      setUser(result.session);
    }
    return result;
  };

  const register = async (email, password, name) => {
    const result = await registerUser(email, password, name);
    if (result.success) {
      setUser(result.session);
    }
    return result;
  };

  const logout = async () => {
    const result = await logoutUser();
    if (result.success) {
      setUser(null);
      navigate('/');
    }
    return result;
  };

  // Prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000); // Increased timeout to ensure Appwrite connection

    return () => clearTimeout(timeout);
  }, []);

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    checkUser,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;
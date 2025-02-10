// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  checkAppwriteSession,
  loginUser, 
  registerUser, 
  logoutUser 
} from './authService';

/**
 * Create Authentication Context
 * This context will hold authentication state and methods
 */
const AuthContext = createContext(null);

/**
 * Authentication Provider Component
 * Manages authentication state and provides authentication methods to child components
 * 
 * @component
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to be wrapped
 */
export const AuthProvider = ({ children }) => {
  // State management for user and loading status
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  /**
   * Checks if user has an active session
   * Updates user state based on session status
   */
  const checkUser = async () => {
    try {
      const appwriteResult = await checkAppwriteSession();
      if (appwriteResult.success && appwriteResult.session) {
        setUser(appwriteResult.session);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Session check error:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Check user session on component mount
  useEffect(() => {
    checkUser();
  }, []);

  /**
   * Handles user login
   * Updates user state and returns success/error status
   * 
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @returns {Promise<Object>} Login result object
   */
  const login = async (email, password) => {
    setLoading(true);
    try {
      const result = await loginUser(email, password);
      if (result.success && result.user) {
        setUser(result.user);
        return { success: true };
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles user registration
   * Creates new account and updates user state
   * 
   * @param {string} email - User's email
   * @param {string} password - User's password
   * @param {string} name - User's name
   * @returns {Promise<Object>} Registration result object
   */
  const register = async (email, password, name) => {
    setLoading(true);
    try {
      const result = await registerUser(email, password, name);
      if (result.success && result.user) {
        setUser(result.user);
        return { success: true };
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handles user logout
   * Clears user session and navigates to home page
   * 
   * @returns {Promise<Object>} Logout result object
   */
  const logout = async () => {
    setLoading(true);
    try {
      await logoutUser();
      setUser(null);
      navigate('/');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return { 
        success: false, 
        error: error.message 
      };
    } finally {
      setLoading(false);
    }
  };

  // Prepare context value object with all authentication methods and state
  const value = {
    user,                  // Current user object
    loading,              // Loading state
    login,                // Login method
    logout,               // Logout method
    register,             // Registration method
    checkUser,            // Session check method
    isAuthenticated: !!user  // Authentication status
  };

  return (
    <AuthContext.Provider value={value}>
      {/* Render children only after initial loading is complete */}
      {!loading && children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use authentication context
 * Provides access to authentication state and methods
 * 
 * @returns {Object} Authentication context value
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
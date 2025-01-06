// components/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from './appwrite';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);

const API_URL = 'https://healthapi-zvfk.onrender.com';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const session = await account.getSession('current');
      if (session) {
        setUser(session);
      }
    } catch (error) {
      console.error('Session check error:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const session = await account.createEmailSession(email, password);
      setUser(session);
      
      // Fetch user details from your API
      const response = await fetch(`${API_URL}/api/user`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${session.$id}`
        }
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(prevUser => ({
          ...prevUser,
          ...userData
        }));
      }

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: error.message || 'Login failed'
      };
    }
  };

  const register = async (email, password, name) => {
    try {
      // Create account in Appwrite
      const user = await account.create('unique()', email, password, name);
      
      // Create account in your API
      const response = await fetch(`${API_URL}/api/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email,
          name,
          appwriteId: user.$id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create user in API');
      }

      // Log in the user after successful registration
      await login(email, password);

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error: error.message || 'Registration failed'
      };
    }
  };

  const logout = async () => {
    try {
      await account.deleteSession('current');
      setUser(null);
      navigate('/');
      return { success: true };
    } catch (error) {
      console.error('Logout error:', error);
      return {
        success: false,
        error: error.message || 'Logout failed'
      };
    }
  };

  const updateProfile = async (data) => {
    try {
      const session = await account.getSession('current');
      
      const response = await fetch(`${API_URL}/api/user`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${session.$id}`
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      setUser(prevUser => ({
        ...prevUser,
        ...updatedUser
      }));

      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        error: error.message || 'Profile update failed'
      };
    }
  };

  const resetPassword = async (email) => {
    try {
      await account.createRecovery(email, 'https://your-domain.com/reset-password');
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        error: error.message || 'Password reset failed'
      };
    }
  };

  const confirmPasswordReset = async (userId, secret, password, passwordConfirm) => {
    try {
      await account.updateRecovery(userId, secret, password, passwordConfirm);
      return { success: true };
    } catch (error) {
      console.error('Password reset confirmation error:', error);
      return {
        success: false,
        error: error.message || 'Password reset confirmation failed'
      };
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    updateProfile,
    resetPassword,
    confirmPasswordReset,
    checkUser
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
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
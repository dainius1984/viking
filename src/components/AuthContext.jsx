// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ID } from 'appwrite';
import { account } from './appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [sessionError, setSessionError] = useState(null);

    // Helper function to handle localStorage for user-specific data
    const handleUserStorage = useCallback((isUserSession) => {
        if (!isUserSession && !user) {
            // Clear storage only for guests or when explicitly logging out
            localStorage.removeItem('cart');
            localStorage.removeItem('favorites');
        }
    }, [user]);

    // Check user session status
    const checkUser = useCallback(async () => {
        try {
            const session = await account.get();
            setUser(session);
            setSessionError(null);
        } catch (error) {
            console.log('No active session:', error);
            setUser(null);
            handleUserStorage(false);
            if (error.code !== 401) {
                setSessionError(error.message);
            }
        } finally {
            setLoading(false);
        }
    }, [handleUserStorage]);

    // Login function
    const login = async (email, password) => {
        try {
            setLoading(true);
            await account.createEmailPasswordSession(email, password);
            const userData = await account.get();
            setUser(userData);
            setSessionError(null);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            return {
                success: false,
                error: error.message || 'Invalid credentials. Please check your email and password.'
            };
        } finally {
            setLoading(false);
        }
    };

    // Register function
    const register = async (email, password, name) => {
        try {
            setLoading(true);
            await account.create(ID.unique(), email, password, name);
            const loginResult = await login(email, password);
            if (!loginResult.success) {
                throw new Error('Auto-login after registration failed');
            }
            return { success: true };
        } catch (error) {
            console.error('Registration error:', error);
            return {
                success: false,
                error: error.message || 'Failed to register. Please try again.'
            };
        } finally {
            setLoading(false);
        }
    };

    // Logout function
    const logout = useCallback(async () => {
        try {
            setLoading(true);
            await account.deleteSession('current');
            handleUserStorage(false);
            setUser(null);
            setSessionError(null);
        } catch (error) {
            console.error('Logout error:', error);
            // Force logout on client side even if server request fails
            setUser(null);
            handleUserStorage(false);
        } finally {
            setLoading(false);
        }
    }, [handleUserStorage]);

    // Effect for initial session check
    useEffect(() => {
        checkUser();
    }, [checkUser]);

    // Effect for handling browser/tab visibility and closure
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && !user) {
                // Clear storage only for guests when tab is hidden
                handleUserStorage(false);
            }
        };

        const handleBeforeUnload = () => {
            if (!user) {
                // Clear storage only for guests before page unload
                handleUserStorage(false);
            } else {
                // Logout user when closing browser/tab
                logout();
            }
        };

        // Add event listeners
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', handleBeforeUnload);

        // Cleanup function
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [user, handleUserStorage, logout]);

    // Session refresh logic
    useEffect(() => {
        if (!user) return;

        const refreshSession = async () => {
            try {
                await account.get();
            } catch (error) {
                if (error.code === 401) {
                    console.log('Session expired, logging out');
                    await logout();
                }
            }
        };

        // Check session every 5 minutes if user is logged in
        const intervalId = setInterval(refreshSession, 5 * 60 * 1000);

        return () => clearInterval(intervalId);
    }, [user, logout]);

    // Load saved data after login
    useEffect(() => {
        if (user) {
            // Load saved favorites if they exist
            const savedFavorites = localStorage.getItem('favorites');
            const savedCart = localStorage.getItem('cart');
            if (!savedFavorites) {
                localStorage.setItem('favorites', JSON.stringify([]));
            }
            if (!savedCart) {
                localStorage.setItem('cart', JSON.stringify([]));
            }
        }
    }, [user]);

    // Provide context value
    const contextValue = {
        user,
        loading,
        login,
        logout,
        register,
        sessionError,
        isAuthenticated: !!user,
        checkUser
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// Custom hook for using auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
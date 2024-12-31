import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ID } from 'appwrite';
import { account } from './appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [autoLogoutTimer, setAutoLogoutTimer] = useState(null);

    const clearAutoLogoutTimer = useCallback(() => {
        if (autoLogoutTimer) {
            clearTimeout(autoLogoutTimer);
            setAutoLogoutTimer(null);
        }
    }, [autoLogoutTimer]);

    const logout = useCallback(async () => {
        try {
            await account.deleteSession('current');
            setUser(null);
            clearAutoLogoutTimer();
        } catch (error) {
            console.error('Logout error:', error);
            setUser(null);
        }
    }, [clearAutoLogoutTimer]);

    const startAutoLogoutTimer = useCallback(() => {
        clearAutoLogoutTimer();
        const timer = setTimeout(() => {
            logout();
        }, 120000);
        setAutoLogoutTimer(timer);
    }, [clearAutoLogoutTimer, logout]);

    const checkUser = useCallback(async () => {
        try {
            // First check if we have an active session
            const sessions = await account.listSessions();
            if (sessions.total > 0) {
                const session = await account.get();
                setUser(session);
            } else {
                setUser(null);
            }
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    // Start timer whenever user state changes
    useEffect(() => {
        if (user) {
            startAutoLogoutTimer();
        }
    }, [user, startAutoLogoutTimer]);

    // Initial user check
    useEffect(() => {
        checkUser();
    }, [checkUser]);

    // Tab visibility and beforeunload handlers
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden && user) {
                logout();
            }
        };

        const handleBeforeUnload = (e) => {
            if (user) {
                const request = new XMLHttpRequest();
                request.open('POST', '/auth/logout', false);
                request.send();
                setUser(null);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            clearAutoLogoutTimer();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [user, logout, clearAutoLogoutTimer]);

    // Activity monitoring
    useEffect(() => {
        if (!user) return;

        const resetTimer = () => {
            startAutoLogoutTimer();
        };

        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keypress', resetTimer);
        window.addEventListener('click', resetTimer);
        window.addEventListener('scroll', resetTimer);

        return () => {
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keypress', resetTimer);
            window.removeEventListener('click', resetTimer);
            window.removeEventListener('scroll', resetTimer);
        };
    }, [user, startAutoLogoutTimer]);

    const login = async (email, password) => {
        try {
            await account.createEmailPasswordSession(email, password);
            const userData = await account.get();
            setUser(userData);
            return { success: true };
        } catch (error) {
            return { 
                success: false, 
                error: 'Invalid credentials. Please check the email and password.' 
            };
        }
    };

    const register = async (email, password, name) => {
        try {
            await account.create(ID.unique(), email, password, name);
            return login(email, password);
        } catch (error) {
            return { 
                success: false, 
                error: 'Failed to register. Please try again.' 
            };
        }
    };

    return (
        <AuthContext.Provider 
            value={{ user, login, register, logout, loading }}
        >
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
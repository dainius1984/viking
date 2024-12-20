import React, { createContext, useContext, useState, useEffect } from 'react';
import { ID } from 'appwrite';
import { account } from './appwrite';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const checkUser = async () => {
        try {
            const session = await account.get();
            setUser(session);
            
            // Verify backend session
            await fetch('/api/check-session', {
                credentials: 'include'
            });
        } catch {
            setUser(null);
            // Clear backend session if Appwrite session is invalid
            try {
                await fetch('/api/logout', {
                    method: 'POST',
                    credentials: 'include'
                });
            } catch (error) {
                console.error('Error clearing backend session:', error);
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

    const login = async (email, password) => {
        try {
            // First authenticate with Appwrite
            await account.createEmailPasswordSession(email, password);
            const userData = await account.get();
            
            // Create backend session
            const backendResponse = await fetch('/api/login', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    email,
                    appwriteSession: userData.$id 
                })
            });

            if (!backendResponse.ok) {
                throw new Error(`Backend error: ${backendResponse.status}`);
            }

            setUser(userData);
            return { success: true };
        } catch (error) {
            console.error('Login error:', error);
            // Cleanup any partial session
            try {
                await account.deleteSession('current');
                await fetch('/api/logout', {
                    method: 'POST',
                    credentials: 'include'
                });
            } catch (cleanupError) {
                console.error('Cleanup error:', cleanupError);
            }
            return { 
                success: false, 
                error: 'Invalid credentials or server error. Please try again.' 
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

    const logout = async () => {
        try {
            await Promise.all([
                account.deleteSession('current'),
                fetch('/api/logout', {
                    method: 'POST',
                    credentials: 'include'
                })
            ]);
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            setUser(null);
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
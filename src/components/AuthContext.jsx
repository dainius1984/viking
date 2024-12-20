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
        } catch {
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        checkUser();
    }, []);

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

    const logout = async () => {
        try {
            await account.deleteSession('current');
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
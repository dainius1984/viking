// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { account } from './appwrite';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext(null);
export const API_URL = 'https://healthapi-zvfk.onrender.com';

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
     } else {
       const response = await fetch(`${API_URL}/api/check-session`, {
         credentials: 'include'
       });
       if (response.ok) {
         const { authenticated } = await response.json();
         if (authenticated) {
           setUser({ guest: true });
         }
       }
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
     
     const response = await fetch(`${API_URL}/api/login`, {
       method: 'POST',
       credentials: 'include',
       headers: {
         'Content-Type': 'application/json',
         'Accept': 'application/json'
       },
       body: JSON.stringify({
         email,
         appwriteSession: session.$id
       })
     });

     if (!response.ok) throw new Error('API login failed');

     return { success: true };
   } catch (error) {
     console.error('Login error:', error);
     return { success: false, error: error.message };
   }
 };

 const register = async (email, password, name) => {
   try {
     const user = await account.create('unique()', email, password, name);
     await login(email, password);
     return { success: true };
   } catch (error) {
     console.error('Registration error:', error);
     return { success: false, error: error.message };
   }
 };

 const logout = async () => {
   try {
     await account.deleteSession('current');
     await fetch(`${API_URL}/api/logout`, {
       method: 'POST',
       credentials: 'include'
     });
     setUser(null);
     navigate('/');
     return { success: true };
   } catch (error) {
     console.error('Logout error:', error);
     return { success: false, error: error.message };
   }
 };

 const value = {
   user,
   loading,
   login,
   logout, 
   register,
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
 if (!context) throw new Error('useAuth must be used within AuthProvider');
 return context;
};

export default AuthContext;
// authService.js
import { account, ID } from './appwrite';  // Dodajemy import ID
import { AUTH_ENDPOINTS } from './authConfig';

export const checkAppwriteSession = async () => {
  try {
    const session = await account.get();
    return { success: true, session };
  } catch (error) {
    return { success: false, error };
  }
};

export const checkApiSession = async () => {
  try {
    const response = await fetch(AUTH_ENDPOINTS.CHECK_SESSION, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      const data = await response.json();
      return { success: true, authenticated: data.authenticated };
    }
    return { success: false };
  } catch (error) {
    return { success: false, error };
  }
};

export const loginUser = async (email, password) => {
  try {
    // Create Appwrite session
    const session = await account.createEmailPasswordSession(email, password);
    
    if (!session) {
      throw new Error('Failed to create Appwrite session');
    }

    // Then authenticate with your API
    const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email,
        password,
        appwriteSession: session.$id
      })
    });

    if (!response.ok) {
      try {
        await account.deleteSession('current');
      } catch {}
      throw new Error('API login failed');
    }

    return { success: true, session };
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      code: error.code 
    };
  }
};

export const registerUser = async (email, password, name) => {
  try {
    // Create Appwrite account - używamy ID.unique() zamiast 'unique()'
    await account.create(ID.unique(), email, password, name);
    
    // Then login
    return await loginUser(email, password);
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      code: error.code 
    };
  }
};

export const logoutUser = async () => {
  try {
    // First try to logout from API
    await fetch(AUTH_ENDPOINTS.LOGOUT, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Then delete Appwrite session
    try {
      await account.deleteSession('current');
    } catch (error) {
      console.warn('Failed to delete Appwrite session:', error);
    }
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    };
  }
};
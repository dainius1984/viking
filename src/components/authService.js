// authService.js
import { account } from './appwrite';
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
    // First create Appwrite session
    const session = await account.createEmailPassword(email, password);
    
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
        password
      })
    });

    if (!response.ok) {
      // If API login fails, clean up Appwrite session
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
    // Create Appwrite account
    await account.create('unique()', email, password, name);
    
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
// authService.js
import { account } from './appwrite';
import { AUTH_ENDPOINTS } from './authConfig';

export const checkAppwriteSession = async () => {
  try {
    const session = await account.get();
    // Verify the session with your API
    const apiCheck = await checkApiSession();
    if (!apiCheck.authenticated) {
      await account.deleteSession('current');
      return { success: false };
    }
    return { success: true, session };
  } catch (error) {
    return { success: false, error };
  }
};

export const checkApiSession = async () => {
  try {
    const response = await fetch(AUTH_ENDPOINTS.CHECK_SESSION, {
      credentials: 'include'
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
    // Clear any existing sessions first
    try {
      await account.deleteSession('current');
    } catch {
      // Ignore errors here
    }

    // First authenticate with your API
    const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('API login failed');
    }

    // Then create Appwrite session
    const session = await account.createEmailPasswordSession(email, password);
    
    return { success: true, session };
  } catch (error) {
    // Clean up any partial sessions on error
    try {
      await account.deleteSession('current');
    } catch {}
    
    return { 
      success: false, 
      error: error.message,
      code: error.code 
    };
  }
};

export const registerUser = async (email, password, name) => {
  try {
    // Create account first
    await account.create(email, password, name);
    // Then login immediately
    const loginResult = await loginUser(email, password);
    return loginResult.success ? { success: true, session: loginResult.session } : loginResult;
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
    // Delete API session first
    await fetch(AUTH_ENDPOINTS.LOGOUT, {
      method: 'POST',
      credentials: 'include'
    });
    
    // Then delete Appwrite session
    await account.deleteSession('current');
    
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    };
  }
};
// authService.js
import { account, ID } from './appwrite';
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
    // Clear any existing sessions
    try {
      await account.deleteSession('current');
    } catch {
      // Ignore errors here
    }

    // Create new session
    const session = await account.createEmailSession(email, password);
    
    // Sync with API
    const response = await fetch(AUTH_ENDPOINTS.LOGIN, {
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

    if (!response.ok) {
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
    // Create account first
    await account.create(ID.unique(), email, password, name);
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
    await account.deleteSession('current');
    await fetch(AUTH_ENDPOINTS.LOGOUT, {
      method: 'POST',
      credentials: 'include'
    });
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    };
  }
};
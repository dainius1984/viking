// authService.js
import { account, ID } from './appwrite';

export const checkAppwriteSession = async () => {
  try {
    const session = await account.get();
    return { success: true, session };
  } catch (error) {
    console.error('Session check error:', error);
    return { success: false, error };
  }
};

export const loginUser = async (email, password) => {
  try {
    // Create Appwrite session with better error handling
    let session;
    try {
      session = await account.createEmailSession(email, password);
    } catch (error) {
      if (error.code === 401) {
        return { 
          success: false, 
          error: 'Nieprawidłowy email lub hasło',
          code: error.code 
        };
      }
      throw error;
    }
    
    // Get user details after successful login
    const user = await account.get();

    return { success: true, session, user };
  } catch (error) {
    console.error('Login error:', error);
    return { 
      success: false, 
      error: error.message,
      code: error?.code 
    };
  }
};

export const registerUser = async (email, password, name) => {
  try {
    // Create Appwrite account
    const user = await account.create(ID.unique(), email, password, name);
    
    if (!user) {
      throw new Error('Failed to create account');
    }

    // Login after successful registration
    return await loginUser(email, password);
  } catch (error) {
    console.error('Registration error:', error);

    // Handle specific Appwrite error codes
    if (error.code === 409) {
      return {
        success: false,
        error: 'Email już istnieje w bazie',
        code: error.code
      };
    }

    return { 
      success: false, 
      error: error.message,
      code: error?.code 
    };
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    return { 
      success: false, 
      error: error.message 
    };
  }
};
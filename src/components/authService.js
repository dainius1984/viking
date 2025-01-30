// authService.js
import { account, ID } from './appwrite';

export const checkAppwriteSession = async () => {
  try {
    const session = await account.get();
    return { success: true, session };
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

    // Get user details
    const user = await account.get();

    return { success: true, session, user };
  } catch (error) {
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

    // Then login
    return await loginUser(email, password);
  } catch (error) {
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
    return { 
      success: false, 
      error: error.message 
    };
  }
};
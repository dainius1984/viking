// authService.js
import { account, ID } from './appwrite';

/**
 * Checks if there is an active Appwrite session
 * Used to verify if a user is currently logged in
 * 
 * @returns {Promise<Object>} Object containing:
 *  - success: boolean indicating if the check was successful
 *  - session: current session data if exists
 *  - error: error message if check failed
 */
export const checkAppwriteSession = async () => {
  try {
    const session = await account.get();
    return { success: true, session };
  } catch (error) {
    return { success: false, error };
  }
};

/**
 * Authenticates a user using email and password
 * Creates a new session and retrieves user details
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @returns {Promise<Object>} Object containing:
 *  - success: boolean indicating if login was successful
 *  - session: session data if login successful
 *  - user: user details if login successful
 *  - error: error message if login failed
 *  - code: error code if login failed
 */
export const loginUser = async (email, password) => {
  try {
    // Attempt to create an Appwrite session with provided credentials
    const session = await account.createEmailPasswordSession(email, password);
    
    if (!session) {
      throw new Error('Failed to create Appwrite session');
    }

    // If session creation successful, get user details
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

/**
 * Registers a new user with email, password, and name
 * Automatically logs in the user after successful registration
 * 
 * @param {string} email - User's email address
 * @param {string} password - User's password
 * @param {string} name - User's full name
 * @returns {Promise<Object>} Object containing:
 *  - success: boolean indicating if registration was successful
 *  - session: session data if registration successful
 *  - user: user details if registration successful
 *  - error: error message if registration failed
 *  - code: error code if registration failed
 */
export const registerUser = async (email, password, name) => {
  try {
    // Create new user account with unique ID
    const user = await account.create(ID.unique(), email, password, name);
    
    if (!user) {
      throw new Error('Failed to create account');
    }

    // After successful registration, log the user in
    return await loginUser(email, password);
  } catch (error) {
    return { 
      success: false, 
      error: error.message,
      code: error?.code 
    };
  }
};

/**
 * Logs out the current user by deleting their session
 * 
 * @returns {Promise<Object>} Object containing:
 *  - success: boolean indicating if logout was successful
 *  - error: error message if logout failed
 */
export const logoutUser = async () => {
  try {
    // Delete the current session
    await account.deleteSession('current');
    return { success: true };
  } catch (error) {
    return { 
      success: false, 
      error: error.message 
    };
  }
};
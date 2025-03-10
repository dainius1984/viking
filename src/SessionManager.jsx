import { useEffect } from 'react';
import { useAuth } from './components/AuthContext';
import { isInPaymentFlow } from './components/authService';

// Inactivity timeout in milliseconds (5 minutes)
const INACTIVITY_TIMEOUT = 5 * 60 * 1000;

/**
 * SessionManager component handles user session management:
 * - Logs out users after inactivity
 * - Attempts to log out users when they close the browser/tab
 * - Preserves sessions during payment flow
 */
const SessionManager = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    // Only apply session management to logged-in users
    if (!user) return;

    let inactivityTimer;
    
    /**
     * Checks if user is in any part of the payment process
     * @returns {boolean} True if user is in payment flow
     */
    const isInPaymentProcess = () => {
      return (
        isInPaymentFlow() || 
        sessionStorage.getItem('inPaymentFlow') === 'true' ||
        sessionStorage.getItem('lastOrder') !== null ||
        window.location.pathname.includes('order-confirmation')
      );
    };
    
    /**
     * Resets the inactivity timer when user performs an action
     */
    const resetInactivityTimer = () => {
      // Skip timer if user is in payment flow
      if (isInPaymentProcess()) { 
        console.log('User is in payment flow, skipping inactivity timer');
        return;
      }

      // Clear existing timer and set a new one
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (!isInPaymentProcess()) {
          console.log('User inactive for too long, logging out...');
          logout();
        }
      }, INACTIVITY_TIMEOUT);
    };

    /**
     * Handles tab/browser close events
     * Note: This may not always fire in all browsers
     */
    const handleTabClose = () => {
      if (!isInPaymentProcess()) {
        // Use a synchronous approach for more reliable logout
        try {
          console.log('Tab closing, attempting logout');
          
          // Create a synchronous request to logout endpoint
          const xhr = new XMLHttpRequest();
          xhr.open('POST', '/api/logout', false); // false makes it synchronous
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.send(JSON.stringify({ userId: user.$id }));
          
          // Also call the normal logout function
          logout();
        } catch (e) {
          console.error('Error during tab close logout:', e);
        }
      }
    };

    /**
     * Handles tab visibility changes (when user switches tabs)
     */
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        // User returned to the tab - reset timer
        resetInactivityTimer();
      }
    };

    // Set up event listeners
    window.addEventListener('beforeunload', handleTabClose);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Track user activity events
    const activityEvents = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      document.addEventListener(event, resetInactivityTimer);
    });
    
    // Initialize the inactivity timer
    resetInactivityTimer();

    // Clean up all event listeners on unmount
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('beforeunload', handleTabClose);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      activityEvents.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [user, logout]);

  // This component doesn't render anything
  return null;
};

export default SessionManager;
import { useEffect } from 'react';
import { useAuth } from './components/AuthContext';
import { isInPaymentFlow } from './authService';

// Inactivity timeout in milliseconds (5 minutes)
const INACTIVITY_TIMEOUT = 5 * 60 * 1000;

const SessionManager = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) return; // Only apply to logged-in users

    let inactivityTimer;
    
    // Function to handle user activity
    const resetInactivityTimer = () => {
      // Skip setting timer if user is in payment flow
      if (isInPaymentFlow()) {
        console.log('User is in payment flow, skipping inactivity timer');
        return;
      }

      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        // Double-check that we're not in payment flow before logging out
        if (!isInPaymentFlow()) {
          console.log('User inactive for too long, logging out...');
          logout();
        }
      }, INACTIVITY_TIMEOUT);
    };

    // Function to handle tab close
    const handleTabClose = (event) => {
      // Skip logout if user is in payment flow
      if (user && !isInPaymentFlow()) {
        // Note: This is best-effort and may not complete before tab closes
        console.log('Tab closing, attempting logout');
        logout();
      }
    };

    // Set up tab close event
    window.addEventListener('beforeunload', handleTabClose);
    
    // Set up user activity tracking events
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
      activityEvents.forEach(event => {
        document.removeEventListener(event, resetInactivityTimer);
      });
    };
  }, [user, logout]);

  // This component doesn't render anything
  return null;
};

export default SessionManager;
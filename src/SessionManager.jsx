import { useEffect } from 'react';
import { useAuth } from './components/AuthContext';

// Inactivity timeout in milliseconds (5 minutes)
const INACTIVITY_TIMEOUT = 5 * 60 * 1000;

const SessionManager = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) return; // Only apply to logged-in users

    let inactivityTimer;
    
    // Function to handle user activity
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        console.log('User inactive for too long, logging out...');
        logout();
      }, INACTIVITY_TIMEOUT);
    };

    // Function to handle tab close
    const handleTabClose = (event) => {
      // Attempt to logout when tab is closed
      if (user) {
        // Note: This is best-effort and may not complete before tab closes
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
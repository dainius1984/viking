import { useEffect } from 'react';
import { useAuth } from './components/AuthContext';
import { isInPaymentFlow } from './components/authService';

// Inactivity timeout in milliseconds (5 minutes)
const INACTIVITY_TIMEOUT = 5 * 60 * 1000;

const SessionManager = () => {
  const { user, logout } = useAuth();

  useEffect(() => {
    if (!user) return;

    let inactivityTimer;
    
    const isInPaymentProcess = () => {
      // Check multiple indicators of payment process
      return (
        isInPaymentFlow() || 
        sessionStorage.getItem('inPaymentFlow') === 'true' ||
        sessionStorage.getItem('lastOrder') !== null ||
        window.location.pathname.includes('order-confirmation')
      );
    };
    
    const resetInactivityTimer = () => {
      if (isInPaymentProcess()) { 
        console.log('User is in payment flow, skipping inactivity timer');
        return;
      }

      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (!isInPaymentProcess()) {
          console.log('User inactive for too long, logging out...');
          logout();
        }
      }, INACTIVITY_TIMEOUT);
    };

    const handleTabClose = (event) => {
      if (user && !isInPaymentProcess()) {
        console.log('Tab closing, attempting logout');
        logout();
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !isInPaymentProcess()) {
        console.log('Tab hidden, checking payment status');
        // Optional: Add additional checks here
      }
    };

    // Set up event listeners
    window.addEventListener('beforeunload', handleTabClose);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    const activityEvents = ['mousedown', 'keypress', 'scroll', 'touchstart'];
    activityEvents.forEach(event => {
      document.addEventListener(event, resetInactivityTimer);
    });
    
    resetInactivityTimer();

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
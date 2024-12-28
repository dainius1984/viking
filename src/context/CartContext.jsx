import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';
import { useAuth } from '../components/AuthContext';

const API_URL = 'https://healthapi-zvfk.onrender.com';
const CartContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
  isDiscountApplied: false,
  discountCode: null
};

const cartReducer = (state, action) => {
  if (!state) {
    state = {
      cart: [],
      wishlist: [],
      isDiscountApplied: false,
      discountCode: null
    };
  }

  let newState;
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      let updatedItems;
      if (existingItem) {
        updatedItems = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        updatedItems = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      newState = {
        ...state,
        cart: updatedItems
      };
      break;
    }

    case 'APPLY_DISCOUNT':
      newState = {
        ...state,
        isDiscountApplied: true,
        discountCode: action.payload
      };
      break;

    case 'REMOVE_FROM_CART':
      newState = {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload),
      };
      break;

    case 'UPDATE_QUANTITY':
      newState = {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
      break;

    case 'CLEAR_CART':
      newState = {
        cart: [],
        wishlist: state.wishlist,
        isDiscountApplied: false,
        discountCode: null
      };
      break;

    default:
      newState = state;
  }

  localStorage.setItem('guestCart', JSON.stringify(newState));
  return newState;
};

  // Check if we're in order completion flow
  const isOrderCompletion = 
    action.type === 'CLEAR_CART' && 
    (window.location.pathname.includes('order-confirmation') || 
     window.location.pathname.includes('zamowienie'));

  // Only sync with server if we're not in order completion
  if (!isOrderCompletion && action.type !== 'LOAD_STATE') {
    // Wrap the fetch in a try-catch to silently handle errors
    try {
      fetch(`${API_URL}/api/cart`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newState)
      }).catch(() => {
        // Silently fail for unauthorized or network errors
      });
    } catch (error) {
      // Silently handle any errors
      console.error('Error syncing cart with server:', error);
    }
  }

  return newState;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load initial state
  useEffect(() => {
    const loadCart = async () => {
      try {
        // First try to load from localStorage
        const savedCart = localStorage.getItem('guestCart');
        if (savedCart) {
          try {
            const parsedCart = JSON.parse(savedCart);
            if (parsedCart && typeof parsedCart === 'object') {
              dispatch({ type: 'LOAD_STATE', payload: parsedCart });
            }
          } catch (error) {
            console.error('Error parsing saved cart:', error);
          }
        }

        // If user is logged in, try to load from server
        if (user) {
          try {
            const response = await fetch(`${API_URL}/api/cart`, {
              credentials: 'include',
              headers: {
                'Accept': 'application/json'
              }
            });

            if (response.ok) {
              const serverCart = await response.json();
              if (serverCart && (serverCart.cart || serverCart.wishlist)) {
                dispatch({ type: 'LOAD_STATE', payload: serverCart });
              }
            }
          } catch (error) {
            console.error('Error loading cart from server:', error);
          }
        }
      } catch (error) {
        console.error('Error in loadCart:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCart();
  }, [user]);

  // Prevent infinite loading
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  // Ensure cart state persistence on page refresh
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        localStorage.setItem('guestCart', JSON.stringify(state));
      } catch (error) {
        console.error('Error saving cart state:', error);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [state]);

  // Skip initial loading render
  if (loading) {
    return null;
  }

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
// The CartContext component manages the entire shopping cart functionality of your application, 
// handling both guest users (using sessionStorage) and logged-in users (using localStorage and server synchronization). 
// It provides state management for cart items, wishlist items, and discount codes, using React's Context API and useReducer for state updates. 
// The component ensures cart persistence across page reloads and browser sessions, with different storage strategies for guests (temporary sessionStorage) versus logged-in users 
// (permanent localStorage plus server backup). Finally, it exports a useCart hook that other components can use to access and modify the cart state, 
// making it easy to integrate shopping cart functionality throughout the application.

// CartContext.jsx
import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';
import { useAuth } from '../components/AuthContext';

// Constants
const API_URL = 'https://healthapi-zvfk.onrender.com';

// Context Creation
const CartContext = createContext();

// Initial State
const initialState = {
  cart: [],              // Stores cart items
  wishlist: [],          // Stores wishlist items
  isDiscountApplied: false,  // Discount flag
  discountCode: null     // Active discount code
};

// Cart Reducer - Handles all cart state modifications
const cartReducer = (state, action) => {
  if (!state) {
    state = { ...initialState };
  }

  let newState;
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      
      let updatedItems;
      if (existingItem) {
        // Update quantity if item exists
        updatedItems = state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: (item.quantity || 0) + 1 }
            : item
        );
      } else {
        // Add new item with quantity 1
        updatedItems = [...state.cart, { ...action.payload, quantity: 1 }];
      }

      newState = {
        ...state,
        cart: updatedItems
      };
      break;
    }

    case 'ADD_TO_WISHLIST': {
      const existingItem = state.wishlist.find(item => item.id === action.payload.id);
      
      if (!existingItem) {
        newState = {
          ...state,
          wishlist: [...state.wishlist, action.payload]
        };
      } else {
        newState = state;
      }
      break;
    }

    case 'REMOVE_FROM_WISHLIST':
      newState = {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload),
      };
      break;

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
        ...state,
        cart: [],
        isDiscountApplied: false,
        discountCode: null
      };
      break;

    case 'LOAD_STATE':
      newState = {
        ...initialState,
        ...action.payload,
        isDiscountApplied: action.payload.isDiscountApplied || false,
        discountCode: action.payload.discountCode || null
      };
      break;

    default:
      newState = state;
  }

  return newState;
};

// Main CartProvider Component
export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Server Synchronization
  const syncWithServer = useCallback(async (newState) => {
    if (!user) return;

    try {
      await fetch(`${API_URL}/api/cart`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(newState)
      });
    } catch (error) {
      console.error('Error syncing cart with server:', error);
    }
  }, [user]);

  // Storage Management
  const updateStorage = useCallback((newState) => {
    try {
      if (user) {
        // Logged-in users: localStorage + server sync
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('userCart', JSON.stringify(newState));
          syncWithServer(newState);
        }
      } else {
        // Guest users: sessionStorage only
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.setItem('guestCart', JSON.stringify(newState));
        }
      }
    } catch (error) {
      console.error('Storage error:', error);
    }
  }, [user, syncWithServer]);

  // Initial Cart Loading
  useEffect(() => {
    const loadCart = async () => {
      try {
        if (user) {
          // Try loading from server first
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
            // Fallback to localStorage
            const savedCart = localStorage.getItem('userCart');
            if (savedCart) {
              dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedCart) });
            }
          }
        } else {
          // Load from sessionStorage for guests
          if (typeof window !== 'undefined' && window.sessionStorage) {
            try {
              const savedCart = sessionStorage.getItem('guestCart');
              if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                if (parsedCart && typeof parsedCart === 'object') {
                  dispatch({ type: 'LOAD_STATE', payload: parsedCart });
                }
              }
            } catch (error) {
              console.error('Error loading cart from sessionStorage:', error);
            }
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

  // Storage Synchronization
  useEffect(() => {
    if (!loading) {
      updateStorage(state);
    }
  }, [state, user, loading, updateStorage]);

  // Guest Cart Cleanup
  useEffect(() => {
    if (!user) {
      const handleTabClose = () => {
        sessionStorage.removeItem('guestCart');
      };

      window.addEventListener('beforeunload', handleTabClose);
      return () => window.removeEventListener('beforeunload', handleTabClose);
    }
  }, [user]);

  // Loading Timeout
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return null;
  }

  return (
    <CartContext.Provider value={{ 
      state, 
      dispatch,
      clearCart: () => {
        dispatch({ type: 'CLEAR_CART' });
        if (!user) {
          sessionStorage.removeItem('guestCart');
        }
      }
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook for accessing cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
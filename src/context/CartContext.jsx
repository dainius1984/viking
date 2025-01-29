import React, { createContext, useContext, useReducer, useEffect, useState, useCallback } from 'react';
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
    state = { ...initialState };
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

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Handle storage updates with safety checks
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

  // Then define updateStorage which uses syncWithServer
  const updateStorage = useCallback((newState) => {
    try {
      if (user) {
        // For logged-in users, save to localStorage and sync with server
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('userCart', JSON.stringify(newState));
          syncWithServer(newState);
        }
      } else {
        // For unregistered users, use sessionStorage
        if (typeof window !== 'undefined' && window.sessionStorage) {
          sessionStorage.setItem('guestCart', JSON.stringify(newState));
        }
      }
    } catch (error) {
      // Handle cases where storage might be full or disabled
      console.error('Storage error:', error);
    }
  }, [user, syncWithServer]);

  // Load initial state
  useEffect(() => {
    const loadCart = async () => {
      try {
        if (user) {
          // For logged-in users
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
            // Fallback to localStorage if server fails
            const savedCart = localStorage.getItem('userCart');
            if (savedCart) {
              dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedCart) });
            }
          }
        } else {
          // For unregistered users, load from sessionStorage
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

  // Update storage whenever state changes
  useEffect(() => {
    if (!loading) {
      updateStorage(state);
    }
  }, [state, user, loading, updateStorage]);

  // Handle tab/window close for unregistered users
  useEffect(() => {
    if (!user) {
      const handleTabClose = () => {
        sessionStorage.removeItem('guestCart');
      };

      window.addEventListener('beforeunload', handleTabClose);
      return () => window.removeEventListener('beforeunload', handleTabClose);
    }
  }, [user]);

  // Prevent infinite loading
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

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

const API_URL = 'https://healthapi-zvfk.onrender.com'; // Update this to match your backend URL

const CartContext = createContext();

const cartReducer = (state, action) => {
  if (!state || !state.cart || !state.wishlist) {
    state = {
      cart: [],
      wishlist: []
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
      };
      break;

    case 'ADD_TO_WISHLIST':
      if (!state.wishlist.find(item => item.id === action.payload.id)) {
        newState = {
          ...state,
          wishlist: [...state.wishlist, action.payload]
        };
      } else {
        newState = state;
      }
      break;

    case 'REMOVE_FROM_WISHLIST':
      newState = {
        ...state,
        wishlist: state.wishlist.filter(item => item.id !== action.payload)
      };
      break;

    case 'LOAD_STATE':
      newState = action.payload;
      break;

    default:
      newState = state;
  }

  // Only sync with server for authenticated users and non-LOAD_STATE actions
  if (action.type !== 'LOAD_STATE') {
    fetch(`${API_URL}/api/cart`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newState)
    }).catch(error => {
      // Only log the error if it's not a 401 (unauthorized)
      if (!error.message.includes('401')) {
        console.error('Error syncing cart:', error);
      }
    });
  }

  return newState;
};

export const CartProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(cartReducer, { cart: [], wishlist: [] });

  // Load initial state from server
  useEffect(() => {
    fetch(`${API_URL}/api/cart`, {
      credentials: 'include'
    })
      .then(async response => {
        if (!response.ok) {
          // If unauthorized, just set loading to false and use local state
          if (response.status === 401) {
            setLoading(false);
            return null;
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data && (data.cart || data.wishlist)) {
          dispatch({ type: 'LOAD_STATE', payload: data });
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading cart:', error);
        setLoading(false);
      });
  }, []);

  // Show loading state only for a brief moment
  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 1000); // Set maximum loading time to 1 second

    return () => clearTimeout(timeout);
  }, []);

  if (loading) {
    return null; // Return null instead of loading message for better UX
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
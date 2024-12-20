import React, { createContext, useContext, useReducer, useEffect, useState } from 'react';

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

  // Sync with server whenever state changes
  fetch('/api/cart', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newState)
  }).catch(error => console.error('Error syncing cart:', error));

  return newState;
};

export const CartProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useReducer(cartReducer, { cart: [], wishlist: [] });

  // Load initial state from server
  useEffect(() => {
    fetch('/api/cart', {
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        if (data && (data.cart || data.wishlist)) {
          dispatch({ type: 'LOAD_STATE', payload: data });
        }
      })
      .catch(error => console.error('Error loading cart:', error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading cart...</div>;
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
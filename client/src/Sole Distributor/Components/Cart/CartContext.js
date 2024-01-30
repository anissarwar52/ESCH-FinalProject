import React, { createContext, useReducer, useContext,useEffect } from 'react';

const CartContext = createContext();

const getLocalCartData = () => {
  let myCartData = localStorage.getItem("mycart");
  if (myCartData === null) {
    return [];
  } else {
    // Check if JSON.parse(myCartData) is null, and if so, return an empty array
    const parsedData = JSON.parse(myCartData);
    return parsedData === null ? [] : parsedData;
  }
};



const initialState = {
  // cart: [],
  cart: getLocalCartData(),
  totalAmount: 0,
  totalItem: 0
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
  const existingItem = state.cart.find(item => item._id === action.payload._id);

  if (existingItem) {
    // If the item is already in the cart, increase its quantity by 1
    const updatedCart = state.cart.map(item => {
      if (item._id === existingItem._id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });

    return { ...state, cart: updatedCart };
  } else {
    // If the item is not in the cart, add it to the cart
    return { ...state, cart: [...state.cart, { ...action.payload, quantity: 1 }] };
  }
    case 'REMOVE_FROM_CART':
      const updatedCartRemove = state.cart.filter(item => item._id !== action.payload._id);
      return { ...state, cart: updatedCartRemove };
    case 'CLEAR_ITEM':
      return { ...state, cart: [] };
      case 'INCREMENT':
        let updatedCartIncrement = state.cart.map((currElem) => {
          if (currElem._id === action.payload._id) { // Match by ID
            return { ...currElem, quantity: currElem.quantity + 1 };
          }
          return currElem;
        });
        return { ...state, cart: updatedCartIncrement };
      case 'DECREMENT':
        let updatedCartDecrement = state.cart
          .map((currElem) => {
            if (currElem._id === action.payload._id) { // Match by ID
              return { ...currElem, quantity: currElem.quantity - 1 };
            }
            return currElem;
          })
          .filter((currElem) => currElem.quantity !== 0);
        return { ...state, cart: updatedCartDecrement };

      case 'GET_TOTAL':
        let {totalItem,totalAmount} = state.cart.reduce((accum, curVal) => {
          let {price,quantity} = curVal;
          let updatedTotalAmount = price * quantity;
          accum.totalAmount += updatedTotalAmount;
          accum.totalItem += quantity;
          return accum;
         },
         {
              totalItem:0,
              totalAmount:0
         });
         return {...state, totalItem, totalAmount};
    default:
      return state;
  }
};




export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    dispatch({ type: "GET_TOTAL" });
  }, [state.cart]);

  useEffect(() => {
    localStorage.setItem("mycart", JSON.stringify(state.cart));
  }, [state.cart]);

  const clearItem = () => {
    dispatch({ type: "CLEAR_ITEM" });
  };

  return (
    <CartContext.Provider value={{ cart: state.cart, totalAmount: state.totalAmount, totalItem: state.totalItem, dispatch, clearItem }}>
      {children}
    </CartContext.Provider>
  );
};
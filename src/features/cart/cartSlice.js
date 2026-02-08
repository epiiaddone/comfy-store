import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const defaultState = {
  cartItems: [],
  numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};

const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem('cart')) || defaultState;
};


const cartSlice = createSlice({
  name: 'cart',
  initialState: defaultState,
  reducers: { //defines the actions that can be performed on the cart
    
    addItem: (state, action) => {
      const { product } = action.payload;
      //console.log("addItem", product)
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      if (item) { //item in the cart
        item.amount += product.amount;
      } else { //new item to cart
        state.cartItems.push(product);
      }
      //mutating the state object directly as redux Toolkit uses Immer
      state.numItemsInCart += product.amount;
      state.cartTotal += product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);

      //doesn't throw an error
      //wrapping in try catch wont work
      //This call is running outside react - before hydration
      //redux reducers must be pure - no side effects
      //toast.success('Item added to cart');

      
    },
    clearCart: (state) => {
      //reducers shouldnt create side effects
      //this is bad
      localStorage.setItem('cart', JSON.stringify(defaultState));

      //this is this a return and not state = defaultState because redux Toolkit uses Immer
      //Immer allows mutation e.g. state.cartTotal = 25
      //but state = newState does nothing
      return defaultState;
    },

    removeItem: (state, action) => {
      const { cartID } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);
      if (!product){
        console.log("error:61ae8e16-0486-4033-812e-fe2feb1916cb")
        return;
      } 
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.numItemsInCart -= product.amount;
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);

      //toast.error('Item removed from cart');
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      if (!item){
        console.log("error:a4137ca4-a13f-450f-9a37-1783b20724ef")
        return;
      }
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      //toast.success('Cart updated');
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem('cart', JSON.stringify(state));
    },
  },
});

export const { addItem, removeItem, editItem, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
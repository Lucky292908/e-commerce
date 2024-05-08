import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, Product, UpdateCartItemPayload } from '../components/types';

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action: PayloadAction<Product[]>) {
      state.cartItems = action.payload;
    },
    updateCartItemQuantity(state, action: PayloadAction<UpdateCartItemPayload>) {
      const { productId, newQuantity } = action.payload;
      const itemToUpdate = state.cartItems.find((item) => item.id === productId);
      if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity;
      }
    },
    removeCartItem(state, action: PayloadAction<number>) {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setCartItems, updateCartItemQuantity, removeCartItem } = cartSlice.actions;

export default cartSlice.reducer;

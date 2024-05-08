import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { Product } from '../components/types';

interface WishlistState {
  wishlistItems: Product[];
}

const initialState: WishlistState = {
  wishlistItems: [],
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist(state, action: PayloadAction<{ product: Product }>) {
      const { product } = action.payload;
      if (!state.wishlistItems.some((item) => item.id === product.id)) {
        state.wishlistItems.push(product);
      }
    },
    removeFromWishlist(state, action: PayloadAction<{ productId: number }>) {
      const { productId } = action.payload;
      state.wishlistItems = state.wishlistItems.filter((item) => item.id !== productId);
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;

export const selectWishlistItems = (state: RootState) => state.wishlist.wishlistItems;

export default wishlistSlice.reducer;

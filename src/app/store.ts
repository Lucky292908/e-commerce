import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import wishlistReducer from '../features/wishlistSlice';

const store = configureStore({
  reducer: {
    wishlist: wishlistReducer,
    // Add other reducers here if needed
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export default store;

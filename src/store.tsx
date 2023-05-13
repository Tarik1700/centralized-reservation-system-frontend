import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/userSlice';
import restaurantsReducer from './features/restaurants/restaurantSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    restaurants: restaurantsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

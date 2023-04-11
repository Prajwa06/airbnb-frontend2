import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import pageReducer from '../features/pageSlice';
import placeReducer from '../features/placeSlice'

export const store = configureStore({
  reducer: {
    user: userReducer,
    page: pageReducer,
    place:placeReducer,
    
  },
});

import { IRootState } from '@/interfaces';
import { configureStore } from '@reduxjs/toolkit';
import { authInitState, authSlice } from './auth/authSlice';

const initialState : IRootState = { 
  auth: authInitState
}

const store = configureStore({
  reducer: {
    auth: authSlice.reducer
  },
  preloadedState: initialState

});

export default store;


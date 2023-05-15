import { AuthStatus, IRootState } from '@/interfaces';
import { configureStore } from '@reduxjs/toolkit';
import { authInitState, authSlice } from './auth/authSlice';
import { chatSlice } from './chat';

const initialState : IRootState = { 
  auth: authInitState
}

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    chat: chatSlice.reducer,
  },
  preloadedState: initialState

});

store.subscribe(() => {
  const state = store.getState();

  if(state.auth.status === AuthStatus.Auth && state.auth.token){
    localStorage.setItem('x-token', state.auth.token);
  }

  if(state.auth.status === AuthStatus.LoggedOut){
    localStorage.removeItem('x-token');
  }

  if(localStorage.getItem('last-contact') !== null && state.chat.selectedContact?.contactId){
    localStorage.setItem('last-contact', state.chat.selectedContact?.contactId);
  }

});

export default store;


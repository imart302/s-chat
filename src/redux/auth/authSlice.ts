import { AuthStatus, IAuthState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { setLoggedUserCaseReducer, setStatusCaseReducer } from "./reducers";
import { buildStartCreateUserNative, buildStartLoginNative, buildStartRefreshToken } from "./thunks";


const initialState: IAuthState = {
  status: AuthStatus.NoAuth,
  user: null,
  creationStatus: null,
  errors: null,
  token: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAction: setLoggedUserCaseReducer,
    setStatusAction: setStatusCaseReducer,
    doLogout: (state) => {
      state.status = AuthStatus.LoggedOut;
    },
    resetAuth: (state) => {
      state.status = AuthStatus.NoAuth;
      state.token = null;
      state.errors = null;
      state.user = null;
    },
    resetCreate: (state) => {
      state.creationStatus = null;
    }
  },

  extraReducers: (builder) => {
    buildStartCreateUserNative(builder);
    buildStartLoginNative(builder);
    buildStartRefreshToken(builder);
  }

});

export const authInitState = authSlice.getInitialState();
export const { setStatusAction, setUserAction, doLogout, resetAuth, resetCreate } = authSlice.actions;

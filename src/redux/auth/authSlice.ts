import { AuthStatus, IAuthState } from "@/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import { setLoggedUserCaseReducer, setStatusCaseReducer } from "./reducers";


const initialState: IAuthState = {
  status: AuthStatus.NoAuth,
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserAction: setLoggedUserCaseReducer,
    setStatusAction: setStatusCaseReducer,
  },

  extraReducers: (builder) => {

  }

});

export const authInitState = authSlice.getInitialState();
export const { setStatusAction, setUserAction } = authSlice.caseReducers;

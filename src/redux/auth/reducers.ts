import { AuthStatus, IAuthState, IAuthUser } from "@/interfaces";
import { CaseReducer, PayloadAction } from "@reduxjs/toolkit";


export const setStatusCaseReducer : CaseReducer<IAuthState, PayloadAction<AuthStatus>> = (state, action) => {
  state.status = action.payload;
}

export const setLoggedUserCaseReducer : CaseReducer<IAuthState, PayloadAction<IAuthUser>> = (state, action) => {
  state.user = action.payload;
}


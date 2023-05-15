import { createUser, googleSingIn, login, refreshToken } from '@/api';
import {
  AuthStatus,
  CreationStatus,
  GoogleCredentialResponse,
  IAuthState,
  ICreateUserBody,
  ILoginBody,
  IUserCreateResponse,
  IUserLoginResponse,
} from '@/interfaces';
import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';

export const startCreateUserNative = createAsyncThunk<
  IUserCreateResponse,
  ICreateUserBody
>('auth/createNative', async (user) => {
  const resp = await createUser(user);
  console.log(resp);
  return resp;
});

export const buildStartCreateUserNative = (
  builder: ActionReducerMapBuilder<IAuthState>
) => {
  builder.addCase(startCreateUserNative.pending, (state) => {
    state.creationStatus = CreationStatus.Creating;
  });

  builder.addCase(startCreateUserNative.fulfilled, (state) => {
    state.creationStatus = CreationStatus.Success;
    if (state.errors) {
      state.errors = {
        ...state.errors,
        creating: null,
      };
    }
  });

  builder.addCase(startCreateUserNative.rejected, (state, action) => {
    state.creationStatus = CreationStatus.Failed;
    if (state.errors) {
      state.errors = {
        ...state.errors,
        creating: action.error.message ?? 'Unknown error',
      };
    } else {
      state.errors = {
        creating: action.error.message ?? 'Unknown error',
        signIn: null,
      };
    }
  });
};

export const startLoginNative = createAsyncThunk<
  IUserLoginResponse,
  ILoginBody
>('auth/login', async (user) => {
  const resp = await login(user);
  return resp;
});

export const buildStartLoginNative = (
  builder: ActionReducerMapBuilder<IAuthState>
) => {
  builder.addCase(startLoginNative.pending, (state) => {
    state.status = AuthStatus.LoginIn;
  });

  builder.addCase(startLoginNative.fulfilled, (state, action) => {
    state.status = AuthStatus.Auth;
    state.user = action.payload.user;
    state.token = action.payload.token;
  });

  builder.addCase(startLoginNative.rejected, (state, action) => {
    state.status = AuthStatus.NoAuth;
    if (state.errors) {
      state.errors = {
        ...state.errors,
        signIn: action.error.message ?? 'Unknown error',
      };
    } else {
      state.errors = {
        creating: null,
        signIn: action.error.message ?? 'Unknown error',
      };
    }
  });
};

export const startRefreshToken = createAsyncThunk<IUserLoginResponse, void>(
  'auth/refresh',
  async () => {
    const resp = await refreshToken();
    return resp;
  }
);

export const buildStartRefreshToken = (
  builder: ActionReducerMapBuilder<IAuthState>
) => {
  builder.addCase(startRefreshToken.pending, (state) => {
    state.status = AuthStatus.Checking;
  });

  builder.addCase(startRefreshToken.fulfilled, (state, action) => {
    state.status = AuthStatus.Auth;
    state.user = action.payload.user;
    state.token = action.payload.token;
  });

  builder.addCase(startRefreshToken.rejected, (state) => {
    state.status = AuthStatus.NoAuth;
    state.token = null;
  });
};

export const startGoogleSignIn = createAsyncThunk<IUserLoginResponse, string>(
  'auth/google',
  async (googleToken) => {
    const resp = await googleSingIn(googleToken);
    return resp;
  }
);

export const buildStartGoogleSingIn = (
  builder: ActionReducerMapBuilder<IAuthState>
) => {
  builder.addCase(startGoogleSignIn.pending, (state) => {
    state.status = AuthStatus.Checking;
  });

  builder.addCase(startGoogleSignIn.fulfilled, (state, action) => {
    state.status = AuthStatus.Auth;
    state.user = action.payload.user;
    state.token = action.payload.token;
  });

  builder.addCase(startGoogleSignIn.rejected, (state) => 
  {
    state.status = AuthStatus.NoAuth;
    state.token = null;
  });
};

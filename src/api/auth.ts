import { chatApi } from './chatApi';
import {
  ICreateUserBody,
  ILoginBody,
  IUserCreateResponse,
  IUserLoginResponse,
} from '@/interfaces';

export const createUser = async (user: ICreateUserBody) => {
  const resp = await chatApi.post('/auth/create', user);
  console.log(resp);
  return resp.data as IUserCreateResponse;
};

export const login = async (user: ILoginBody) => {
  const resp = await chatApi.post('/auth', user);
  return resp.data as IUserLoginResponse;
};

export const refreshToken = async () => {
  const resp = await chatApi.get('/auth');
  return resp.data as IUserLoginResponse;
};

export const googleSingIn = async (token: string) => {
  const resp = await chatApi.post('auth/google', { access_token: token });
  return resp.data as IUserLoginResponse;
};

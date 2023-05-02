
export enum AuthStatus {
  'Auth',
  'NoAuth',
  'Checking'
}

export interface IAuthUser {
  username: string;
  email: string;
  id: string;
} 

export interface IAuthState {
  status: AuthStatus,
  user: null | IAuthUser 
}

export interface IRootState {
  auth: IAuthState
}
// actions
export const LOGOUT_USER = 'LOGOUT_USER';
export const LOGIN_USER = 'LOGIN_USER';

export interface Auth{
  email?: string,
  token: string;
  userId: string;
  tokenExpiration: number;
}

export interface LogoutUserAction{
  type: typeof LOGOUT_USER;
}

export interface LoginUserAction{
  type: typeof LOGIN_USER;
  auth: Auth;
}

export type AuthActionTypes = 
  | LogoutUserAction 
  | LoginUserAction;
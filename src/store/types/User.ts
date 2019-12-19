// actions
export const CREATE_USER = 'CREATE_USER';
export const READ_USER = 'READ_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const FETCH_USER = 'FETCH_USER';

export interface User{
  _id: string;
  name?: string;
  email?: string;
}

export interface CreateUserAction{
  type: typeof CREATE_USER;
  user: User;
}

export interface ReadUserAction{
  type: typeof READ_USER;
  user: User;
}

export interface UpdateUserAction{
  type: typeof UPDATE_USER;
  user: User;
}

export interface DeleteUserAction{
  type: typeof DELETE_USER;
  id: string;
}

export interface FetchUserAction{
  type: typeof FETCH_USER;
  user: User[];
}

export type UserActionTypes = 
  | CreateUserAction 
  | ReadUserAction 
  | UpdateUserAction 
  | DeleteUserAction 
  | FetchUserAction;
import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
// i18n
import i18n from '../../i18n';
// store
import { Auth, LOGIN_USER, LOGOUT_USER } from '../types/Auth';
import { AppActions } from '../types';
import { AppState } from '..';
// hoc
import Axios from '../../core/Axios';
// form
import { IValues } from '../../core/Form';
import { User } from '../types/User';

export const logoutUser = (): AppActions => ({
  type: LOGOUT_USER,
});

export const loginUser = (auth: Auth): AppActions => ({
  type: LOGIN_USER,
  auth: auth
});

export const onLogoutUser = () => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    dispatch(logoutUser());
    localStorage.removeItem('token');
    localStorage.removeItem('expiryDate');
    localStorage.removeItem('userId');
  }
}

export const onAutoLoginUser = () => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const token: string = (localStorage.getItem('token') as string);
    const userId: string = (localStorage.getItem('userId') as string);
    const expiryDate: string = (localStorage.getItem('expiryDate') as string);

    const requestBody = {
      query: `
        query ReadUser($id: ID!){
          readUser(input: {_id: $id}){
            email
          }
        }
      `,
      variables: {
        id: userId
      }
    };

    const authUser: Auth = {
      token: token,
      userId: userId,
      tokenExpiration: 1
    };
    dispatch(loginUser({...authUser}));

    const remainingMilliseconds: number = new Date(expiryDate).getTime() - new Date().getTime();
    setTimeout(() => { dispatch(logoutUser()) }, remainingMilliseconds);

    try{
      const res: AxiosResponse<any> = await Axios.post('/graphql', requestBody, {
        headers: {
          Authorization: 'Bearer ' + token,
          'Accept-Language': i18n.language
        }
      });
      
      if(res){
        const user: User = res.data.data.readUser;
        authUser.email = user.email;
        dispatch(loginUser({...authUser}));
      }else{
        dispatch(logoutUser());
      }
    }catch(err){
      dispatch(logoutUser());
      throw err;
    }
  }
}

export const onLoginUser = (values: IValues) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState): Promise<boolean> => {
    const requestBody = {
      query: `
        query Login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            email
            userId
            token
            tokenExpiration
          }
        }
      `,
      variables: {
        email: values.email,
        password: values.password
      }
    };

    try{
      const res: AxiosResponse<any> = await Axios.post('/graphql', requestBody, {
        headers: {
          'Accept-Language': i18n.language
        }
      });
  
      if(res){
        const authUser: Auth = res.data.data.login;
        const remainingMilliseconds: number = 60 * 60 * 1000;
        const expiryDate: Date = new Date(new Date().getTime() + remainingMilliseconds);
        dispatch(loginUser({...authUser}))

        localStorage.setItem('token', authUser.token);
        localStorage.setItem('userId', authUser.userId);
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        setTimeout(() => { dispatch(logoutUser()) }, remainingMilliseconds);
        return true;
      }
    }catch(err){
      throw err;
    }
    return false;
  }
}
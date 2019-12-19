import { Dispatch } from 'redux';
import { AxiosResponse } from 'axios';
// i18n
import i18n from '../../i18n';
// store
import { User, CREATE_USER, READ_USER, UPDATE_USER, DELETE_USER, FETCH_USER } from '../types/User';
import { AppActions } from '../types';
import { AppState } from '..';
import Axios from '../../core/Axios';
// hoc
import { IValues } from '../../core/Form';

export const createUser = (user: User): AppActions => ({
  type: CREATE_USER,
  user: user
});

export const readUser = (user: User): AppActions => ({
  type: READ_USER,
  user: user
});

export const updateUser = (user: User): AppActions => ({
  type: UPDATE_USER,
  user: user
});

export const deleteUser = (id: string): AppActions => ({
  type: DELETE_USER,
  id: id
});

export const fetchUser = (user: User[]): AppActions => ({
  type: FETCH_USER,
  user: user
});

export const onSignupUser = (values: IValues) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const requestBody = {
      query: `
        mutation CreateUser($email: String!, $password: String!) {
          createUser(input: {email: $email, password: $password}) {
            _id
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
        return true;
      }
    }catch(err){
      throw err;
    }
    return false;
  }
}

export const onReadUser = (id: string) => {
  return async (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
    const requestBody = {
      query: `
        query ReadUser($id: ID!){
          readUser(input: {_id: $id}){
            _id
            name
            email
            role
            status
          }
        }
      `,
      variables: {
        id: id,
      }
    };

    try{
      const res: AxiosResponse<any> = await Axios.post('/graphql', requestBody, {
        headers: {
          'Accept-Language': i18n.language
        }
      });
  
      if(res){
        const user: User = res.data.data.readUser;
        dispatch(readUser({ _id: user._id, name: user.name }));
      }
    }catch(err){
      throw err;
    }
  }
}

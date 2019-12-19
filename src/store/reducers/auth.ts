import { Auth, AuthActionTypes } from '../types/Auth';

const initialState: Auth = {
  email: undefined,
  token: '',
  userId: '',
  tokenExpiration: 0
}

const authReducer = (state = initialState, action: AuthActionTypes): Auth => {
  switch(action.type){
    case 'LOGIN_USER':
      return {
        ...state,
        ...action.auth
      }
    case 'LOGOUT_USER':
      return {
        ...state,
        email: undefined,
        token: '',
        userId: '',
        tokenExpiration: 0
      }
    default:
      return state;
  }
}
export { authReducer }
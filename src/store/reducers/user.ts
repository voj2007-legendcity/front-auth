import { User, UserActionTypes } from '../types/User';

const initialState: User = {
  _id: '',
}

const userReducer = (state = initialState, action: UserActionTypes): User => {
  switch(action.type){
    case 'CREATE_USER':
      return {
        ...state,
        ...action.user
      }
    case 'READ_USER':
      return {
        ...state,
        ...action.user
      }
    default:
      return state;
  }
}
export { userReducer }
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk, { ThunkMiddleware } from "redux-thunk";
import { AppActions } from './types';
// reducers
import { userReducer } from './reducers/user';
import { authReducer } from './reducers/auth';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer
});

export type AppState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk as ThunkMiddleware<AppState, AppActions>)));
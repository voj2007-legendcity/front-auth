import { Home, Contact } from '../../components/public';
import Login from '../../components/blocks/auth/Login';
import Signup from '../../components/blocks/auth/Signup';

export type PublicRouteComponentTypes = 
  | typeof Home 
  | typeof Contact 
  | typeof Login
  | typeof Signup;
  
export type PublicRouteTypes = {
  component: PublicRouteComponentTypes,
  path: string
}

export default {
  Home: {
    component: Home,
    path: '/'
  },
  Contact: {
    component: Contact,
    path: '/contact'
  },
};
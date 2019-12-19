import { Profile, Post, Posts} from '../../components/private';

export type PrivateRouteComponentTypes = 
  | typeof Profile 
  | typeof Post 
  | typeof Posts;
  
export type PrivateRouteTypes = {
  component: PrivateRouteComponentTypes,
  path: string
}

export default {
  Profile: {
    component: Profile,
    path: '/profile'
  },
  Posts: {
    component: Posts,
    path: '/profile/posts'
  },
  Post:{
    component: Post,
    path: '/profile/posts/:idPost'
  }
};
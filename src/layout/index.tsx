import React, { Component } from 'react';
import { connect } from 'react-redux';
import { StaticContext } from 'react-router';
import { BrowserRouter, Route, Switch, Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import _ from 'lodash';
// layouts
import PrivateLayout from './private';
import PublicLayout from './public';
// routes
import privateRoutes, { PrivateRouteTypes } from './routes/privateRoutes';
import publicRoutes,  { PublicRouteTypes }  from './routes/publicRoutes';
import sessionRoutes from './routes/sessionRoutes';
// components
import Login from '../components/blocks/auth/Login';
import NotFound from './public/NotFound';
// store
import { AppState } from '../store';
import { Auth } from '../store/types/Auth';
import { AppActions } from '../store/types';
import { onLogoutUser, onAutoLoginUser } from '../store/actions/auth';
// hoc
import WithErrorHandler from '../hoc/WithErrorHandler';
import Axios from '../core/Axios';

interface ILayoutProps {}
interface ILayoutState {}

type Props = ILayoutProps & IMapStateToProps & IMapDispatchToProps;

class Layout extends Component<Props, ILayoutState> {

  componentDidMount(){
    const token: string | null = localStorage.getItem('token');
    const expiryDate: string | null = localStorage.getItem('expiryDate');

    if(token && expiryDate){
      if (new Date(expiryDate) <= new Date()) {
        this.props.onLogoutUser();
        return;
      }
      this.props.onAutoLoginUser();
    }
  }

  render() {
    const authUser: Auth = this.props.auth;

    return (
      <React.Fragment>
        <BrowserRouter>
          <Switch>

            { _.map(publicRoutes, (route: PublicRouteTypes, key: string) => {
              const { component, path } = route;
              return (
                <Route
                  exact
                  path={path}
                  key={key}
                  render={ (route: RouteComponentProps<any, StaticContext, any>) => <PublicLayout component={component} route={route} auth={authUser}/>}
                />
              )
            }) }

            { _.map(privateRoutes, (route: PrivateRouteTypes, key: string) => {
              const { component, path } = route;
              return (
                <Route
                  exact
                  path={path}
                  key={key}
                  render={ (route: RouteComponentProps<any, StaticContext, any>) =>
                    authUser.token ? (
                    <PrivateLayout component={component} route={route} auth={authUser} />
                    ) : (
                    <PublicLayout component={Login} route={route} auth={authUser}/>
                    )
                  }
                />
              )
            }) }

            { _.map(sessionRoutes, (route: PublicRouteTypes, key: string) => {
                const { component, path } = route;
                return (
                  <Route
                    exact
                    path={path}
                    key={key}
                    render={ (route: RouteComponentProps<any, StaticContext, any>) =>
                      authUser.token ? (
                        <Redirect to="/profile"/>
                      ) : (
                        <PublicLayout component={component} route={route} auth={authUser}/>
                      )
                    }
                  />
                )
            }) }

            <Route component={ NotFound } />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

interface IMapStateToProps{
  auth: Auth;
}
interface IMapDispatchToProps{
  onLogoutUser: () => void;
  onAutoLoginUser: () => void;
}

const mapStateToProps = (state: AppState, ownpProps: ILayoutProps): IMapStateToProps => ({
  auth: state.auth,
})
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownpProps: ILayoutProps): IMapDispatchToProps => ({
  onLogoutUser: bindActionCreators(onLogoutUser, dispatch),
  onAutoLoginUser: bindActionCreators(onAutoLoginUser, dispatch),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(Layout, Axios)));

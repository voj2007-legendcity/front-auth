import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
// types
import { PrivateRouteComponentTypes } from '../routes/privateRoutes';
// store
import { Auth } from '../../store/types/Auth';
// hoc
import Aux from '../../hoc/Aux';
// component
import Header from '../../components/private/blocks/header/Header';

interface IPrivateLayoutProps {
  component: PrivateRouteComponentTypes
  route: RouteComponentProps<any, StaticContext, any>;
  auth: Auth;
}
interface IPrivateLayoutState {}

type Props = IPrivateLayoutProps;

export default class PrivateLayout extends Component<Props, IPrivateLayoutState> {
  render() {
    const Component = this.props.component;
    const route = this.props.route;
    
    return (
      <Aux>
        <main>
          <Header {...this.props} />
          <Component route={route}/>
        </main>
      </Aux>
    );
  }
}
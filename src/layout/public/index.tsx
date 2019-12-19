import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { StaticContext } from 'react-router';
// types
import { PublicRouteComponentTypes } from '../routes/publicRoutes';
// store
import { Auth } from '../../store/types/Auth';
// hoc
import Aux from '../../hoc/Aux';
// components
import Header from '../../components/public/blocks/header/Header';

interface IPublicLayoutProps {
  component: PublicRouteComponentTypes
  route: RouteComponentProps<any, StaticContext, any>;
  auth: Auth;
}
interface IPublicLayoutState {}

type Props = IPublicLayoutProps;

export default class PublicLayout extends Component<Props, IPublicLayoutState> {

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
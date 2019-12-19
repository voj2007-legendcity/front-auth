import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// styles
import './Header.css';
// store
import { Auth } from '../../../../store/types/Auth';
// i18
import { Trans, Translation } from 'react-i18next';
// component
import Logout from '../../../blocks/auth/Logout';

interface IHeaderProps {
  auth: Auth;
}
interface IHeaderState {}

type Props = IHeaderProps;

export default class Header extends Component<Props, IHeaderState> {
  render(){
    return(
      <Translation>
        {
          (t) => (
          <header>
            <div className="bl-private-header">
              <div className="container">
                <div className="row h-100 align-items-center">
                  <div className="col-8 col-md-6">
                  <div className="user-info">
                    <Trans 
                      i18nKey="GREETING"
                      values={{email: this.props.auth.email}}
                      components={[<strong>univers</strong>]}
                      />
                  </div>
                  </div>
                  <div className="col-4 col-md-6 text-right">
                    <div className="menu">
                      <span className="link d-none d-sm-inline-block">
                      <ul className="list-inline mb-0">
                        <li className="list-inline-item"><Link to='/'><Trans i18nKey="MENU.GOHOME" /></Link></li>
                        <li className="list-inline-item"><Link to='/profile/posts'><Trans i18nKey="MENU.POSTS" /></Link></li>
                        <li className="list-inline-item"><Logout /></li>
                      </ul>
                      </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        )
      }
    </Translation>
    );
  }
}
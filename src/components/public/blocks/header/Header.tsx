import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import i18n from '../../../../i18n';
// styles
import './Header.css';
// store
import { Auth } from '../../../../store/types/Auth';
import Logout from '../../../blocks/auth/Logout';
// i18
import { Trans, Translation } from 'react-i18next';
import Button from '../../../ui/button/Button';

interface IHeaderProps {
  auth: Auth;
}
interface IHeaderState {}

type Props = IHeaderProps;

export default class Header extends Component<Props, IHeaderState> {

  switchLang = () => {
    i18n.changeLanguage(i18n.languages.filter(lang => lang !== i18n.language)[0]);
  }

  render(){
    return(
      <Translation>
        {
          (t) => (
            <header>
              <div className="bl-header transition-fast">
                <div className="container">
                  <div className="row h-100 align-items-center">
                    <div className="col-8 col-md-6">
                      <a className="logo" href="/">LOGO</a>
                    </div>
                    <div className="col-4 col-md-6 text-right">
                      <div className="menu">
                        <span className="link d-none d-sm-inline-block">
                        <div className="user-info mb-3 d-flex justify-content-end align-items-center">
                          { this.props.auth.token &&
                          <div className="user">
                            <Trans 
                              i18nKey="GREETING"
                              values={{email: this.props.auth.email}}
                              components={[<strong>univers</strong>]}
                              />
                          </div>
                          }
                          <div className="lang ml-3">
                            <Button btnClass="btn btn-light btn-sm" click={this.switchLang}><Trans>LANG</Trans></Button>
                          </div>
                        </div>
                        <ul className="list-inline mb-0">
                          <li className="list-inline-item"><Link to='/'><Trans i18nKey="MENU.HOME" /></Link></li>
                          <li className="list-inline-item"><Link to='/contact'><Trans i18nKey="MENU.CONTACTS" /></Link></li>
                          { this.props.auth.token ? 
                            (
                              <React.Fragment>
                                <li className="list-inline-item"><Link to='/profile'><Trans i18nKey="MENU.PROFILE" /></Link></li>
                                <li className="list-inline-item"><Logout /></li>
                              </React.Fragment>
                            ):(
                              <li className="list-inline-item"><Link className="btn btn-dark btn-sm text-white" to='/login'><Trans i18nKey="MENU.LOGIN" /></Link></li>
                            )
                          }
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
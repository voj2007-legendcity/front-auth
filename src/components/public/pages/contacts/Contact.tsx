import React, { Component } from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
// i18
import { Trans, Translation } from 'react-i18next';

interface IContactProps {
  route: RouteComponentProps<any, StaticContext, any>;
}
interface IContactState {}

type Props = IContactProps;

class Contact extends Component<Props, IContactState> {
  render(){
    return(
      // В реальном проекте этого не будет, на этом месте будут подключаться разные компоненты как блоки страницы
      <Translation>
        {
          (t) => (
          <div className="bl-contacts">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Trans i18nKey="PAGE.CONTACTS" />
                </div>
              </div>
            </div>
          </div>
          )
        }
      </Translation>
    );
  }
}
export default Contact;
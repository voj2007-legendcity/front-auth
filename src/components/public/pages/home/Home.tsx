import React, { Component } from 'react';
import { RouteComponentProps, StaticContext } from 'react-router';
// i18
import { Trans, Translation } from 'react-i18next';

interface IHomeProps {
  route: RouteComponentProps<any, StaticContext, any>;
}
interface IHomeState {}

type Props = IHomeProps;

class Home extends Component<Props, IHomeState> {
  render(){
    return(
      // В реальном проекте этого не будет, на этом месте будут подключаться разные компоненты как блоки страницы
      <Translation>
        {
          (t) => (
          <div className="bl-home">
            <div className="container">
              <div className="row">
                <div className="col-12">
                  <Trans i18nKey="PAGE.HOME" />
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
export default Home;
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
// store
import { AppActions } from '../../../store/types';
import { onLogoutUser } from '../../../store/actions/auth';
// ui
import Button from '../../ui/button/Button';
// i18
import { Trans, Translation } from 'react-i18next';

interface ILogoutProps {}
interface ILogoutState {}

type Props = ILogoutProps & IMapDispatchToProps;

class Logout extends Component<Props, ILogoutState> {

  render() {
    return (
      <Translation>
        {
          (t) => (
          <React.Fragment>
            <Button btnClass="btn btn-danger btn-sm" click={this.props.onLogoutUser}><Trans i18nKey="LOGOUT" /></Button>
          </React.Fragment>
          )
        }
      </Translation>
    );
  }
}
interface IMapDispatchToProps{
  onLogoutUser: () => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownpProps: ILogoutProps): IMapDispatchToProps => ({
  onLogoutUser: bindActionCreators(onLogoutUser, dispatch)
});
export default connect(null, mapDispatchToProps)(Logout);
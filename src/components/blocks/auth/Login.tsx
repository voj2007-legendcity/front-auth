import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';
// hoc
import WithBlockWrapper from '../../../hoc/WithBlockWrapper';
// form
import { required, isEmail, minLength } from "../../../core/Validation";
import { Form, IValues } from "../../../core/Form";
import { Field, IFields } from "../../../core/Field";
// store
import { AppActions } from '../../../store/types';
import { onLoginUser } from '../../../store/actions/auth';
// styles
import './Auth.css';
// i18
import { Trans, Translation } from 'react-i18next';

interface ILoginProps {}
interface ILoginState {
  fields: IFields
}

type Props = ILoginProps & IMapDispatchToProps;

class Login extends Component<Props, ILoginState> {

  constructor(props: Props) {
    super(props);
    
    this.state = {
      fields: {
        email: {
          id: "email",
          placeholder: "EMAIL",
          validation: [
            { rule: required }, 
            { rule: isEmail }
          ]
        },
        password: {
          id: "password",
          placeholder: "PASSWORD",
          editor: "password",
          validation: [
            { rule: required }, 
            { rule: minLength, args: { length: 6 } }
          ]
        }
      }
    };
  }

  render() {
    return (
      <Translation>
        {
          (t) => (
          <div className="col-12">
            <div className="form-container mx-auto">
            <h5 className="mb-4 text-center"><Trans i18nKey="AUTH" /></h5>
            <Form
              submit={this.props.onLoginUser}
              btnText="ENTER"
              fields={this.state.fields}>
              <React.Fragment>
                <Field {...this.state.fields.email} />
                <Field {...this.state.fields.password} />
              </React.Fragment>
            </Form>
            <Link to='/signup'><Trans i18nKey="MENU.REGISTRATION" /></Link>
            </div>
          </div>
          )
        }
      </Translation>
    );
  }
}
interface IMapDispatchToProps{
  onLoginUser: (values: IValues) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownpProps: ILoginProps): IMapDispatchToProps => ({
  onLoginUser: bindActionCreators(onLoginUser, dispatch)
});
export default connect(null, mapDispatchToProps)(WithBlockWrapper(Login, 'bl-auth'));
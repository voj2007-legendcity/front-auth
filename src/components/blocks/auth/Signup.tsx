import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';
// hoc
import WithBlockWrapper from '../../../hoc/WithBlockWrapper';
// form
import { required, isEmail, minLength, compare } from "../../../core/Validation";
import { Form, IValues } from "../../../core/Form";
import { Field, IFields } from "../../../core/Field";
// store
import { AppActions } from '../../../store/types';
import { onSignupUser } from '../../../store/actions/user';
// styles
import './Auth.css';
// i18
import { Trans, Translation } from 'react-i18next';

interface ISignupProps {}
interface ISignupState {
  fields: IFields;
}

type Props = ISignupProps & IMapDispatchToProps;

class Signup extends Component<Props, ISignupState> {

  constructor(props: Props) {
    super(props);
    
    this.state = {
      fields: {
        email: {
          id: "email",
          placeholder: "EMAIL",
          validation: [
            { rule: isEmail }, 
            { rule: required }
          ]
        },
        password: {
          id: "password",
          placeholder: "PASSWORD",
          editor: "password",
          validation: [
            { rule: required }, 
            { rule: minLength, args: { length: 6 } }, 
            { rule: compare, args: { fieldCompare: "confirmPassword", master: true } }
          ]
        },
        confirmPassword: {
          id: "confirmPassword",
          placeholder: "CONFIRM_PASSWORD",
          editor: "password",
          validation: [
            { rule: compare, args: { fieldCompare: "password", slave: true } }
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
            <h5 className="mb-4 text-center"><Trans i18nKey="REGISTRATION" /></h5>
            <Form
              submit={this.props.onSignupUser}
              btnText="MENU.REGISTRATION"
              fields={this.state.fields}>
              <React.Fragment>
                <Field {...this.state.fields.email} />
                <Field {...this.state.fields.password} />
                <Field {...this.state.fields.confirmPassword} />
              </React.Fragment>
            </Form>
            <Link to='/login'><Trans i18nKey="MENU.AUTHORIZATION" /></Link>
            </div>
          </div>
          )
        }
      </Translation>
    );
  }
}
interface IMapDispatchToProps{
  onSignupUser: (values: IValues) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownpProps: ISignupProps): IMapDispatchToProps => ({
  onSignupUser: bindActionCreators(onSignupUser, dispatch)
});
export default connect(null, mapDispatchToProps)(WithBlockWrapper(Signup, 'bl-auth'));
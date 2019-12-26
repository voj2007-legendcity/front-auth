import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage, FieldInputProps, FormikProps } from 'formik';
import * as Yup from "yup";
import { Trans, Translation } from 'react-i18next';
// hoc
import WithBlockWrapper from '../../../hoc/WithBlockWrapper';
// store
import { AppActions } from '../../../store/types';
import { onLoginUser } from '../../../store/actions/auth';
// styles
import './Auth.css';
// ui
import Button from '../../ui/button/Button';
// context
import ErrorContext from '../../../context/error';

interface FormValues {
  email: string;
  password: string;
}
interface ILoginProps {}
interface ILoginState {
  serverErrorMessage: string;
}

type Props = ILoginProps & IMapDispatchToProps;

class Login extends Component<Props, ILoginState> {
  static contextType = ErrorContext;

  constructor(props: Props) {
    super(props);
    this.state = {
      serverErrorMessage: ''
    };
  }

  componentDidUpdate(){
    if(this.context.error){
      this.setState({ serverErrorMessage: this.context.message });
    }
  }

  schema(){
    return Yup.object().shape({
      email: Yup.string()
        .email(() => <Translation>{ (t) => t('ERROR.EMAIL') }</Translation>)
        .required(() => <Translation>{ (t) => t('ERROR.POPULATED') }</Translation>),
      password: Yup.string()
        .min(6, () => <Translation>{ (t) => t('ERROR.MIN') }</Translation>)
        .required(() => <Translation>{ (t) => t('ERROR.POPULATED') }</Translation>),
    });
  }

  handleChange = (e: React.FormEvent<HTMLInputElement>, form: FormikProps<any>, field: FieldInputProps<any>) => {
    const target: HTMLInputElement = e.target as HTMLInputElement;
    form.setFieldValue(field.name, target.value);
    
    if(this.state.serverErrorMessage){
      this.setState({ serverErrorMessage: '' });
    }
  }

  render() {
    const initialValues: FormValues = { email: '', password: '' };
    return (
      <div className="col-12">
        <div className="form-container mx-auto">
        <h5 className="mb-4 text-center"><Trans i18nKey="AUTH" /></h5>
        <Formik
          initialValues={ initialValues }
          validationSchema={ this.schema() }
          onSubmit={async (values): Promise<void> => {
            await this.props.onLoginUser(values);
          }}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form translate={null}>
              <div className="form-group">
                <Field name="email">
                  {({ field, form }: {field: FieldInputProps<any>, form: FormikProps<any>}) => (
                    <input {...field} type="email" className={`form-control ${touched.email && errors.email ? "is-invalid" : ""}`} onChange={(e) => this.handleChange(e, form, field)} />
                  )}
                </Field>
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="form-group">
                <Field name="password">
                  {({ field, form }: {field: FieldInputProps<any>, form: FormikProps<any>}) => (
                    <input {...field} type="password" className={`form-control ${touched.password && errors.password ? "is-invalid" : ""}`} onChange={(e) => this.handleChange(e, form, field)} />
                  )}
                </Field>
                <ErrorMessage name="password" component="div" className="error" />
              </div>
              <div className="form-group">
                <Button type="submit" btnClass="btn btn-dark text-white w-100" disabled={isSubmitting}>
                  {isSubmitting ? <Trans i18nKey="SENDING" /> : <Trans i18nKey="ENTER" />}
                </Button>
              </div>
              {this.state.serverErrorMessage && (
                <div className="alert alert-danger" role="alert">{this.state.serverErrorMessage}</div>
              )}
            </Form>
          )}
        </Formik>
        <Link to='/signup'><Trans i18nKey="MENU.REGISTRATION" /></Link>
        </div>
      </div>
    );
  }
}
interface IMapDispatchToProps{
  onLoginUser: (values: FormValues) => void;
}

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AppActions>, ownpProps: ILoginProps): IMapDispatchToProps => ({
  onLoginUser: bindActionCreators(onLoginUser, dispatch)
});
export default connect(null, mapDispatchToProps)(WithBlockWrapper(Login, 'bl-auth'));

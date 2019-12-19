import React, { Component } from "react";
import { IValidation } from './Validation';
import { IFields } from './Field';
import _ from 'lodash';
// context
import ErrorContext, { IErrorContext } from '../context/error';
import FormContext,  { IFormContext } from '../context/form';
// ui
import Button from "../components/ui/button/Button";
// i18
import { Trans } from 'react-i18next';

interface IFormProps {
  fields: IFields;
  btnText?: string;
  submit: (values: IValues) => any;
}

export interface IValues {
  [key: string]: any;
}

export interface IErrors {
  [key: string]: string[];
}

export interface IFormState {
  values: IValues;
  errors: IErrors;
  serverError: IErrorContext;
  submitSuccess?: boolean;
}

type Props = IFormProps;

export class Form extends Component<Props, IFormState> {
  static contextType = ErrorContext;
  private _isUnmounted: boolean = false;

  constructor(props: Props) {
    super(props);

    const errors: IErrors = {};
    const values: IValues = {};
    const serverError: IErrorContext = {
      res: false,
      error: false,
      message: '',
      data: []
    };
    this.state = {
      errors,
      values,
      serverError
    };
  }

  componentDidMount(){
    this._isUnmounted = true;
    _.map(this.props.fields, (field: IValues, key: string): void => {
      if(field.validation && field.validation.length > 0){
        const errors = this.state.errors;
        errors[key] = [];
        this.setState({ errors: {...this.state.errors, ...errors } });
      }
    });
  }

  componentDidUpdate(){
    if(this.context.error){
      this.setState({ serverError: this.context });
    }
  }

  componentWillUnmount(){
    this._isUnmounted = false;
  }

  private setValues = (values: IValues): void => {
    this.setState({ values: { ...this.state.values, ...values } });
  };

  private hasErrors = (): boolean => {
    return _.map(this.state.errors, (errors: string[]): string[] => errors.filter((el: string): boolean => el.trim() !== ''))
      .filter((el: any): boolean => el.length > 0).length > 0 ? true : false;
  }

  private validateForm = async (): Promise<boolean> => {
    const errors: IErrors = {};
    _.map(this.props.fields, (field: IValues, key: string): string[] => errors[key] = this.validate(key));
    this.setState({ errors });
    return !this.hasErrors();
  }

  private validate = (fieldName: string): string[] => {
    let newError: string[] = [];
    this.setState({ serverError: {
      res: false,
      error: false,
      message: ''
    } });

    if(this.props.fields[fieldName] && this.props.fields[fieldName].validation){
      _.map(this.props.fields[fieldName].validation, (data: IValidation): string => {
        data.args = {...data.args, state: this.state}
        let fieldErrors = [];
        const fieldErrorName = data.args.slave ? data.args.fieldCompare : fieldName;
        const error = data.rule(
          this.state.values,
          fieldName,
          data.args
        )
        
        if(data.args.slave){
          fieldErrors = this.state.errors[fieldErrorName];
          
          if(!fieldErrors.includes(error)){
            this.setState({
              errors: { ...this.state.errors, [fieldErrorName]: [...fieldErrors, error] }
            });
          }else{
            if(!error){
              this.validate(fieldErrorName);
            }
          }
        }else if(data.args.master){
          if(!newError.includes(error)){
            this.setState({
              errors: { ...this.state.errors, [fieldErrorName]: [...newError, error] }
            });
          }
        }else{
          newError.push(error);
          this.setState({
            errors: { ...this.state.errors, [fieldName]: newError }
          });
        }
        return error;
      });
    }
    return newError;
  };

  private submitForm = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    if(this.validateForm()){
      this.setState({ submitSuccess: false }, async () => {
        const res: boolean = await this.props.submit(this.state.values);
        if(this._isUnmounted){
          this.setState({ submitSuccess: res });
        }
      });
    }
  };

  public render() {
    const { submitSuccess } = this.state;
    const context: IFormContext = {
      ...this.state,
      setValues: this.setValues,
      validate: this.validate,
      serverError: this.state.serverError
    };

    return (
      <FormContext.Provider value={context}>
        <form onSubmit={this.submitForm} noValidate={true}>
          
          {this.props.children}

          <div className="form-group">
            <Button 
              type="submit"
              btnClass="btn btn-dark text-white w-100"
              disabled={this.hasErrors()}>
                {this.props.btnText ? <Trans i18nKey={this.props.btnText} /> : <Trans i18nKey="SEND" />}
            </Button>
          </div>
          {!this.state.serverError.error && submitSuccess && (
            <div className="alert alert-info" role="alert"><Trans i18nKey="FORM.SUCCESS" /></div>
          )}
          {!this.state.serverError.error && this.state.serverError.res && this.hasErrors() && (
            <div className="alert alert-danger" role="alert"><Trans i18nKey="FORM.ERROR" /></div>
          )}
          {this.state.serverError.error && this.state.serverError.res && !this.hasErrors() && (
            <div className="alert alert-danger" role="alert">{this.state.serverError.message}</div>
          )}
        </form>
      </FormContext.Provider>
    );
  }
}
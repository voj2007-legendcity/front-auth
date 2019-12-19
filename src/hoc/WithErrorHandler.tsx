import React, { Component } from 'react';
// hoc
import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import ErrorContext, { IErrorContext } from '../context/error';

interface IErrorHandlerProps {}
interface IErrorHandlerState extends IErrorContext {}

type Props = IErrorHandlerProps;

const WithErrorHandler = (WrappedComponent: any, Axios: AxiosInstance) => {
  return class extends Component<Props, IErrorHandlerState> {
    private reqInterceptor!: any;
    private resInterceptor!: any;

    constructor(props: Props) {
      super(props);
      this.state = {
        res: false,
        error: false,
        message: '',
        data: []
      }
    }

    componentDidMount () {
      this.reqInterceptor = Axios.interceptors.request.use((req: AxiosRequestConfig): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
        this.setState({error: false, res: false, message: '', data: []});
        return req;
      } );
      this.resInterceptor = Axios.interceptors.response.use(
        (res: AxiosResponse<any>): AxiosResponse<any> | Promise<AxiosResponse<any>> => {
          this.setState({res: true});
          return res;
        },
        (error: any) => {
          this.setState({
            res: true,
            error: true, 
            message: error.response.data.errors[0].message, 
            data: error.response.data.errors[0].data
          });
        });
    }

    componentDidUpdate(){
      if(this.state.error){
        this.setState({error: false, res: false, message: '', data: []});
      }
    }

    componentWillUnmount () {
      Axios.interceptors.request.eject(this.reqInterceptor);
      Axios.interceptors.response.eject(this.resInterceptor);
    }

    render () {
      const context: IErrorContext = {...this.state}
      return (
        <ErrorContext.Provider value={context}>
          <WrappedComponent {...this.props} />
        </ErrorContext.Provider>
      );
    }
  }
}
export default WithErrorHandler;
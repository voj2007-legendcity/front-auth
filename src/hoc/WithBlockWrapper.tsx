import React, { Component } from 'react';
import { Translation } from 'react-i18next';

interface IBlockWrapperProps {}
interface IBlockWrapperState {}

type Props = IBlockWrapperProps;

const WithBlockWrapper = (WrappedComponent: any, blockClass: string) => {
  return class extends Component<Props, IBlockWrapperState> {
    render () {
      return (
        <Translation>
        {
          (t) => (
            <div className={blockClass}>
              <div className="container">
                <div className="row">
                  <WrappedComponent {...this.props} />
                </div>
              </div>
            </div>
            )
          }
        </Translation>
      );
    }
  }
}
export default WithBlockWrapper;
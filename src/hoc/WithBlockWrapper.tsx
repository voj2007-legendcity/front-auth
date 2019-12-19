import React, { Component } from 'react';

interface IBlockWrapperProps {}
interface IBlockWrapperState {}

type Props = IBlockWrapperProps;

const WithBlockWrapper = (WrappedComponent: any, blockClass: string) => {
  return class extends Component<Props, IBlockWrapperState> {
    render () {
      return (
        <div className={blockClass}>
          <div className="container">
            <div className="row">
              <WrappedComponent {...this.props} />
            </div>
          </div>
        </div>
      );
    }
  }
}
export default WithBlockWrapper;
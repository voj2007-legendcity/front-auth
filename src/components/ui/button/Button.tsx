import React, { Component, ButtonHTMLAttributes } from 'react';

type ButtonType = 'submit' | 'button' | 'reset';

interface IButtonProps {
  type?: ButtonType;
  btnClass?: string;
  disabled?: boolean;
  click?: () => void;
}
interface IButtonState extends ButtonHTMLAttributes<HTMLButtonElement> {
  btnClass?: string;
  click?: () => void;
}

type Props = IButtonProps;

class Button extends Component<Props, IButtonState> {

  constructor(props: Props) {
    super(props);
    this.state = {
      type: ('button' as ButtonType),
      btnClass: 'btn',
      disabled: false,
      click: () => {},
    };
  }

  componentDidMount(){
    this.setState({
      ...this.state,
      ...this.props
    })
  }

  render() {
    return (
      <React.Fragment>
        <button className={this.state.btnClass} type={this.state.type} onClick={this.state.click} disabled={this.props.disabled}>{this.props.children}</button>
      </React.Fragment>
    );
  }
}
export default Button;
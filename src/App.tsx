import React, { Component } from 'react';
import './App.css';
// layouts
import Layout from './layout';

interface IAppProps {}
interface IAppState {}

type Props = IAppProps;

class App extends Component<Props, IAppState> {
  render(){
    return (<Layout />);
  }
}
export default App;
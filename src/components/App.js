import React, { Component } from 'react';
import Tarot from './Tarot';

export default class App extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className='container'>
      <Tarot />
      </div>
    );
  }
}

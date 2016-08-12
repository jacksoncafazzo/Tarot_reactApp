import React, { Component } from 'react';
import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyCxj9IPD23Wsa9XRlx5z3z_qGkefRSDy1Q',
  authDomain: 'react-tarot.firebaseapp.com',
  databaseURL: 'https://react-tarot.firebaseio.com',    storageBucket: 'react-tarot.appspot.com',
};

const firebaseApp = firebase.initializeApp(config);
const storage = firebaseApp.storage();
const storageRef = storage.ref();
const sunRef = storageRef.child('Sun_19.jpg');

export default class Tarot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      description: '',
      Sun_19: ['Paternal archetype', 'Cosmic father', 'Radiance', 'Brotherly love', 'Building a common work', 'Success', 'Happiness', 'Light', 'Starting couple', 'The one helps the other to cross', 'A rich harvest', 'Glory', 'Achieved awareness', 'Father who loves his children', 'Solidarity']
    };

  }

  getCardDescrip() {
    let randomDescrip = this.state.Sun_19[Math.floor(Math.random() * this.state.Sun_19.length)];
    console.log('length is' + this.state.Sun_19.length);
    console.log('randomdescrip is' + randomDescrip);
    return randomDescrip;
  }

  drawCard() {
    console.log('card number is' + this.state.cardNumber);
    return Math.floor(Math.random() * 22);
  }

  getCardUrl() {
    sunRef.getDownloadURL().then(function(url) {
      return url;
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
    <div>

    <h4>{this.state.cardNumber}</h4>
    <h4>{this.state.description}</h4>

    <button onClick={e => {
      this.setState({ cardNumber: this.drawCard() });
    }}>Draw a Card</button>

    <button onClick={e => {
      this.setState({ description: this.getCardDescrip() });
    }}>get a new description</button>

    {this.getCardUrl()}

    {console.log(sunRef)}

    </div>
  );
  }
}

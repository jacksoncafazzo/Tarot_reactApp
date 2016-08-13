import React, { Component } from 'react';
import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyCxj9IPD23Wsa9XRlx5z3z_qGkefRSDy1Q',
  authDomain: 'react-tarot.firebaseapp.com',
  databaseURL: 'https://react-tarot.firebaseio.com',
  storageBucket: 'react-tarot.appspot.com',
};

const firebaseApp = firebase.initializeApp(config);
const storage = firebaseApp.storage();
const storageRef = storage.ref();
const fool = storageRef.child('0_TheFool.jpg');
const magician = storageRef.child('1_TheMagician.jpg');
const popess = storageRef.child('2_ThePopess.jpg');
const emperess = storageRef.child('3_TheEmperess.jpg');
const pope = storageRef.child('5_ThePope.jpg');
const lovers = storageRef.child('6_TheLovers.jpg');
const chariot = storageRef.child('7_TheChariot.jpg');
const justice = storageRef.child('8_Justice.jpg');
const hermit = storageRef.child('9_TheHermit.jpg');
const wheel = storageRef.child('10_TheWheelofFortune.jpg');
const force = storageRef.child('11_Force.jpg');
const hangedMan = storageRef.child('12_TheHangedMan.jpg');
const nameless = storageRef.child('13_Nameless.jpg');
const temperance = storageRef.child('14_Temperence.jpg');
const devil = storageRef.child('15_Force.jpg');
const tower = storageRef.child('16_TheTower.jpg');
const star = storageRef.child('17_TheStar.jpg');
const moon = storageRef.child('18_TheMoon.jpg');
const sun = storageRef.child('19_TheSun.jpg');
const judgement = storageRef.child('20_Judgement.jpg');
const world = storageRef.child('21_TheWorld.jpg');

const sun19 = ['Paternal archetype', 'Cosmic father', 'Radiance', 'Brotherly love', 'Building a common work', 'Success', 'Happiness', 'Light', 'Starting couple', 'The one helps the other to cross', 'A rich harvest', 'Glory', 'Achieved awareness', 'Father who loves his children', 'Solidarity'];

const judgement20 = ['Irresistable desire', 'Call from the divine and the spiritual', 'Resurrection', 'Announcement', 'Message', 'Revival', 'Rising to a superior awareness', 'Integrating parental archetypes', 'Awakening', 'Revelation', 'Faith', 'Ardor', 'Worship', 'Virtue', 'Parents blessing', 'Grace', 'Accomplished initiating cycle', 'Consecration', 'Music'];

const theWorld21 = ['Accomplishment in the world', 'Achievement', 'The four energies and the fifth essence', 'Cosmic center', 'Fame', 'Universal soul', 'Travels', 'Womans sex', 'Achieving unity', 'Spiritual androgyny', 'Confinement', 'An obstacle one must rise above', 'difficult birth', 'ideal woman', 'Happy marriage', 'Womb', 'Perfect world', 'Being born to the world', 'Creative dancing', 'Opening', 'Cosmic egg'];

const tarotImages = [ fool, magician, popess, emperess, pope, lovers, chariot, justice, hermit, wheel, force, hangedMan, nameless, temperance, devil, tower, star, moon, sun, judgement, world,
];

export default class Tarot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      url: '',
      description: '',
      Sun_19: sun19,
      Judgement_20: judgement20,
      TheWorld_21: theWorld21,
      arcana: [sun19, judgement20],
      images: tarotImages,
    };
  }

  // getRandomImage() {
  //   let randomImage = this.state.images[Math.floor(Math.random() * this.state.images.length)];
  //   return randomImage;
  // }

  getRandomCard() {
    let randomCard = this.state.arcana[Math.floor(Math.random() * this.state.arcana.length)];
    console.log(randomCard);
    return randomCard[Math.floor(Math.random() * randomCard.length)];
  }

  getCardUrl() {
    let self = this;
    // let cards = this.state.images.map(function(val) {
    //   return val;
    // });
    // console.log('im' + cards);
    this.state.images[0].getDownloadURL().then(function(url) {
      self.setState({
        url: url
      });
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    return (
    <div>

    <h4>{this.state.cardNumber}</h4>
    <h4>{this.state.description}</h4>
    <img src={this.state.url}/>

    <button onClick={e => {
      this.setState({ cardNumber: this.getRandomCard() });
    }}>Draw a Card</button>

    <button onClick={e => {
      this.getCardUrl();
    }}> get an image
    </button>
    {/* {console.log(sunRef)} */}

    </div>
  );
  }
}

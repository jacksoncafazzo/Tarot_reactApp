import React, { Component } from 'react';
import _ from 'lodash';
import firebase from 'firebase';
const config = {
  apiKey: 'AIzaSyCxj9IPD23Wsa9XRlx5z3z_qGkefRSDy1Q',
  authDomain: 'react-tarot.firebaseapp.com',
  databaseURL: 'https://react-tarot.firebaseio.com',
  storageBucket: 'react-tarot.appspot.com',
};

const style = require('./style.css');

const firebaseApp = firebase.initializeApp(config);
const storage = firebase.storage();
const storageRef = storage.ref();

const fool = storageRef.child('0_TheFool.jpg');
const magician = storageRef.child('1_TheMagician.jpg');
const popess = storageRef.child('2_ThePopess.jpg');
const emperess = storageRef.child('3_TheEmperess.jpg');
const emperor = storageRef.child('4_TheEmperor.jpg');
const pope = storageRef.child('5_ThePope.jpg');
const lovers = storageRef.child('6_TheLovers.jpg');
const chariot = storageRef.child('7_TheChariot.jpg');
const justice = storageRef.child('8_Justice.jpg');
const hermit = storageRef.child('9_TheHermit.jpg');
const wheel = storageRef.child('10_TheWheelofFortune.jpg');
const force = storageRef.child('11_Force.jpg');
const hangedMan = storageRef.child('12_TheHangedMan.jpg');
const nameless = storageRef.child('Nameless.jpg');
const temperance = storageRef.child('14_Temperence.jpg');
const devil = storageRef.child('15_Force.jpg');
const tower = storageRef.child('16_TheTower.jpg');
const star = storageRef.child('17_TheStar.jpg');
const moon = storageRef.child('18_TheMoon.jpg');
const sun = storageRef.child('19_TheSun.jpg');
const judgement = storageRef.child('20_Judgement.jpg');
const world = storageRef.child('21_TheWorld.jpg');
const cardback = storageRef.child('back_of_deck.jpg');

const sun19 = ['Paternal archetype', 'Cosmic father', 'Radiance', 'Brotherly love', 'Building a common work', 'Success', 'Happiness', 'Light', 'Starting couple', 'The one helps the other to cross', 'A rich harvest', 'Glory', 'Achieved awareness', 'Father who loves his children', 'Solidarity'];

const judgement20 = ['Irresistable desire', 'Call from the divine and the spiritual', 'Resurrection', 'Announcement', 'Message', 'Revival', 'Rising to a superior awareness', 'Integrating parental archetypes', 'Awakening', 'Revelation', 'Faith', 'Ardor', 'Worship', 'Virtue', 'Parents blessing', 'Grace', 'Accomplished initiating cycle', 'Consecration', 'Music'];

const theWorld21 = ['Accomplishment in the world', 'Achievement', 'The four energies and the fifth essence', 'Cosmic center', 'Fame', 'Universal soul', 'Travels', 'Womans sex', 'Achieving unity', 'Spiritual androgyny', 'Confinement', 'An obstacle one must rise above', 'difficult birth', 'ideal woman', 'Happy marriage', 'Womb', 'Perfect world', 'Being born to the world', 'Creative dancing', 'Opening', 'Cosmic egg'];

// const tarotImages = [ fool, magician, popess, emperess, emperor, pope, lovers, chariot, justice, hermit, wheel, force, hangedMan, nameless, temperance, devil, tower, star, moon, sun, judgement, world,
// ];

const tarotImages = [ sun, judgement, world];

export default class Tarot extends Component {
  constructor(props) {
    super(props);
    let cast = [];
    for (let i = 0; i < 4; i++) {
      cast.push({
        url: '',
        descriptions: [' '],
        cardNumber: null,
        reversed: { WebkitTransform: 'none' }
      });
    }
    this.state = {
      cast: cast,
      activeCard: 0,
      arcana: [sun19, judgement20, theWorld21],
      images: tarotImages,
    };

    this.getCard = this.getCard.bind(this);
    this.getDescriptions = this.getDescriptions.bind(this);
  }

  componentWillMount() {
    let self = this;
    let cast = this.state.cast;
    cardback.getDownloadURL().then(function(url) {
      for (let i = 0; i < 4; i++) {
        cast[i].url = url;
      }
      self.setState({ cast });
    }).catch(function(error) {
      console.log(error);
    });
  }

  getDescriptions(currentNumber, cast) {
    let activeCard = this.state.activeCard;
    //get all the descriptions for the card
    let cardDescriptions = this.state.arcana[currentNumber];
    //set a random description to the card
    cast[activeCard].descriptions = cardDescriptions;
    // set it to the new cast
    console.log(cast);
    this.setState({ cast: cast });
  }

  //this isn't working right
  checkIfDrawn(num, cast) {
    let cardNumbers = [];
    cast.forEach((card) => {
      cardNumbers.push(card.cardNumber);
    });
    return cardNumbers.includes(num);
  }

  getCard() {
    let cast = this.state.cast;
    let self = this;
    //get random number
    let randomNumber = Math.floor(Math.random() * tarotImages.length);
    let activeCard = this.state.activeCard;
    if (!this.checkIfDrawn(randomNumber, cast)) {
      // push it to the cast at active card index
      cast[activeCard].cardNumber = randomNumber;
      // let's set the image
      let cardImage = tarotImages[randomNumber];
      // get the urls
      cardImage.getDownloadURL().then(function(url) {
        //set the url of the card drawn
        cast[activeCard].url = url;
        self.setState({ cast: cast });
      }).catch(function(error) {
        console.log(error);
      });
      // 50/50 chance of card being flipped
      if (Math.floor(Math.random() * 10) > 5) {
        cast[activeCard].reversed = { WebkitTransform: 'rotate(180deg)' };
      }
      // pass card number and cast to description function to
      // get one of the descriptions and update the state
      this.getDescriptions(randomNumber, cast);
      // increase activeCard count
      this.setState(function(previousState, currentProps) {
        return { activeCard: previousState.activeCard + 1 };
      });
    };
  }

  renderCard(card, index) {
    return (
      <div key={`card${index}`} className={style.card}>
        <img src={card.url} style={card.reversed}/>
        <div key={`desc${index}`} className={style.description}>
          <h4>{card.descriptions[Math.floor(Math.random() * card.descriptions.length)]}</h4>
        </div>
        <h1 key={`cardNum${index}`} className={style.cardNumber}>{card.cardNumber}</h1>
      </div>
    );
  }

  render() {
    return (
    <div>
      <div className={style.allcards}>
        {this.state.cast.map(this.renderCard)}
      </div>

      <button
      className={style.button} onClick={e => {
        this.getCard();
      }}>Call
      </button>

      <button
        className={style.button} onClick={e => {console.log(Math.floor(Math.random() * 9))}}>rando</button>
    </div>
  );
  }
}

// <div className={style.descriptions}>
//   {this.state.cast.descriptions.map(this.renderDesc)}
// </div>
//
// <div className={style.cardNumbers}>
//   {this.state.cast.cardNumbers.map(this.renderNumber)}
// </div>

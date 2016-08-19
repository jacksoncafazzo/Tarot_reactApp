import React, { Component, PropTypes } from 'react';

const cardback = this.cardback;

export default class CardDisplay extends Component {
  static propTypes = {
    cards: PropTypes.array,
  }
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: '',
      url: '',
      description: '',
      orientation: '',
      arcana: [self.sun19, self.judgement20],
      images: self.tarotImages,
    };
    cardback.getDownloadURL().then(function(url) {
      self.setState({
        url: url
      });
    }).catch(function(error) {
      console.log(error);
    });
  }

  render() {
    let cardStyle = {
      width: '30%'
    };
    return (
      <div>
        <img style={cardStyle} src={this.state.url}/>
        <button onClick={e => {
          this.setState({ description: this.drawCard() });
        }}>Flip card</button>
      </div>
    );
  }

  drawCard() {
    let draw = Math.floor(Math.random() * this.state.arcana.length);
    this.setState({ cardNumber: draw });
    let randomCard = this.state.arcana[draw];
    console.log(randomCard);
    this.getCardUrl(draw);
    return randomCard[Math.floor(Math.random() * randomCard.length)];
  }
}

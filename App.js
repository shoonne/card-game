import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';

import CardImage from './src/components/CardImage'
import ScoreBoard from './src/components/ScoreBoard';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      dataSource: [],
      score: 0,
      succsess: false,
      deckID: null,
      drawnCard: null,
      drawnCardValue:null,
      cardsRemaining: null,
      cardImg: null,
      cardValue: null,
      isCardValueHigher: false,
    };

    this.drawCardAsync = this.drawCardAsync.bind(this);
    this.onPressHigher = this.onPressHigher.bind(this);
    this.onPressLower = this.onPressLower.bind(this);
  };

  componentDidMount() {
    this.getDecksFromApiAsync();
  }
  componentWillUpdate(nextProps, nextState) {
    const cardValue = this.state.cardValue;
    const cardValueIsHigher = this.state.isCardValueHigher;
    // console.log(nextState.cardValue); //will show the new state
    // console.log(this.state.cardValue); //will show the previous state

    if(cardValue === null){
      return;
    } else {
      if(cardValue > nextState.cardValue && cardValueIsHigher) {
        //console.log('Next card had a higher value')
        this.setState({
          score: this.state.score + 1,
          isCardValueHigher: null,
        })
      } else if( cardValue < nextState.cardValue && cardValueIsHigher === false) {
        //console.log('Next card had a lower value')
        this.setState({
          score: this.state.score + 1,
          isCardValueHigher: null,
        })
      }
    }
  }

  getDecksFromApiAsync() {
    return fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          succsess: responseJson.succsess, 
          dataSource: responseJson,
          deckID: responseJson.deck_id
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onPressHigher = () => {
    this.setState({
      isCardValueHigher: true,
    })
    //console.log(this.state.isCardValueHigher)
  }

  onPressLower = () => {
    this.setState({
      isCardValueHigher: false, 
    })
    //console.log(this.state.isCardValueHigher)
  }

  drawCardAsync = () => {
    const DRAW_CARD_URL = `https://deckofcardsapi.com/api/deck/${this.state.deckID}/draw/?count=1`;

    return fetch(DRAW_CARD_URL)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        drawnCard: responseJson,
        drawnCardValue: responseJson.cards[0].value,
        cardsRemaining: responseJson.remaining,
        cardImg: responseJson.cards[0].image,
        cardValue: responseJson.cards[0].value
      });
      //console.log(this.state.deckID)
    })
    .catch((error) =>{
      console.log(error)
    });
  }

  
  render() {
    const cardImg = this.state.cardImg;

  return (
    <View style={styles.container}>

    <ScoreBoard cardsRemaining={this.state.cardsRemaining} score={this.state.score}/>
    <View>
       <CardImage cardImg={cardImg}/>
    </View>

    <TouchableOpacity style={styles.btn} onPress={this.drawCardAsync}>
      <Text style={{fontSize: 25, color:'white'}}>SHOW CARD</Text>
    </TouchableOpacity>

    <View style={{flexDirection:'row'}}>
      <Button onPress={this.onPressHigher} title={"HIGHER"} />
      <Button onPress={this.onPressLower} title={"LOWER"} />
    </View>

    </View>
  );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center'
  },
  btn: {
    backgroundColor:'blue', 
    width:'100%', 
    alignItems:'center', 
    height: 70, 
    justifyContent:'center'
  }
});

import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      dataSource: [],
      succsess: false,
      deckID: null,
      drawnCard: null,
      drawnCardValue:null,
      cardsRemaining: null,
      cardImg: null,
      cardValue: null,
    };

    this.drawCardAsync = this.drawCardAsync.bind(this);
  };

  componentDidMount() {
    this.getDecksFromApiAsync();
  }
  componentWillUpdate(nextProps, nextState) {
    const cardValue = this.state.cardValue
    console.log(nextState.cardValue); //will show the new state
    console.log(this.state.cardValue); //will show the previous state

    if(cardValue === null){
      return;
    } else {
      if(cardValue > nextState.cardValue) {
        console.log('Next card had a higher value')
      } else {
        console.log('Next card had a lower value')
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

    const data = this.state.dataSource;
    const cardsRemaining = this.state.cardsRemaining;
    const cardImg = this.state.cardImg;
    const cardImgPlaceholder = 'https://previews.123rf.com/images/rlmf/rlmf1512/rlmf151200181/49319355-playing-cards-back.jpg';

  return (
    <View style={styles.container}>
      <View>
          <Text>Remaining cards: {cardsRemaining ? cardsRemaining : 52}</Text>
      </View>

      <View>
        <Image 
        style={{width: 100, height: 200, resizeMode: 'contain'}}
        source={{ uri : cardImg ? cardImg : cardImgPlaceholder }}/>
      </View>


      <TouchableOpacity style={{backgroundColor:'red', width:'100%', alignItems:'center', height: 70, justifyContent:'center'}} onPress={this.drawCardAsync}>
        <Text style={{fontSize: 25, color:'white'}}>DRAW CARD</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{backgroundColor:'blue', width:'100%', alignItems:'center', height: 70, justifyContent:'center'}} onPress={() => {console.log(this.state.drawnCard)}}>
        <Text style={{fontSize: 25, color:'white'}}>SHOW CARD</Text>
      </TouchableOpacity>


      <View style={{flexDirection:'row'}}>
      <Button title={"HIGHER"} />
      <Button title={"LOWER"} />
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
});

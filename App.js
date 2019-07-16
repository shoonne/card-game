import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      dataSource: [],
      succsess: false,
      deckID: null,
      drawnCard: null,
      cardsRemaining: null
    };

    this.drawCardAsync = this.drawCardAsync.bind(this);
  };

  componentDidMount() {
    this.getDecksFromApiAsync();
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
        cardsRemaining: responseJson.remaining
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

  return (
    <View style={styles.container}>
      <View>
          <Text>Remaining cards: {cardsRemaining ? cardsRemaining : 52}</Text>
      </View>
      <TouchableOpacity onPress={() => {console.log(this.state.drawnCard)}}>
        <Text>SHOW CARD</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={this.drawCardAsync}>
        <Text>DRAW CARD</Text>
      </TouchableOpacity>
    </View>
  );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

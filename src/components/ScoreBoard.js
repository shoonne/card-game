import React from 'react';
import { Text, View } from 'react-native';

const ScoreBoard = (props) => (
 <View>
    <Text>Remaining cards: {props.cardsRemaining ? props.cardsRemaining : 52}</Text>
    <Text>Score: {props.score}</Text>
</View>
);

export default ScoreBoard;
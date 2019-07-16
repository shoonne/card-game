import React from 'react';
import { View, Image } from 'react-native';

const cardImgPlaceholder = 'https://previews.123rf.com/images/rlmf/rlmf1512/rlmf151200181/49319355-playing-cards-back.jpg';
const CardImage = (props) => (
  <Image 
    style={{width: 100, height: 200, resizeMode: 'contain'}}
    source={{ uri : props.cardImg ? props.cardImg : cardImgPlaceholder }}/>

);

export default CardImage;


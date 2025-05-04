// dimensions.js
import {Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

// Function to get width percentage
export const wp = percentage => {
  return (width * percentage) / 100;
};

// Function to get height percentage
export const hp = percentage => {
  return (height * percentage) / 100;
};
// Function to calculate responsive font size
export const getResponsiveFontSize = fontSize => {
  return wp(fontSize / 3.9); // Divide by 4 to get responsive scaling
};

//for fontsize
//16 = wp(4)
//15 = wp(4.3)

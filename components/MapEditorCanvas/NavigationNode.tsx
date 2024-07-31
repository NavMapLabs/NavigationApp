import { View, StyleSheet, StyleProp, ImageSourcePropType, Image, ImageProps, Text, DimensionValue } from "react-native"
import { Image as SvgImage, NumberProp } from 'react-native-svg';
import React from "react"
import { Coordinate } from "../../constants/Coordinate"

const defultImage:ImageProps = require('../../assets/images/sampleNode.png')

// const NavigationNode = ({coor} : {coor: Coordinate}) => {
  const NavigationNode = ({x, y}: {x:number, y:number}) => {
    
    return (
      <Image 
        source={defultImage} 
        style={[styles.image, { left: x, top: y, width: 20, height: 20 }]}
      />
    );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
  },
});

export default NavigationNode;
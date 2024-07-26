import { View, StyleSheet, StyleProp, ImageSourcePropType, ImageProps, Text } from "react-native"
import { Image as SvgImage, NumberProp } from 'react-native-svg';
import React from "react"
import { Coordinate } from "../../constants/Coordinate"

const defultImage:string = require('../../assets/images/sampleNode.png')

// const NavigationNode = ({coor} : {coor: Coordinate}) => {
  const NavigationNode = ({x, y}: {x:NumberProp, y:NumberProp}) => {
    
    return (
      <SvgImage 
        href={"https://pluspng.com/img-png/nodejs-logo-png-node-js-on-dark-background-1843.png"} 
        x={x}
        y={y}
        width="10" 
        height="10"
        preserveAspectRatio="xMidYMid slice"
      />
    );
};

export default NavigationNode;
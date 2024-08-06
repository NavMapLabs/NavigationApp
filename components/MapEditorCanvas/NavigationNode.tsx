import { View, StyleSheet, StyleProp, ImageSourcePropType, Image, ImageProps, Text, DimensionValue } from "react-native"
import { Image as SvgImage, NumberProp } from 'react-native-svg';
import React from "react"
import { Coordinate } from "../../constants/Coordinate"
import { Dimension } from "@/constants/Dimension";

const defultImage:ImageProps = require('../../assets/images/sampleNode.png')

// const NavigationNode = ({coor} : {coor: Coordinate}) => {
  const NavigationNode = ({coords, dimension}: {coords:Coordinate, dimension:Dimension}) => {
    const x = coords.x;
    const y = coords.y;
    
    return (
      <Image 
        source={defultImage} 
        style={[styles.image, { 
          marginLeft: x - dimension.width/2, 
          marginTop: y - dimension.height/2, 
          width: dimension.width, 
          height: dimension.height 
        }]}
      />
    );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    left: "50%",
    top: "50%"
  },
});

export default NavigationNode;
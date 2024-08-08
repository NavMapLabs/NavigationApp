import { Coordinate } from '@/constants/Coordinate';
import { NavNodeType } from '@/constants/NavigationNode';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Line } from 'react-native-svg';


const calculateLineProperties = (coords_1:Coordinate, coords_2:Coordinate) => {
    const dx = coords_2.x - coords_1.x;
    const dy = coords_2.y - coords_1.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx) * (180 / Math.PI); // Convert to degrees
  
    return { length, angle };
  };

  
const NavigationEdge = ({coords_1, coords_2}:{coords_1:Coordinate, coords_2:Coordinate}) => {
    
    const { length, angle } = calculateLineProperties(coords_1, coords_2);

    return (
        <View
        style={[
            styles.line,
            {
            width: length,
            marginLeft: coords_1.x,
            marginTop: coords_1.y,
            transform: [{ rotate: `${angle}deg` }],
            zIndex:5
            },
        ]}
        z-index={5}
        />
    );
}

const styles = StyleSheet.create({
    line: {
      position: 'absolute',
      height: 5,
      backgroundColor: 'red',
      left: "50%",
    },
  });
  
export default NavigationEdge;
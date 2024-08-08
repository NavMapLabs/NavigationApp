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

  
const NavigationEdge = ({node_1, node_2}:{node_1:NavNodeType, node_2:NavNodeType}) => {
    
    const { length, angle } = calculateLineProperties(node_1.coords, node_2.coords);

    return (
        <View
        style={[
            styles.line,
            {
            width: length,
            left: node_1.coords.x,
            top: node_1.coords.y,
            transform: [{ rotate: `${angle}deg` }],
            },
        ]}
        />
    );
}

const styles = StyleSheet.create({
    line: {
      position: 'absolute',
      height: 2,
      backgroundColor: 'black',
    },
  });
  
export default NavigationEdge;
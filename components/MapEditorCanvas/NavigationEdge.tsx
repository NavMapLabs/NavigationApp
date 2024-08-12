import { TouchableOpacity, View, StyleSheet } from "react-native"
import React from 'react';
import { Coordinate } from '@/constants/Coordinate';
import { NavNodeType } from '@/constants/NavigationNode';


const calculateLineProperties = (coords_1:Coordinate, coords_2:Coordinate) => {
    const dx = coords_2.x - coords_1.x;
    const dy = coords_2.y - coords_1.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI); // Convert to degrees
  
    return { length, angle };
  };

  
const NavigationEdge = ({coords_1, coords_2}:{coords_1:Coordinate, coords_2:Coordinate}) => {
    const { length, angle } = calculateLineProperties(coords_1, coords_2);

    const handleClick = () => {
        console.log("clicked Edge");
    };

    return (
        <TouchableOpacity onPress={handleClick} style={{zIndex:5}}>
            <View
                style={[
                    styles.line,
                    {
                    width: length,
                    marginLeft: coords_1.x,
                    marginTop: coords_1.y,
                    transform: [{ rotate: `${angle}deg` }],
                    transformOrigin: 'left top',
                    zIndex:5
                    },
                ]}
                z-index={5}
            />
        </TouchableOpacity>
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
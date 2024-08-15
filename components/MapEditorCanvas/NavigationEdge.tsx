import { TouchableOpacity, View, StyleSheet } from "react-native"
import React from 'react';
import { Coordinate } from '@/constants/Coordinate';
import { NavNodeType } from '@/constants/NavigationNode';


const calculateLineProperties = (coords_1:Coordinate, coords_2:Coordinate) => {
    const dx = coords_2.x - coords_1.x;
    const dy = coords_2.y - coords_1.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI); // Convert to degrees
    // if (dy > 0) { // dx or dy has an case need to + 180 ion degree
    //     angle += 180
    // }

    const x_offset = 0;
    const y_offset = 0;
  
    return { x_offset, y_offset, length, angle };
  };

  
const NavigationEdge = ({coords_1, coords_2}:{coords_1:Coordinate, coords_2:Coordinate}) => {
    const { x_offset, y_offset, length, angle } = calculateLineProperties(coords_1, coords_2);

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
                    marginLeft: coords_1.x + x_offset,
                    marginTop: coords_1.y + y_offset,
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
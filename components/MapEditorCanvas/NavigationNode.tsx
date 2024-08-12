import { TouchableOpacity, StyleSheet, Image, ImageProps } from "react-native"
import { AppDispatch } from '../../store/datastore';
import { useDispatch } from 'react-redux';
import { removeNode } from "@/store/NavMapSlice";
import React from "react"
import { Coordinate } from "../../constants/Coordinate"
import { Dimension } from "@/constants/Dimension";

const defaultImage:ImageProps = require('../../assets/images/sampleNode.png')

  const NavigationNode = ({name, id, coords, dimension}: {name:string, id:string, coords:Coordinate, dimension:Dimension}) => {
    const x = coords.x;
    const y = coords.y;

    const dispatch = useDispatch<AppDispatch>();
    
    const handleClick = () => {
      dispatch(removeNode({key: id}));
      console.log("clicked Node");
    };


    return (
      <TouchableOpacity onPress={handleClick} style={{zIndex:10}}>
        <Image 
          source={defaultImage} 
          style={[styles.image, { 
            marginLeft: x - dimension.width/2, 
            marginTop: y - dimension.height/2, 
            width: dimension.width, 
            height: dimension.height,
            zIndex:10
          }]}
          z-index={10}
        />
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    left: "50%",
  },
});

export default NavigationNode;
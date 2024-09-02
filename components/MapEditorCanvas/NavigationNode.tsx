import { TouchableOpacity, StyleSheet, Image, ImageProps } from "react-native"
import { AppDispatch, RootState } from '../../store/datastore';
import { useDispatch, useSelector } from 'react-redux';
import { pressNode, unpressNode } from "@/store/NavStateSlice";
import { addEdge } from "@/store/NavMapSlice";
import React from "react"
import { Coordinate } from "../../constants/Coordinate"
import { Dimension } from "@/constants/Dimension";
import { is } from "immutable";

const defaultImage:ImageProps = require('../../assets/images/sampleNode.png')

// const NavigationNode = ({coor} : {coor: Coordinate}) => {
  const NavigationNode = ({name, id, coords, dimension}: {name:string, id:string, coords:Coordinate, dimension:Dimension}) => {
    const x = coords.x;
    const y = coords.y;
    const selectedid = useSelector((state: RootState) => state.navState.selectedNodeId);
    const pastSelectedid = useSelector((state: RootState) => state.navState.pastSelectedNodeId);
    const isPressed = is(selectedid, id);
    const dispatch = useDispatch<AppDispatch>();

    const handleClick = () => {
      if(isPressed){
        dispatch(unpressNode());
        console.log("unpressed node" + id);
      } 
      else {
        dispatch(pressNode({nodeID: id}));
        console.log("pressed node" + id);
        //if (pastSelectedid !== "") {
        //  dispatch(addEdge({nodeID_1:pastSelectedid, nodeID_2:id}));
        //  console.log("added edges between " + pastSelectedid + " and " + id);
        //}
      }
    }

    return (
      <TouchableOpacity onPress={handleClick} style={{zIndex:10}}>
        <Image 
          source={defaultImage} 
          style={[styles.image, { 
            marginLeft: x - dimension.width/2, 
            marginTop: y - dimension.height/2, 
            width: dimension.width, 
            height: dimension.height,
            zIndex:10,
          },
          isPressed && styles.imagePressed
        ]}
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
  imagePressed: {
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'red',
  }
});

export default NavigationNode;
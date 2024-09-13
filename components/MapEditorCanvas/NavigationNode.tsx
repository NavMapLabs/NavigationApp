import { Pressable, StyleSheet, Image, ImageProps } from "react-native";
import { AppDispatch, RootState } from '../../store/datastore';
import { useDispatch, useSelector } from 'react-redux';
import { pressNode, unpressNode, addPressedNode, removePressedNode } from "@/store/NavStateSlice";
import { addEdge } from "@/store/NavMapSlice";
import React, { useEffect } from "react";
import { Coordinate } from "../../constants/Coordinate"
import { Dimension } from "@/constants/Dimension";
import { is } from "immutable";

const defaultImage:ImageProps = require('../../assets/images/sampleNode.png')

  const NavigationNode = ({name, id, coords, dimension}: {name:string, id:string, coords:Coordinate, dimension:Dimension}) => {
    const x = coords.x;
    const y = coords.y;
    const selectedID = useSelector((state: RootState) => state.navState.selectedNodeId);
    const selectedNodeIDs = useSelector((state: RootState) => state.navState.selectedNodes);
    const isPressed = is(selectedID, id);
    const dispatch = useDispatch<AppDispatch>();
    const isBatchPressed = selectedNodeIDs.includes(id);
    const mode = useSelector((state: RootState) => state.navState.mode);

    const handleClick = () => {
      if(mode === 'add-node'){
        if(isPressed){
          dispatch(unpressNode());
        } 
        else {
          dispatch(pressNode({nodeID: id}));
        }
      }
      else if(mode === 'multi-select'){
        if(isBatchPressed){
          dispatch(removePressedNode({nodeID: id}));
          if(selectedNodeIDs.length === 1){
            dispatch(unpressNode());
          }
        }
        else {
          dispatch(addPressedNode({nodeID: id}));
        }
      }
    }

    return (
      <Pressable onPress={handleClick} style={{zIndex:10}}>
        <Image 
          source={defaultImage} 
          style={[styles.image, { 
            marginLeft: x - dimension.width/2, 
            marginTop: y - dimension.height/2, 
            width: dimension.width, 
            height: dimension.height,
            zIndex:10,
          },
          (isPressed || isBatchPressed) && styles.imagePressed
        ]}
          z-index={10}
        />
      </Pressable>
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
import { Pressable, StyleSheet, Image, ImageProps, PanResponder, Animated } from "react-native";
import { AppDispatch, RootState } from '../../store/datastore';
import { useDispatch, useSelector } from 'react-redux';
import { pressNode, unpressNode, addPressedNode, removePressedNode } from "@/store/NavStateSlice";
import { updateNodeCoords, updateNodeCoordsFinal } from "@/store/NavMapSlice";
import React, { useEffect } from "react";
import { Coordinate } from "../../constants/Coordinate"
import { Dimension } from "@/constants/Dimension";
import { is } from "immutable";
import { useLinkProps } from "@react-navigation/native";

const defaultImage:ImageProps = require('../../assets/images/sampleNode.png')

type NavigationNodeProps = {
  name: string,
  id: string,
  coords: Coordinate,
  dimension: Dimension,
  canvasDimension: Dimension,
}

const NavigationNode = (props: NavigationNodeProps) => {
  const x = props.coords.x;
  const y = props.coords.y;
  const selectedID = useSelector((state: RootState) => state.navState.selectedNodeId);
  const selectedNodeIDs = useSelector((state: RootState) => state.navState.selectedNodes);
  const isPressed = is(selectedID, props.id);
  const dispatch = useDispatch<AppDispatch>();
  const isBatchPressed = selectedNodeIDs.includes(props.id);
  const mode = useSelector((state: RootState) => state.navState.mode);

  const handleClick = () => {
    if(mode === 'add-node' || mode === 'move-node'){
      if(isPressed){
        dispatch(unpressNode());
      } 
      else {
        dispatch(pressNode({nodeID: props.id}));
      }
    }
    else if(mode === 'multi-select'){
      if(isBatchPressed){
        dispatch(removePressedNode({nodeID: props.id}));
        if(selectedNodeIDs.length === 1){
          dispatch(unpressNode());
        }
      }
      else {
        dispatch(addPressedNode({nodeID: props.id}));
      }
    }
  }

  const nodePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => (mode === 'move-node'),
    onPanResponderMove: (evt) => {
      //limit the movement to the canvas
      const { locationX, locationY } = evt.nativeEvent;
      dispatch(updateNodeCoords({key: props.id, coords: {x: locationX-(props.canvasDimension.width/2), y: locationY}}));
    },
    onPanResponderRelease: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      dispatch(updateNodeCoordsFinal({key: props.id, coords: {x: locationX-(props.canvasDimension.width/2), y: locationY}}));
    }
  });

  return (
    <Pressable onPress={handleClick} style={{zIndex:10}}>
      <Animated.View {...nodePanResponder.panHandlers}>
        <Image 
          source={defaultImage} 
          style={[styles.image, { 
            marginLeft: x - props.dimension.width/2, 
            marginTop: y - props.dimension.height/2, 
            width: props.dimension.width, 
            height: props.dimension.height,
            zIndex:10,
          },
          (isPressed || isBatchPressed) && styles.imagePressed
        ]}
          z-index={10}
        />
      </Animated.View>
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
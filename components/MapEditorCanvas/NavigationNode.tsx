import { Pressable, StyleSheet, Image, ImageProps, PanResponder, Animated } from "react-native";
import { AppDispatch, RootState } from '../../store/datastore';
import { useDispatch, useSelector } from 'react-redux';
import { pressNode, unpressNode, addPressedNode, removePressedNode, changeMode } from "@/store/NavStateSlice";
import { updateNodeCoords, updateNodeCoordsFinal } from "@/store/NavMapSlice";
import React, { useEffect } from "react";
import { Coordinate } from "../../constants/Coordinate"
import { Dimension } from "@/constants/Dimension";
import { is } from "immutable";
import { NodeTypeMapper } from "@/constants/NodeTypeMapper";

type NavigationNodeProps = {
  name: string,
  id: string,
  coords: Coordinate,
  type: string,
  dimension: Dimension,
  canvasDimension: Dimension,
  scale: number
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
  const isMoveMode = useSelector((state: RootState) => state.navState.mode === 'move-node');

  const handleClick = () => {
    if(mode === 'add-node' || mode === 'move-node'){
      if(isPressed){
        dispatch(unpressNode());
      } 
      else {
        dispatch(pressNode({nodeID: props.id}));
        dispatch(changeMode({mode: 'move-node'}));
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

  const defaultImage = NodeTypeMapper[props.type];

  const nodePanResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => isMoveMode,
    onPanResponderMove: (evt) => {
      //limit the movement to the canvas
      const { locationX, locationY } = evt.nativeEvent;
      const scaledX = locationX/props.scale;
      const scaledY = locationY/props.scale;
      dispatch(updateNodeCoords({key: props.id, coords: {x: scaledX-(props.canvasDimension.width/2), y: scaledY}}));
    },
    onPanResponderRelease: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      const scaledX = locationX/props.scale;
      const scaledY = locationY/props.scale;
      dispatch(updateNodeCoordsFinal({key: props.id, coords: {x: scaledX-(props.canvasDimension.width/2), y: scaledY}}));
      dispatch(changeMode({mode: 'add-node'}));
    }
  });

  return (
    <Pressable onPress={handleClick} style={{zIndex:10}}>
      <Animated.View {...(isMoveMode ? nodePanResponder.panHandlers : {})}>
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
    borderStyle: 'dashed',
  }
});

export default NavigationNode;
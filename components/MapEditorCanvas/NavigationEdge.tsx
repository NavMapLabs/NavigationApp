import { View, StyleSheet, Pressable } from "react-native"
import React from 'react';
import { Coordinate } from '@/constants/Coordinate';
import { NavNodeType } from '@/constants/NavigationNode';
import { AppDispatch, RootState } from '@/store/datastore';
import { useDispatch, useSelector } from 'react-redux';
import { removeEdge } from "@/store/NavMapSlice";

type NavigationEdgeProps = {
    coords_1: Coordinate,
    coords_2: Coordinate,
    id1: string,
    id2: string
}

const calculateLineProperties = (coords_1:Coordinate, coords_2:Coordinate) => {
    const dx = coords_2.x - coords_1.x;
    const dy = coords_2.y - coords_1.y;
    const length = Math.sqrt(dx * dx + dy * dy);
    let angle = Math.atan2(dy, dx) * (180 / Math.PI); // Convert to degrees
  
    return { length, angle };
  };

const NavigationEdge = (props: NavigationEdgeProps) => {
    const { length, angle } = calculateLineProperties(props.coords_1, props.coords_2);
    const dispatch = useDispatch<AppDispatch>();
    const isMoveMode = useSelector((state: RootState) => state.navState.mode === 'move-node');

    const handleClick = () => {
        console.log("clicked Edge");
        dispatch(removeEdge({nodeID_1: props.id1, nodeID_2: props.id2}));
    };

    return (
        <Pressable onPress={handleClick} style={{zIndex:5}} disabled={isMoveMode} >
            <View
                style={[
                    styles.line,
                    {
                    width: length,
                    marginLeft: props.coords_1.x,
                    marginTop: props.coords_1.y,
                    transform: [{ rotate: `${angle}deg` }],
                    transformOrigin: 'left top',
                    zIndex:5
                    },
                ]}
                z-index={5}
            />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    line: {
      position: 'absolute',
      height: 3,
      backgroundColor: 'lime',
      left: "50%",
    },
  });
  
export default NavigationEdge;
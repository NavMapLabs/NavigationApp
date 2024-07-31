import { View, StyleSheet,StyleProp, ViewStyle, ImageProps, Text, Image } from "react-native"
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/datastore';
import React from "react"
import Svg, { G } from 'react-native-svg';
import Canvas from 'react-native-canvas'
import NavigationNode from './NavigationNode'
import { Dimension } from "@/constants/Dimension";


//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const NavigationNodeDisplay = ({dimension}: {dimension:Dimension}) => {
    const nodes = useSelector((state: RootState) => state.floorplan.floorplan.nodes);


    return (
      <>
        <NavigationNode x={0} y={0} dimension={dimension} />
      </>
        // <G>
        //   {nodes.map(node => (
        //     <NodeComponent key={node.id} {...node} />
        //   ))}
        // </G>
      );
}

export default NavigationNodeDisplay;
import { View, StyleSheet,StyleProp, ViewStyle, ImageProps, Text, Image } from "react-native"
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/datastore';
import React from "react"
import Svg, { G } from 'react-native-svg';
import Canvas from 'react-native-canvas'


//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const NavigationNodeDisplay = () => {
    const dispatch = useDispatch<AppDispatch>();
    const nodes = useSelector((state: RootState) => state.floorplan.floorplan.nodes);


    return (
        <G>
          {nodes.map(node => (
            <NodeComponent key={node.id} {...node} />
          ))}
        </G>
      );
}

export default NavigationNodeDisplay;
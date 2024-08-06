import { Button, View, StyleSheet,StyleProp, ViewStyle, ImageProps, Text, Image } from "react-native"
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/datastore';
import { addNode } from "@/store/actions/floorplanActions";
import React from "react"
import Svg, { G } from 'react-native-svg';
import Canvas from 'react-native-canvas'
import NavigationNode from './NavigationNode'
import { Dimension } from "@/constants/Dimension";
import { Coordinate } from "@/constants/Coordinate";


//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const NavigationNodeDisplay = ({dimension}: {dimension:Dimension}) => {
    const nodes = useSelector((state: RootState) => state.floorplan.floorplan.nodes);
    const dispatch = useDispatch<AppDispatch>();
    const handlePress = () => {
      const coords:Coordinate = {x:10, y:0}
      dispatch(addNode("TestNode", coords));
    };

    return (
      <>
      <Button title="Add Node" onPress={handlePress} />
      {
        [...nodes.entries()].map(([name, node]) => (
          <NavigationNode key={name} coords={node.coords} dimension={dimension}/>
        ))
      }
      </>
        // <G>
        //   {nodes.map(node => (
        //     <NodeComponent key={node.id} {...node} />
        //   ))}
        // </G>
      );
}

export default NavigationNodeDisplay;
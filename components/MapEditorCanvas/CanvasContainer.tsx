import { StyleProp, ViewStyle, ScrollView, StyleSheet } from "react-native";
import React, { ReactNode } from "react";
import { Coordinate } from "@/constants/Coordinate";
import { Dimension } from "@/constants/Dimension";
import AddNodeButton from "./AddNodeButton";
import Canvas from "./Canvas";

type CanvasContainerProps = {
    children: ReactNode,
    canvasStyle: StyleProp<ViewStyle>,
    offsetCoor:Coordinate,
    dimension: Dimension,
    scrollEnabled: boolean
}

// define the static canvas view wrapper in screen
const CanvasContainer = (props: CanvasContainerProps) => {
    return (
        <ScrollView style={props.canvasStyle} 
                    scrollEnabled={props.scrollEnabled}>
            <AddNodeButton/>
            <Canvas offsetCoor={props.offsetCoor}  
                       dimension={props.dimension}>
                {props.children} 
            </Canvas>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    canvas: {
        flex: 1,
        left: "50%",
        // height:"100%"
    }
});

export default CanvasContainer;
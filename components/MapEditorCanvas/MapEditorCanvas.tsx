import { View, StyleSheet,StyleProp, ViewStyle, Text, Image, ImageBackground } from "react-native"
import React, { ReactNode, useCallback } from "react"
import Canvas from 'react-native-canvas'
import Svg, { G, Circle, Rect } from 'react-native-svg';
import MapBackgroud from './MapBackgroud'
import NavigationNodeDisplay from './NavigationNodeDisplay'
import NavigationEdgeDisplay from './NavigationEdgeDisplay'
import { Coordinate } from "@/constants/Coordinate";
import { Dimension } from "@/constants/Dimension";

const MapCanvas = ({children, offsetCoor, dimension}: 
    {children: ReactNode, offsetCoor:Coordinate, dimension: Dimension}) => {
    return (
        <View style={[styles.canvas, 
            { 
                marginLeft: -dimension.width/2 + offsetCoor.x,
                marginTop: offsetCoor.y,
                width: dimension.width,
            }]} >
                {children}
        </View>
    )
}

const MapCanvasWrapper = ({children, canvasStyle, offsetCoor, dimension}: 
    {children: ReactNode, canvasStyle: StyleProp<ViewStyle>, offsetCoor:Coordinate, dimension: Dimension}) => {
    return (
        <View style={canvasStyle} >
            <MapCanvas children={children} offsetCoor={offsetCoor}  dimension={dimension}/>
        </View>
    )
}


const centerCoor:Coordinate = {x:0, y:0}
const defaultImageDimention:Dimension = {height:900, width: 900}

const MapEditorCanvas = ({canvasStyle}: {canvasStyle: StyleProp<ViewStyle>}) => {
    return (
        <MapCanvasWrapper canvasStyle = {canvasStyle} offsetCoor={centerCoor}  dimension={defaultImageDimention}>
            <MapBackgroud/>
            <NavigationNodeDisplay/>
            <NavigationEdgeDisplay/>
            <Text>Hi Honghui</Text>
        </MapCanvasWrapper>
    )
}

export default MapEditorCanvas;


const styles = StyleSheet.create({
    canvas: {
        flex: 1,
        left: "50%",
        height:"100%"
    }
})
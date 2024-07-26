import { View, StyleSheet,StyleProp, ViewStyle, Text, Image, ImageBackground } from "react-native"
import React, { ReactNode } from "react"
import Canvas from 'react-native-canvas'
import Svg, { G, Circle, Rect } from 'react-native-svg';
import MapBackgroud from './MapBackgroud'
import NavigationNodeDisplay from './NavigationNodeDisplay'
import NavigationEdgeDisplay from './NavigationEdgeDisplay'
import NavigationNode from './NavigationNode'

//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
// <G> component can accept various attributes that affect all its children
const MapCanvasWrapper = ({children, canvasStyle}: {children: ReactNode, canvasStyle: StyleProp<ViewStyle>}) => {
    return (
        <View style = {canvasStyle}>
            <Svg  width="100%" height="100%" viewBox="0 0 100 100">
                <G fill="blue" stroke="black" strokeWidth="2">
                {children}
            </G></Svg>
        </View>
    )
}

const MapEditorCanvas = ({canvasStyle}: {canvasStyle: StyleProp<ViewStyle>}) => {
    return (
        <MapCanvasWrapper canvasStyle = {canvasStyle}>
            <MapBackgroud backgroundStyle={styles.backgroundStyle} imageStyle={styles.imageStyle}/>
            {/* <NavigationNodeDisplay/> */}
            {/* <NavigationEdgeDisplay/> */}
            <NavigationNode x="50" y="10"/>
            <Circle cx="25" cy="25" r="20" />
            {/* <Rect x="50" y="10" width="30" height="30" /> */}
            <Text>Hi Honghui</Text>
        </MapCanvasWrapper>
    )
}

export default MapEditorCanvas;

const styles = StyleSheet.create({
    backgroundStyle: {
        alignItems: 'center',
        justifyContent: 'center', 
    },
    imageStyle:{
        width: 800, 
        height: 800, 
    },
})
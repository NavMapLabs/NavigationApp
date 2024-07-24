import { View, StyleSheet,StyleProp, ViewStyle, Text, Image, ImageBackground } from "react-native"
import React, { ReactNode } from "react"
import Canvas from 'react-native-canvas'
import Svg, { G } from 'react-native-svg';
import MapBackgroud from './MapBackgroud'
import NavigationNodeDisplay from './NavigationNodeDisplay'
import NavigationEdgeDisplay from './NavigationEdgeDisplay'

//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
// <G> component can accept various attributes that affect all its children
const MapCanvasWrapper = ({children, canvasStyle}: {children: ReactNode, canvasStyle: StyleProp<ViewStyle>}) => {
    return (
        <View style = {canvasStyle}>
            <Svg><G>
                {children}
            </G></Svg>
        </View>
    )
}

const MapEditorCanvas = ({canvasStyle}: {canvasStyle: StyleProp<ViewStyle>}) => {
    return (
        <MapCanvasWrapper canvasStyle = {canvasStyle}>
            <MapBackgroud backgroundStyle={styles.backgroundStyle} imageStyle={styles.imageStyle}/>
            <NavigationNodeDisplay/>
            <NavigationEdgeDisplay/>
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
        resizeMode: 'contain', 
    },
})
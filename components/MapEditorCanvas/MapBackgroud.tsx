import { View, StyleSheet,StyleProp, ViewStyle, ImageProps, Text, Image } from "react-native"
import React from "react"
import Canvas from 'react-native-canvas'


//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const MapBackground = ({backgroundStyle, imageStyle}: {backgroundStyle: StyleProp<ViewStyle>, imageStyle: ImageProps}) => {
    return (
        <View style = {backgroundStyle}>
            <Image source={require('../assets/images/sampleMap.png')} style = {imageStyle}  />
        </View>
    )
}

export default MapBackground;
import { View, StyleSheet,StyleProp, ViewStyle, ImageProps, Text, Image } from "react-native"
import React from "react"



//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const MapBackground = ({backgroundStyle, imageStyle}: {backgroundStyle: StyleProp<ViewStyle>, imageStyle: ImageProps}) => {
    const defultImage = '../../assets/images/sampleMap.png';
    
    return (
        <View style = {backgroundStyle}>
            <Image source={require(defultImage)} style={imageStyle} resizeMode='contain' />
        </View>
    )
}

export default MapBackground;
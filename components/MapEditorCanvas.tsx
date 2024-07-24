import { View, StyleSheet,StyleProp, ViewStyle, Text, Image } from "react-native"
import React from "react"
import Canvas from 'react-native-canvas'


//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const MapEditorCanvas = ({canvasStyle}: {canvasStyle: StyleProp<ViewStyle>}) => {
    return (
        <View style = {canvasStyle}>
            <View style={styles.container}>
                <Image source={require('../assets/images/sampleMap.png')} style={styles.image}  />
            </View>
        </View>
    )
}

export default MapEditorCanvas;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    image:{
        width: 800, 
        height: 800, 
        resizeMode: 'contain', 
    },
})
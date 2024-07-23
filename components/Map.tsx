import { View, Text, Image } from "react-native"
import React from "react"
import { StyleSheet } from 'react-native'
import Canvas from 'react-native-canvas'


//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const Map = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/sampleMap.png')} style={styles.image}  />
        </View>
    )
}

export default Map;

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
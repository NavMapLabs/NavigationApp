import { View, Text } from "react-native"
import React from "react"
import { StyleSheet } from 'react-native'
import Canvas from 'react-native-canvas'


//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const Map = () => {
    return (
        <View style={styles.container}>
            <View style={{width: 100, height: 300, backgroundColor: 'red'}}></View>
        </View>
    )
}

export default Map;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    }
})
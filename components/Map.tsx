import { View, Text } from "react-native"
import React from "react"
import { StyleSheet } from 'react-native';


//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const Map = () => {
    return (
        <View style={styles.container}>
            <Text>Map</Text>
        </View>
    )
}

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
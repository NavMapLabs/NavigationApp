import { View, Text, Image } from "react-native"
import React from "react"
import { StyleSheet } from 'react-native'
// import sampleMap from './assets/images/sampleMap.png'


//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const Map = () => {
    return (
        <View style={styles.container}>
            <Image source={require('../assets/images/sampleMap.png')} style={styles.image} />
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: 800,
        height: 800,
        resizeMode: 'contain',
    },
})

export default Map;
import { View, StyleSheet,StyleProp, ViewStyle, ImageProps, Text, Image } from "react-native"
import React from "react"
import { Coordinate } from "@/constants/Coordinate";
import { Dimension } from "@/constants/Dimension";


//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const MapBackground = () => {
    const defultImage = '../../assets/images/sampleMap.png';
    
    return (
        <Image 
            source={require(defultImage)} 
            style={styles.imageStyle}
            resizeMode='contain' 
        />
    )
}

export default MapBackground;


const styles = StyleSheet.create({
    imageStyle:{
        flex: 1,
        position: 'absolute',
        // left: "50%",
        // top: "50%",
        height: '90%',
        width: '100%',
    },
})
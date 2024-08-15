import { View, StyleSheet,StyleProp, ViewStyle, ImageProps, Text, Image } from "react-native"
import React from "react"
import { Coordinate } from "@/constants/Coordinate";
import { Dimension } from "@/constants/Dimension";


//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const MapBackground = ({imageURL, canvasDimension}: {imageURL:string ,canvasDimension:Dimension }) => {
    const defultImage:string = '../../assets/images/sampleMap.png';
    
    return (
        <Image 
            source={require(defultImage)} 
            style={[styles.imageStyle, {width:canvasDimension.width, height:canvasDimension.height}]}
            resizeMode='cover' 
        />
    )
}

export default MapBackground;


const styles = StyleSheet.create({
    imageStyle:{
        position: 'absolute',
        top:0,
    },
})
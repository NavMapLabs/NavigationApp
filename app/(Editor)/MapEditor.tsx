import React from "react";
import { View, StyleSheet } from 'react-native';

import NavigationBar from "../../components/NavigationBar";
import EditBar from "../../components/EditBar";
import Map from "../../components/Map";
import FloorMenu from "../../components/FloorMenu";



export default function MapEditor() {
    return (
        <View style={styles.main}>
            <View style={styles.ui}>
                <NavigationBar/>
            </View>
            <View style={styles.canvas}>
                <Map />
            </View>
            <View style={styles.ui}>
                <EditBar clickedNode={false} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
    },
    ui: {
        zIndex: 2
    },
    canvasContainer:{
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        zIndex: 1,
    },
    canvas: {
        zIndex: 1,
        height: '100%',
        width: '100%',
    }
})
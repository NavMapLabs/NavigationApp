import React from "react";
import { View, StyleSheet } from 'react-native';

import NavigationBar from "../../components/NavigationBar";
import EditBar from "../../components/EditBar";
import MapEditorCanvas from "../../components/MapEditorCanvas";
import FloorMenu from "../../components/FloorMenu";



const MapEditor = () => {
    return (
        <View style={styles.main}>
            <NavigationBar  navBarStyle={styles.ui}/>
            <MapEditorCanvas canvasStyle = {styles.canvas}/>
            <EditBar editBarStyle={styles.ui} clickedNode={false} />
        </View>
    )
}

export default MapEditor;

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
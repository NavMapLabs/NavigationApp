import React from "react";
import { View } from 'react-native';

import NavigationBar from "../../components/NavigationBar";
import EditBar from "../../components/EditBar";
import Map from "../../components/Map";
import FloorMenu from "../../components/FloorMenu";



export default function MapEditor() {
    return (
        <View style={{flex: 1}}>
            <NavigationBar />
            <Map />
            <FloorMenu />
            <EditBar /> 
        </View>
    )
}
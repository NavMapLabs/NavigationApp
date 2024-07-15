import React from "react";
import { View } from 'react-native';

import NodeEditor from "./NodeEditor";
import NavigationBar from "./NavigationBar";
import Map from "./Map";
import FloorMenu from "./FloorMenu";



export default function IndoorMapScreen() {
    return (
        <View>
            <NavigationBar />
            <NodeEditor />
            <Map />
            <FloorMenu />
        </View>
    )
}
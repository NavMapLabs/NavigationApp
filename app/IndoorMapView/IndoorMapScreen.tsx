import React from "react";
import { View } from 'react-native';

import NodeEditor from "../../components/NodeEditor";
import NavigationBar from "../../components/NavigationBar";
import Map from "../../components/Map";
import FloorMenu from "../../components/FloorMenu";



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
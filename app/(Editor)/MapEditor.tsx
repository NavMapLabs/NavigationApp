import React from "react";
import { Pressable, View } from 'react-native';

import NodeEditor from "../../components/NodeEditor";
import NavigationBar from "../../components/NavigationBar";
import Map from "../../components/Map";
import FloorMenu from "../../components/FloorMenu";

const MapEditor = () => {
    return (
        <View>
            <NavigationBar />
            <NodeEditor />
            <Map />
            <FloorMenu />
        </View>
    )
}

export default MapEditor
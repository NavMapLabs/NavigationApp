import React, { useState }  from "react";
import { View, StyleSheet, Pressable } from 'react-native';
import NavigationBar from "../../components/NavigationBar";
import EditBar from "../../components/EditBar";
import MapEditorCanvas from "../../components/MapEditorCanvas/MapEditorCanvas";
import FloorMenu from "../../components/FloorMenu";
import FilterMenu from '../../components/FilterMenu';
import SubMenu from "@/components/SubMenu";
import { MapEditorNavigationProp } from "@/constants/types";
import { useNavigation } from "@react-navigation/native"



const MapEditor = () => {
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
    const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
    const [canAddNode, setCanAddNode] = useState(false);
    const [enableSelectionTool, setEnableSelectionTool] = useState(false);
    const [isFloorMenuVisible, setIsFloorMenuVisible] = useState(false);
    const [filters, setFilters] = useState<string[]>([]);

    const toggleSubMenu = () => {
        setIsSubMenuVisible(!isSubMenuVisible);
        console.log('submenu toggled')
    }

    const toggleFilterMenu = () => {
        setIsFilterMenuVisible(!isFilterMenuVisible);
        console.log(isFilterMenuVisible)
        console.log('filter menu toggled')
    }
    
    const toggleFloorMenu = () => {
        setIsFloorMenuVisible(!isFloorMenuVisible);
        console.log(isFloorMenuVisible)
        console.log('floor menu toggled')
    }

    const applyFilters = (filters: string[]) => {
        setFilters(filters);
        console.log('filters applied')
        console.log(filters)
    }
    
    const filterOptions = ['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4', 'Filter 5'];

    return (
        <View style={styles.main}>
            <SubMenu isVisible={isSubMenuVisible} onClose={toggleSubMenu}/>
            <FilterMenu 
                isVisible={isFilterMenuVisible} 
                filters={filterOptions}
                onClose={toggleFilterMenu}
                onApplyFilters={applyFilters}
            />
            <FloorMenu
                isVisible={isFloorMenuVisible}
                onClose={toggleFloorMenu}
            />
            <NavigationBar  navBarStyle={styles.ui} 
                            toggleSubMenu={toggleSubMenu} 
                            toggleFilterMenu={toggleFilterMenu}
                            toggleFloorMenu={toggleFloorMenu}
                            overrideSelectedAction={canAddNode === true ? 'add-node' : ''}/>
            <MapEditorCanvas canvasStyle = {styles.canvas} />
            <EditBar editBarStyle={styles.ui} />
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
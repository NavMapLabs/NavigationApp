import React, { useEffect, useState }  from "react";
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import NavigationBar from "../../components/NavigationBar";
import EditBar from "../../components/EditBar";
import MapEditorCanvas from "../../components/MapEditorCanvas/MapEditorCanvas";
import FloorMenu from "../../components/FloorMenu";
import FilterMenu from '../../components/FilterMenu';
import SubMenu from "@/components/SubMenu";
import EditNodeMenu from "@/components/EditNodeMenu";

const MapEditor = () => {
    const [isSubMenuVisible, setIsSubMenuVisible] = useState(false);
    const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
    const [isFloorMenuVisible, setIsFloorMenuVisible] = useState(false);
    const [isEditNodeMenuVisible, setIsEditNodeMenuVisible] = useState(false);
    const [filters, setFilters] = useState<string[]>([]);

    const toggleSubMenu = () => {
        setIsSubMenuVisible(!isSubMenuVisible);
    }

    const toggleFilterMenu = () => {
        setIsFilterMenuVisible(!isFilterMenuVisible);
    }
    
    const toggleFloorMenu = () => {
        setIsFloorMenuVisible(!isFloorMenuVisible);
        if(isFloorMenuVisible){
            
        }
    }

    const applyFilters = (filters: string[]) => {
        setFilters(filters);
        console.log('filters applied')
        console.log(filters)
    }

    const toggleEditNodeMenu = () => {
        setIsEditNodeMenuVisible(!isEditNodeMenuVisible);
    }


    const filterOptions = ['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4', 'Filter 5'];

    return (
        <View style={styles.main} testID="MapEditor">
            <SubMenu isVisible={isSubMenuVisible} onClose={toggleSubMenu}/>
            <EditNodeMenu isVisible={isEditNodeMenuVisible} onClose={toggleEditNodeMenu}/>
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
                            toggleFloorMenu={toggleFloorMenu}/>
            <MapEditorCanvas canvasStyle = {styles.canvas} />
            <EditBar editBarStyle={styles.ui} 
                     toggleEditNodeMenu={toggleEditNodeMenu}/>
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
import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Appbar } from 'react-native-paper';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapEditorNavigationProp } from "@/constants/types";
import FilterMenu from './FilterMenu';

const NavTitle = ({title}: {title: string}) =>(
    <Appbar.Content title={title}  
        style={{ marginLeft: 0, position: 'absolute', left: 0, right: 0, zIndex: 1}} 
        titleStyle={{ alignSelf: 'center' }} />
)
// add navigation prop
const NavigationBar = ({navBarStyle}: {navBarStyle: StyleProp<ViewStyle>}) => {
    const navigation = useNavigation<MapEditorNavigationProp>();
    const screenWidth = useState(Dimensions.get('window').width);
    const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
    const [filters, setFilters] = useState<string[]>([]);

    const filterOptions = ['Filter 1', 'Filter 2', 'Filter 3', 'Filter 4', 'Filter 5'];

    useEffect(() => {
        const updateWidth = () => {
            screenWidth[1](Dimensions.get('window').width);
        }

        Dimensions.addEventListener('change', updateWidth);

        return () => {
            (Dimensions as any).removeEventListener('change', updateWidth);
        }
    },   [screenWidth])

    const updateTitle = () => {
        if(screenWidth[0] > 1000){
            return 'Map Editor'
        }
        return ''
    }

    const toggleFilterMenu = () => {
        setIsFilterMenuVisible(!isFilterMenuVisible);
        console.log(isFilterMenuVisible)
        console.log('filter menu toggled')
    }

    const applyFilters = (filters: string[]) => {
        setFilters(filters);
        console.log('filters applied')
        console.log(filters)
    }


    return (
        //change color of the header
        <View style={navBarStyle}>
            <Appbar.Header style={{backgroundColor: '#71E0BC'}}>
                <Appbar.Action icon={require('../assets/icons/submenu.png')} onPress={() => {navigation.navigate('SubMenu')}} />
                <NavTitle title={updateTitle()} />
                <Appbar.Content title='' /> 
                <Appbar.Action icon={require('../assets/icons/node.png')} onPress={() => {}} />
                <Appbar.Action icon={require('../assets/icons/move.png')} onPress={() => {}} />
                <Appbar.Action icon= 'grid' onPress={() => {}} />
                <Appbar.Action icon={require('../assets/icons/search.png')} onPress={toggleFilterMenu} />
                <Appbar.Action icon={require('../assets/icons/layer.png')} onPress={() => {}} />
            </Appbar.Header>
            <FilterMenu 
                isVisible={isFilterMenuVisible} 
                filters={filterOptions}
                onClose={toggleFilterMenu}
                onApplyFilters={applyFilters}
            />
        </View>
    )
}

export default NavigationBar;


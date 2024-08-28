import React, { useEffect, useState } from "react";
import { Appbar } from 'react-native-paper';
import { View, StyleProp, ViewStyle,  Dimensions} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MapEditorNavigationProp } from "@/constants/types";

type NavBarProps = {
    navBarStyle: StyleProp<ViewStyle>,
    toggleSubMenu: () => void
    toggleFilterMenu: () => void
    toggleFloorMenu: () => void
}

const NavTitle = ({title}: {title: string}) =>(
    <Appbar.Content title={title}  
        style={{ marginLeft: 0, position: 'absolute', left: 0, right: 0, zIndex: 1}} 
        titleStyle={{ alignSelf: 'center' }} />
)

const NavigationBar = (props: NavBarProps) => {
    const navigation = useNavigation<MapEditorNavigationProp>();
    const screenWidth = useState(Dimensions.get('window').width);
    const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
    const [filters, setFilters] = useState<string[]>([]);

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


    return (
        //change color of the header
        <View style={props.navBarStyle}>
            <Appbar.Header style={{backgroundColor: '#71E0BC'}}>
                <Appbar.Action icon={require('../assets/icons/submenu.png')} onPress={props.toggleSubMenu} />
                <NavTitle title={updateTitle()} />
                <Appbar.Content title='' /> 
                <Appbar.Action icon={require('../assets/icons/node.png')} onPress={() => {}} />
                <Appbar.Action icon={require('../assets/icons/move.png')} onPress={() => {}} />
                <Appbar.Action icon= 'grid' onPress={() => {}} />
                <Appbar.Action icon={require('../assets/icons/search.png')} onPress={props.toggleFilterMenu} />
                <Appbar.Action icon={require('../assets/icons/layer.png')} onPress={props.toggleFloorMenu} />
            </Appbar.Header>
        </View>
    )
}

export default NavigationBar;


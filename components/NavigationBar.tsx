import React, { useEffect, useState } from "react";
import { Appbar } from 'react-native-paper';
import { View, StyleProp, ViewStyle,  Dimensions} from 'react-native';
import { useSelector } from "react-redux";
import { changeMode } from "@/store/NavStateSlice";
import { AppDispatch, RootState } from '../store/datastore';
import { useDispatch } from 'react-redux';

type NavBarProps = {
    navBarStyle: StyleProp<ViewStyle>,
    toggleSubMenu: () => void,
    toggleFilterMenu: () => void,
    toggleFloorMenu: () => void
}

const NavTitle = ({title}: {title: string}) =>(
    <Appbar.Content title={title}  
        style={{ marginLeft: 0, position: 'absolute', left: 0, right: 0, zIndex: 1}} 
        titleStyle={{ alignSelf: 'center' }} />
)

const NavigationBar = (props: NavBarProps) => {
    const screenWidth = useState(Dimensions.get('window').width);
    const [isFilterMenuVisible, setIsFilterMenuVisible] = useState(false);
    const [filters, setFilters] = useState<string[]>([]);
    const mode = useSelector((state: RootState) => state.navState.mode);
    const dispatch = useDispatch<AppDispatch>();

    const [selectedAction, setSelectedAction] = useState('');

    useEffect(() => {
        const updateWidth = () => {
            screenWidth[1](Dimensions.get('window').width);
        }

        const dimensionHandler = Dimensions.addEventListener('change', updateWidth);

        return () => {
            dimensionHandler.remove();
        }
    },   [screenWidth])

    useEffect(() => {
        if(selectedAction !== 'add-node' && mode === 'add-node')
            setSelectedAction('add-node');
    }, [mode])

    const updateTitle = () => {
        if(screenWidth[0] > 1000){
            return 'Map Editor'
        }
        return ''
    }

    const enableTool = (tool: string) => {
        if(selectedAction === tool){
            setSelectedAction('');
            dispatch(changeMode({mode: 'default'}));
        }
        else {
            setSelectedAction(tool);
            dispatch(changeMode({mode: tool}));
        }
    }

    return (
        //change color of the header
        <View style={props.navBarStyle}>
            <Appbar.Header style={{backgroundColor: '#71E0BC'}}>
                <Appbar.Action icon={require('../assets/icons/submenu.png')} onPress={props.toggleSubMenu} />
                <NavTitle title={updateTitle()} />
                <Appbar.Content title='' /> 
                <Appbar.Action icon={require('../assets/icons/node.png')} onPress={() => enableTool('add-node')} color={
                    selectedAction === 'add-node' ? 'red' : 'black'
                }/>
                <Appbar.Action icon={require('../assets/icons/move.png')} onPress={() => enableTool('move-node')} color={
                    selectedAction === 'move-node' ? 'red' : 'black'   
                }/>
                <Appbar.Action icon='dots-grid' onPress={() => enableTool('multi-select')} color={
                    selectedAction === 'multi-select' ? 'red' : 'black'
                }/>
                <Appbar.Action icon= 'selection-drag' onPress={() => enableTool('selection-drag')}  color={
                    selectedAction === 'selection-drag' ? 'red' : 'black'
                }/>
                <Appbar.Action icon={require('../assets/icons/search.png')} onPress={props.toggleFilterMenu} />
                <Appbar.Action icon={require('../assets/icons/layer.png')} onPress={props.toggleFloorMenu} />
            </Appbar.Header>
        </View>
    )
}

export default NavigationBar;


import React, { useEffect, useState } from "react";
import { Dimensions } from "react-native";
import { Appbar } from 'react-native-paper';

const NavTitle = ({title}: {title: string}) =>(
    <Appbar.Content title={title}  
        style={{ marginLeft: 0, position: 'absolute', left: 0, right: 0, zIndex: -1 }} 
        titleStyle={{ alignSelf: 'center' }} />
)

export default function NavigationBar(){
    const screenWidth = useState(Dimensions.get('window').width);

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
        if(screenWidth[0] > 700){
            return 'Map Editor'
        }
        return ''
    }

    return (
        //change color of the header
        <Appbar.Header style={{backgroundColor: '#71E0BC'}}>
            <Appbar.Action icon={require('../assets/icons/submenu.png')} onPress={() => {}} />
            <NavTitle title={updateTitle()} />
            <Appbar.Content title='' /> 
            <Appbar.Action icon={require('../assets/icons/node.png')} onPress={() => {}} />
            <Appbar.Action icon={require('../assets/icons/move.png')} onPress={() => {}} />
            <Appbar.Action icon= 'grid' onPress={() => {}} />
            <Appbar.Action icon={require('../assets/icons/search.png')} onPress={() => {}} />
            <Appbar.Action icon={require('../assets/icons/layer.png')} onPress={() => {}} />
        </Appbar.Header>
    )
}


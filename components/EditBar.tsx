import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { IconButton, FAB } from 'react-native-paper';

// EditBar component, accepts a boolean value to determine if the node is clicked
export default function EditBar(clickedNode : boolean) {
    // isVisible state to determine if the edit bar is visible, default is false
    const [isVisible, setIsVisible] = React.useState(false);

    // if the node is clicked, the edit bar will be visible
    if (!clickedNode) {
        setIsVisible(!isVisible);
    }

    return (
        <View style={styles.container}> 
                <View style={styles.bottom}>
                    {isVisible && (
                        <>
                            <IconButton icon="pencil" size={24} onPress={() => console.log('pencil')} />
                            <IconButton icon="plus" size={24} onPress={() => console.log('plus')} />
                            <IconButton icon="minus" size={24} onPress={() => console.log('minus')} />
                        </>
                    )}
                    <IconButton icon="undo" size={24} onPress={() => console.log('undo')} />
                    <IconButton icon="redo" size={24} onPress={() => console.log('redo')} />
                </View>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottom: {
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
        borderRadius: 20,   
        justifyContent: 'space-evenly',
        padding: 10,
        position: 'absolute',
        width: 'auto',
        alignItems: 'center',

        bottom: 20,
    },
});
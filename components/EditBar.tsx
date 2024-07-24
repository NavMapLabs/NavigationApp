import * as React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { IconButton, FAB } from 'react-native-paper';
import { SafeAreaView  } from 'react-native-safe-area-context';

// EditBar component, accepts a boolean value to determine if the node is clicked, add a style prop
const EditBar = ({ editBarStyle, clickedNode }: {editBarStyle: StyleProp<ViewStyle>, clickedNode: boolean }) => {
    // isVisible state to determine if the edit bar is visible, default is false
    const [isVisible, setIsVisible] = React.useState(clickedNode);

    // if the node is clicked, the edit bar will be visible
    React.useEffect(() => {
        setIsVisible(clickedNode);
    }, [clickedNode]);

    return (
        <View style={editBarStyle}>
            <SafeAreaView style={styles.container}> 
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
            </SafeAreaView>
        </View>
    )
};

export default EditBar;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    bottom: {
        backgroundColor: 'lightgrey',
        flexDirection: 'row',
        borderRadius: 20,  
        padding: 10,
        position: 'absolute',
        width: 'auto',
        bottom: 80,
    },
});
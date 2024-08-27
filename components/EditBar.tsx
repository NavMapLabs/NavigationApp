import * as React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle, Image, Pressable } from 'react-native';
import { IconButton, FAB } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

// EditBar component, accepts a boolean value to determine if the node is clicked, add a style prop
const EditBar = ({ editBarStyle, clickedNode }: { editBarStyle: StyleProp<ViewStyle>, clickedNode: boolean }) => {
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

                {/* this is for share icon. separate the method later */}
                <View style={[styles.right_bottom, { marginBottom: 10, }]}>
                    <Pressable onPress={() => console.log('share')}>
                        <Image source={require('../assets/icons/share.png')}
                            style={styles.image_size} />
                    </Pressable>
                </View>

                {/* This is for the zoom icons. separate the method later */}
                <View style={[styles.right_bottom, { marginBottom: 155 }]}>
                    <Pressable onPress={() => console.log('zoom in')}>
                        <Image source={require('../assets/icons/zoomin.png')}
                            style={styles.image_size} />
                    </Pressable>

                    <View style={styles.underline}> {/* Underline */} </View>

                    <Pressable onPress={() => console.log('zoom out')}
                        style={ [{ marginLeft: 5 }, {marginTop: 3}] } // this moves to the right 
                        > 
                        <Image source={require('../assets/icons/zoomout.png')}
                            style={styles.image_size_two} />
                    </Pressable>
                </View>
            </SafeAreaView >
        </View >
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
    right_bottom: {
        backgroundColor: 'white',
        flexDirection: 'column', // this does vertical stacking
        borderRadius: 15,
        borderWidth: 2,
        borderColor: 'black',
        padding: 10,
        position: 'absolute',
        width: 'auto',
        bottom: 80,
        right: 0,
        marginRight: 20,
    },
    image_size: {
        width: 31,
        height: 31,
        resizeMode: 'contain', // this makes sure the image scales properly
    },
    image_size_two: { // this is for zoom-out cuz the image is big
        width: 23,
        height: 23,
        resizeMode: 'contain', // this makes sure the image scales properly
    },
    underline: {
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
});
import * as React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { IconButton, FAB } from 'react-native-paper';
import { SafeAreaView  } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from '../store/datastore';
import { removeNode, addEdge } from "@/store/NavMapSlice";
import { unpressNode } from "@/store/NavStateSlice";



type EditBarProps = {
    editBarStyle: StyleProp<ViewStyle>,
    canAddNode: () => void,
    //nodeID: string,
}

// EditBar component, accepts a boolean value to determine if the node is clicked, add a style prop
const EditBar = (props: EditBarProps) => {
    // isVisible state to determine if the edit bar is visible, default is false
    const isVisible = useSelector((state: any) => state.navState.pressed);
    const NodeId = useSelector((state: RootState) => state.navState.selectedNodeId);
    const isSelected = useSelector((state: RootState) => state.navState.pressed);
    const dispatch = useDispatch<AppDispatch>();

    const removeNodeEvent = () => {
        dispatch(removeNode({key: NodeId}));
        dispatch(unpressNode());
    }

    const enableAddNode = () => {
        props.canAddNode();
    }

    return (
        <View style={props.editBarStyle}>
            <SafeAreaView style={styles.container}> 
                <View style={styles.bottom}>
                    {isVisible && (
                        <>
                            <IconButton icon="pencil" size={24} onPress={() => console.log('pencil')} />
                            <IconButton icon="plus" size={24} onPress={enableAddNode} />
                            <IconButton icon="minus" size={24} onPress={removeNodeEvent} />
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
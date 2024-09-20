import * as React from 'react';
import { StyleSheet, View, StyleProp, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SafeAreaView  } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from '../store/datastore';
import { removeNode } from "@/store/NavMapSlice";
import { unpressNode, unpressSelectedNodes, changeMode } from "@/store/NavStateSlice";
import { ActionCreators as UndoActionCreators } from 'redux-undo'


type EditBarProps = {
    editBarStyle: StyleProp<ViewStyle>,
    toggleEditNodeMenu: () => void,
}

// EditBar component, accepts a boolean value to determine if the node is clicked, add a style prop
const EditBar = (props: EditBarProps) => {
    // isVisible state to determine if the edit bar is visible, default is false
    const NodeId = useSelector((state: RootState) => state.navState.selectedNodeId);
    const selectedNodeIDs = useSelector((state: RootState) => state.navState.selectedNodes);
    const isVisible = useSelector((state: RootState) => state.navState.pressed) || NodeId !== "" || selectedNodeIDs.length > 0;
    const dispatch = useDispatch<AppDispatch>();

    const removeNodeEvent = () => {
        if (selectedNodeIDs.length > 0) {
            selectedNodeIDs.forEach((nodeID) => {
                dispatch(removeNode({key: nodeID}));
            });
            dispatch(unpressSelectedNodes({nodeIDs: selectedNodeIDs}));
        }
        else if (NodeId !== "") {     
            dispatch(removeNode({key: NodeId}));
            dispatch(unpressNode());
        }
    }

    const enableAddNode = () => {
        dispatch(changeMode({mode: 'add-node'}));
    }

    const undoEvent = () => {
        dispatch(UndoActionCreators.undo());
    }

    const redoEvent = () => {
        dispatch(UndoActionCreators.redo());
    }


    return (
        <View style={props.editBarStyle}>
            <SafeAreaView style={styles.container}> 
                <View style={styles.bottom}>
                    {isVisible && (
                        <>
                            <IconButton icon="pencil" size={24} onPress={props.toggleEditNodeMenu} />
                            <IconButton icon="plus" size={24} onPress={enableAddNode} />
                            <IconButton icon="minus" size={24} onPress={removeNodeEvent} />
                        </>
                    )}
                    <IconButton icon="undo" size={24} onPress={undoEvent} />
                    <IconButton icon="redo" size={24} onPress={redoEvent} />
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
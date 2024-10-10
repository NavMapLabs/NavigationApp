import { Modal, View, StyleSheet, Pressable, Dimensions, Text, TextInput } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { AppDispatch, RootState } from "@/store/datastore";
import { useDispatch, useSelector } from "react-redux";
import { updateNodeProperties } from "@/store/NavMapSlice";
import TagOptions from "./TagOptions";
import { Picker } from '@react-native-picker/picker';

type editNodeMenuProps = {
    isVisible: boolean,
    onClose: () => void,
}

const EditNodeMenu = (props: editNodeMenuProps) => {
    const [nodeName, setNodeName] = useState('');
    const [nodeDescription, setNodeDescription] = useState('');
    const [nodeType, setNodeType] = useState('');
    const testTags = ['tag1', 'tag2', 'tag3', 'tag4', 'tag5', 'tag6', 'tag7', 'tag8', 'tag9', 'tag10'];
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    const selectedNodeID = useSelector((state: RootState) => state.navState.selectedNodeId);
    const selectedNodeIDs = useSelector((state: RootState) => state.navState.selectedNodes);
    const nodeList = useSelector((state: RootState) => state.NavMapState.present.nodes);

    const dispatch = useDispatch<AppDispatch>();

    const dimensions = Dimensions.get('window');
    const screenWidth = useState(dimensions.width);

    const updateNode = () => {
        if (selectedNodeIDs.length > 0) {
            selectedNodeIDs.forEach((nodeID) => {
                dispatch(updateNodeProperties({key: nodeID, name: nodeName, type: nodeType, desc: nodeDescription, tags: selectedTags}));
                console.log("Updated Node: " + nodeID);
                console.log("Name: " + nodeName);
                console.log("Type: " + nodeType);
                console.log("Description: " + nodeDescription);
                console.log("Tags: " + selectedTags);
            });
        }
        else if (selectedNodeID !== "") {
            dispatch(updateNodeProperties({key: selectedNodeID, name: nodeName, type: nodeType, desc: nodeDescription, tags: selectedTags}));
            console.log("Updated Node: " + selectedNodeID);
            console.log("Name: " + nodeName);
            console.log("Type: " + nodeType);
            console.log("Description: " + nodeDescription);
            console.log("Tags: " + selectedTags);
        }
        props.onClose();
    }

    useEffect(() => {
        const updateWidth = () => {
            screenWidth[1](Dimensions.get('window').width);
        }

        const dimensionHandler = Dimensions.addEventListener('change', updateWidth);

        return () => {
            dimensionHandler.remove();
        }
    },   [screenWidth])

    const updateConainerStyle = () => {
        if(screenWidth[0] > 1000){
            return styles.leftView;
        }
        return styles.bottomView;
    }

    const updateModalStyle = () => {
        if(screenWidth[0] > 1000){
            return styles.modalViewLeft;
        }
        return styles.modalViewBottom;
    }

    const addSetTag = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            selectedTags.push(tag);
        }
        setSelectedTags([...selectedTags]);
    }

    const removeSetTag = (tag: string) => {
        let index = selectedTags.indexOf(tag);
        if (index > -1) {
            selectedTags.splice(index, 1);
        }
        setSelectedTags([...selectedTags]);
    }

    const displayID = () => {
        if (selectedNodeIDs.length > 0) {
            return selectedNodeIDs.join(", ");
        }
        else if (selectedNodeID !== "") {
            return selectedNodeID;
        }
    }

    useEffect(() => {
        if (selectedNodeID !== "") {
            let node = nodeList.get(selectedNodeID);
            if (node) {
                setNodeName(node.name);
                setNodeDescription(node.description);
                setNodeType(node.type);
                setSelectedTags(node.tags);
            }
        }
        if (selectedNodeIDs.length > 0) {
            let node = nodeList.get(selectedNodeIDs[0]);
            if (node) {
                setNodeName(node.name);
                setNodeDescription(node.description);
                setNodeType(node.type);
                setSelectedTags(node.tags);
            }
        }
    }, [selectedNodeID, selectedNodeIDs]);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.isVisible}
            onRequestClose={props.onClose}
        >
            <Pressable style={updateConainerStyle} onPress={props.onClose}>
                <Pressable style={updateModalStyle} onPress={(e) => e.stopPropagation()}>
                    <Text style={styles.modalHeader}>Update Node Properties</Text>
                    <Text style={styles.modalText}>Node ID/s: {displayID()}</Text>
                    <Text>Node Name:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNodeName}
                        value={nodeName}
                        placeholder="Node Name"
                    />
                    <Text>Node Description:</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={setNodeDescription}
                        value={nodeDescription}
                        placeholder="Node Description"
                        multiline={true}
                        numberOfLines={2}
                    />
                    <Text>Node Type:</Text>
                    <Picker
                        selectedValue={nodeType}
                        onValueChange={(itemValue, itemIndex) => setNodeType(itemValue)}
                    >
                        <Picker.Item label="Entrance" value="Entrance" />
                        <Picker.Item label="Stairs" value="Stairs" />
                        <Picker.Item label="Special" value="Special" />
                        <Picker.Item label="Path" value="Path" />
                    </Picker>
                    <Text>Tags:</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap', columnGap: 
                    10, rowGap: 10, marginBottom: 10, marginTop: 10, justifyContent: 'center'
                    }}>
                        <TagOptions 
                            tags={testTags} 
                            selectedTags={selectedTags}
                            onTagPress={addSetTag}
                            onTagRemove={removeSetTag}
                        />
                    </View>
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={updateNode}
                    >
                        <Text style={styles.textStyle}>Update Node</Text>
                    </Pressable>
                    <View style={{height: 20}}/>
                </Pressable>
            </Pressable>
        </Modal>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    input : {
        height: 40,
        margin: 12,
        borderWidth: 1,
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    modalViewBottom: {
        backgroundColor: "white",
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        alignItems: "center",
        shadowColor: "#000",
    },
    modalViewLeft: {
        backgroundColor: "white",
        alignItems: "center",
        shadowColor: "#000",
        marginTop: 130,
        height: '100%',
        width: 300,
    },
    modalHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 20,
    },
    bottomView: {
        flex: 1,
        justifyContent: 'flex-end',
        zIndex: 4,
    },
    leftView: {
        flex: 1,
        justifyContent: 'center',
        zIndex: 4,
    }
});

export default EditNodeMenu;
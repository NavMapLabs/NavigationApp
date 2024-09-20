import { Modal, View, StyleSheet, Pressable, Animated, Text, TextInput } from "react-native";
import React, { useState, useRef, useEffect } from "react";
import { AppDispatch, RootState } from "@/store/datastore";
import { useDispatch, useSelector } from "react-redux";
import { updateNodeProperties } from "@/store/NavMapSlice";
import TagOptions from "./TagOptions";
import { set } from "immutable";

type editNodeMenuProps = {
    isVisible: boolean,
    onClose: () => void,
}

const EditNodeMenu = (props: editNodeMenuProps) => {
    const [nodeName, setNodeName] = useState('');
    const [nodeDescription, setNodeDescription] = useState('');
    const testTags = ['tag1', 'tag2', 'tag3'];
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    
    const selectedNodeID = useSelector((state: RootState) => state.navState.selectedNodeId);
    const selectedNodeIDs = useSelector((state: RootState) => state.navState.selectedNodes);
    const nodeList = useSelector((state: RootState) => state.NavMapState.present.nodes);

    const dispatch = useDispatch<AppDispatch>();

    const resetData = () => {
        setNodeName('');
        setNodeDescription('');
        setSelectedTags([]);
    }

    const updateNode = () => {
        if (selectedNodeIDs.length > 0) {
            selectedNodeIDs.forEach((nodeID) => {
                dispatch(updateNodeProperties({key: nodeID, name: nodeName, desc: nodeDescription, tags: selectedTags}));
                console.log("Updated Node: " + nodeID);
                console.log("Name: " + nodeName);
                console.log("Description: " + nodeDescription);
                console.log("Tags: " + selectedTags);
            });
        }
        else if (selectedNodeID !== "") {
            dispatch(updateNodeProperties({key: selectedNodeID, name: nodeName, desc: nodeDescription, tags: selectedTags}));
            console.log("Updated Node: " + selectedNodeID);
            console.log("Name: " + nodeName);
            console.log("Description: " + nodeDescription);
            console.log("Tags: " + selectedTags);
        }
        props.onClose();
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
                setSelectedTags(node.tags);
            }
        }
        else if (selectedNodeIDs.length > 0) {
            let name = nodeList.get(selectedNodeIDs[0])?.name;
            let desc = nodeList.get(selectedNodeIDs[0])?.description;
            let tags = nodeList.get(selectedNodeIDs[0])?.tags;
            if (name && desc && tags) {
                setNodeName(name);
                setNodeDescription(desc);
                setSelectedTags(tags);
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
            <Pressable style={styles.centeredView} onPress={props.onClose}>
                <Pressable style={styles.modalView} onPress={(e) => e.stopPropagation()}>
                    <Text style={styles.modalText}>Update Node Properties</Text>
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
                    <Text>Tags:</Text>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
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
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    }
});

export default EditNodeMenu;
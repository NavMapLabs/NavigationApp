import { Text, View, StyleSheet, Pressable, Modal } from "react-native"
import React, { useState } from "react";
import { TextInput as PaperTextInput, IconButton } from 'react-native-paper';
import {Checkbox} from 'react-native-paper';
import { map_meta_info } from "./BackendFunc";
import { createMap, updateMap, deleteMap, craftCreateJsonObject, craftUpdateJsonObject } from "./BackendFunc";


export type SubmitProps = {
    // comment out props should be added in next version, right now the operation is doen by checkbox, but it should be decided by the button in the map editor page
    // operation: string,
    isVisible: boolean,
    // hasMapId: boolean,
    // isNewMap: boolean,
    onClose: () => void
}


// map_meta_info should be passed in from the editor page, and act as default value. the text box is for editing these meta data if needed 
const SubmissionModal = (props: SubmitProps & {map_Info: map_meta_info} ) => {
    //for testing only, add check box and map_id
    const [isNewMap, setIsNewMap] = useState(false);
    const [isNewVersion, setIsNewVersion] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [isOldVersion, setIsOldVersion] = useState(false);
    const [mapIdText, setMapIdText] = useState('');
    const [mapIdBorderColor, setMapIdBorderColor] = useState('gray');
    // end of testing
    const [mapNameText, setMapNameText] = useState('');
    const [versionNameText, setVersionNameText] = useState('');
    const [mapAddrText, setMapAddrText] = useState('');
    const [mapDescriptionText, setMapDescriptionText] = useState('');
    
    
    const [mapNameBorderColor, setMapNameBorderColor] = useState('gray');
    const [versionNameBorderColor, setVersionNameBorderColor] = useState('gray');
    const [addressBorderColor, setAddressBorderColor] = useState('gray');
    const [descriptionBorderColor, setDescriptionBorderColor] = useState('gray');
    // decide what backend function to call based on the prop criteria, for now I cannot lock any textbox becuse no meta data is passed in


    var canEditAddress: boolean = false;
    

    return (
        <Modal
            transparent={true}
            animationType="fade"
            visible={props.isVisible}
            onRequestClose={props.onClose}
        >
            <Pressable style={styles.container} onPress={props.onClose}>
                <Pressable style={styles.box} onPress={(e) => e.stopPropagation()} >
                    <View style={styles.header}>
                        <IconButton icon="close" size={24} onPress={props.onClose} />
                    </View>
                    
                    <Text> checkbox and id only for testing</Text>
                    <Text style={styles.label}>Map Id</Text>
                    <PaperTextInput
                        style={[styles.paperInput, { borderColor: mapIdBorderColor }]}
                        onFocus={() => setMapIdBorderColor('black')} // border color on focus
                        onBlur={() => setMapIdBorderColor('gray')}  // border color on focus

                        placeholder='id'
                        placeholderTextColor="#a9a9a9"
                        value={mapIdText}
                        onChangeText={setMapIdText}

                        theme={{ colors: { primary: "transparent" } }} // this removes the underline
                        underlineColor="transparent"  // this removes the any extra underline
                    />
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                        status={isNewMap ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setIsNewMap(!isNewMap);
                          setIsDelete(false);
                          setIsNewVersion(false);
                          setIsOldVersion(false);
                        }}
                        color="blue" // Optional: Customize the color
                      />
                        <Text style={styles.checkboxLabel}> Upload new map</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                        status={isNewVersion ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setIsNewMap(false);
                          setIsDelete(false);
                          setIsNewVersion(!isNewVersion);
                          setIsOldVersion(false);
                        }}
                        color="blue" // Optional: Customize the color
                      />
                        <Text style={styles.checkboxLabel}> Upload new version</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                        status={isOldVersion ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setIsNewMap(false);
                          setIsDelete(false);
                          setIsNewVersion(false);
                          setIsOldVersion(!isOldVersion);
                        }}
                        color="blue" // Optional: Customize the color
                      />
                        <Text style={styles.checkboxLabel}> Upload existing version</Text>
                    </View>
                    <View style={styles.checkboxContainer}>
                        <Checkbox
                        status={isDelete ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setIsNewMap(false);
                          setIsDelete(!isDelete);
                          setIsNewVersion(false);
                          setIsOldVersion(false);
                        }}
                        color="blue" // Optional: Customize the color
                      />
                        <Text style={styles.checkboxLabel}> Delete map</Text>
                    </View>



                    <Text style={styles.label}>Map Name</Text>
                    <PaperTextInput
                        style={[styles.paperInput, { borderColor: mapNameBorderColor }]}
                        onFocus={() => setMapNameBorderColor('black')} // border color on focus
                        onBlur={() => setMapNameBorderColor('gray')}  // border color on focus

                        placeholder='Value'
                        placeholderTextColor="#a9a9a9"
                        value={mapNameText}
                        onChangeText={setMapNameText}

                        theme={{ colors: { primary: "transparent" } }} // this removes the underline
                        underlineColor="transparent"  // this removes the any extra underline
                      
                    />
                    <Text style={styles.label}>Version Name</Text>
                    <PaperTextInput
                        style={[styles.paperInput, { borderColor: versionNameBorderColor }]}
                        onFocus={() => setVersionNameBorderColor('black')} // border color on focus
                        onBlur={() => setVersionNameBorderColor('gray')}  // border color on focus

                        placeholder='Value'
                        placeholderTextColor="#a9a9a9"
                        value={versionNameText}
                        onChangeText={setVersionNameText}

                        theme={{ colors: { primary: "transparent" } }} // this removes the underline
                        underlineColor="transparent"  // this removes the any extra underline
                      
                    />
                    <Text style={styles.label}>Map Address</Text>
                    <PaperTextInput
                        style={[styles.paperInput, { borderColor: addressBorderColor }]}
                        onFocus={() => setAddressBorderColor('black')} // border color on focus
                        onBlur={() => setAddressBorderColor('gray')}  // border color on focus

                        placeholder='Value'
                        placeholderTextColor="#a9a9a9"
                        value={mapAddrText}
                        onChangeText={setMapAddrText}

                        theme={{ colors: { primary: "transparent" } }} // this removes the underline
                        underlineColor="transparent"  // this removes the any extra underline
                      
                    />
                    <Text style={styles.label}>Map Description</Text>
                    <PaperTextInput
                        style={[styles.paperInput, { borderColor: descriptionBorderColor }]}
                        onFocus={() => setDescriptionBorderColor('black')} // border color on focus
                        onBlur={() => setDescriptionBorderColor('gray')}  // border color on focus

                        placeholder='Value'
                        placeholderTextColor="#a9a9a9"
                        value={mapDescriptionText}
                        onChangeText={setMapDescriptionText}

                        theme={{ colors: { primary: "transparent" } }} // this removes the underline
                        underlineColor="transparent"  // this removes the any extra underline
                      
                    />
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            //
                            /* handle action here */
                            var data;
                            props.map_Info.mapAddr = mapAddrText;
                            props.map_Info.mapDescription = mapDescriptionText;
                            props.map_Info.mapId = mapIdText;
                            props.map_Info.mapName = mapNameText;
                            props.map_Info.versionName = versionNameText;
                            console.log(props.map_Info.versionName)
                            if (isDelete){
                                deleteMap(mapIdText)
                            }
                            else if (isNewMap){
                                data = craftCreateJsonObject(props.map_Info)
                                createMap(data)
                            }
                            else if (isNewVersion){
                                data = craftUpdateJsonObject(props.map_Info, true)
                                updateMap(data)
                            }
                            else if (isOldVersion){
                                data = craftUpdateJsonObject(props.map_Info, false)
                                updateMap(data)
                            }
                        }}
                    >
                        <Text style={styles.buttonText}>Sumbmit</Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)', // making the background page transparent
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        width: 400,
        alignItems: "center",
    },
    underline: {
        textDecorationLine: 'underline',
        color: 'black', // set this color of the underline 'black'
    },
    button: {
        backgroundColor: '#71E0BC',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        width: 350,
    },
    buttonText: {
        color: 'black', // Set the text color to black
    },
    textSpace: {
        marginTop: 4, // Space before text
        marginBottom: 8, // Space after text
    },
    label: {
        alignSelf: 'flex-start', // align labels to the start
        marginLeft: 10, // Add some margin to the left to match the input margin
        marginBottom: 1, // Space between label and input
    },
    icon: {
        marginTop: 20,
    },
    paperInput: {
        borderWidth: 2,
        borderColor: '#777',
        backgroundColor: 'white',
        paddingHorizontal: 9,
        paddingVertical: 8,
        margin: 10,
        borderRadius: 6,
        width: 350,
        height: 23,
        // this adjust font size and line height to the standard
        fontSize: 14,
    },
    header: {
        width: '100%',
        height: 15,
        alignItems: "flex-end",
        justifyContent: 'center',
        marginLeft: 30,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    checkboxLabel: {
        fontSize: 10,
        color: '#333',
    },
});

export default SubmissionModal;

// use home to test or some "main" page
// plan 
// todo list
// display default value -> addr
// make some textbox not editable -> 
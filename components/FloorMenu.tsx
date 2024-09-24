import { View, StyleSheet, Modal, Pressable, Image } from "react-native";
import React from "react";
import { changeMode } from "@/store/NavStateSlice";
import { AppDispatch} from '../store/datastore';
import { useDispatch } from 'react-redux';

type FloorMenuProps = {
    isVisible: boolean,
    onClose: () => void,
}

const FloorMenu = (props: FloorMenuProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const closeMenu = () => {
        props.onClose();
        dispatch(changeMode({mode: 'default'}));
    }

    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={props.isVisible}
            onRequestClose={props.onClose}
        >
            <Pressable style={styles.modalOverlay} onPress={closeMenu}>
                <View style={styles.menu}>
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        {/* work on this. this is just base version */}
                            <Image source={require('../assets/images/sampleMap.png')}
                                style={styles.image_size_two} />

                            <Pressable onPress={() => console.log('add')}>
                                <Image source={require('../assets/icons/add.png')}
                                    style={styles.image_size} />
                            </Pressable>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        paddingTop: 50, // Adjust to match the height of the top navigation
    },
    menu: {
        backgroundColor: 'lightgrey',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
        marginTop: 15,
    },
    image_size: {
        width: 40,
        height: 40,
        resizeMode: 'contain', // this makes sure the image scales properly
        marginLeft: 100,
        marginRight: 70,
    },
    image_size_two: {
        width: 300,
        height: 300,
        resizeMode: 'contain', // this makes sure the image scales properly
    },
});

export default FloorMenu;
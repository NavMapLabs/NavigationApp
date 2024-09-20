import { View, StyleSheet, Modal, Pressable, Image } from "react-native"
import React from "react"

type FloorMenuProps = {
    isVisible: boolean,
    onClose: () => void,
}

const FloorMenu = (props: FloorMenuProps) => {
    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={props.isVisible}
            onRequestClose={props.onClose}
        >
            <Pressable style={styles.modalOverlay} onPress={props.onClose}>
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
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        marginRight: 10,
        marginTop: 10,
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
import { View, Text, StyleSheet, Modal, Pressable } from "react-native"
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

                        {/* work on this */}

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
        backgroundColor: 'white',
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
});

export default FloorMenu;
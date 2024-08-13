import { Modal, View, StyleSheet, Pressable } from "react-native";
import { Drawer } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import LogInModal from "@/app/(Auth)/LogInModal";
import SignUpModal from "@/app/(Auth)/SignUpModal";

type SubMenuProps = {
    isVisible: boolean,
    onClose: () => void
}

// make this sub menu be set to the left side of the screen 
const SubMenu = (props: SubMenuProps) => {
    const [isLogInVisible, setLogInVisible] = useState(false);
    const [isSignUpVisible, setSignUpVisible] = useState(false);

    const toggleLogIn = () => {
        setLogInVisible(!isLogInVisible);
    }

    const toggleSignUp = () => {
        setSignUpVisible(!isSignUpVisible);
    }


    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={props.isVisible}
            onRequestClose={props.onClose}
        >
            <Pressable style={styles.container} onPress={props.onClose}>
                <Pressable style={styles.left_side} onPress={(e) => e.stopPropagation()}>
                    <Drawer.Section title="MENU">
                        <Drawer.Item
                            style={[styles.box, styles.TextSpace]}
                            label="Log in"
                            onPress={() => {
                                toggleLogIn();
                                console.log("Login Pressed")
                            }}
                        />
                        <Drawer.Item
                            style={[styles.box, styles.BigSpace]}
                            label="Sign up"
                            onPress={() => {
                                toggleSignUp();
                                console.log("Signup Pressed")
                            }}
                        />
                        <Drawer.Item
                            style={[styles.box, styles.TextSpace]}
                            label="New"
                            onPress={() => { }}
                        />
                        <Drawer.Item
                            style={[styles.box, styles.TextSpace]}
                            label="Save"
                            onPress={() => { }}
                        />
                        <Drawer.Item
                            style={[styles.box, styles.TextSpace]}
                            label="Save & Exit"
                            onPress={() => { }}
                        />
                        <Drawer.Item
                            style={[styles.box, styles.TextSpace]}
                            label="Exit"
                            onPress={() => { }}
                        />
                    </Drawer.Section>
                </Pressable>
            </Pressable>

            {/* LogInScreen Modal */}
            <LogInModal
                isVisible={isLogInVisible}
                onClose={toggleLogIn}
                toggleSignUp={toggleSignUp}
            />

            {/* SignUpScreen Modal */}
            <SignUpModal
                isVisible={isSignUpVisible}
                onClose={toggleSignUp}
                toggleLogIn={toggleLogIn}
            />
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // make background color transparent
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    left_side: {
        position: 'absolute',
        top: '0%',
        left: '0%',
        height: '100%',
        backgroundColor: '#71E0BC',
        padding: 5,
        width: 200, // maybe change this width(?)
    },
    box: {
        left: -17,
        backgroundColor: '#57ad91', // darker shade
        width: 200,
        borderRadius: 0,
    },
    TextSpace: {
        marginBottom: 1,
    },
    BigSpace: {
        marginBottom: 60,
    },
});

export default SubMenu;

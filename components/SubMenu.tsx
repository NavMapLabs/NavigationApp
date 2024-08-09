import { Modal, View, StyleSheet, Pressable } from "react-native";
import { Drawer } from 'react-native-paper';
import { SubMenuNavigationProp } from "@/constants/types"; // this is the identity
import { useNavigation } from '@react-navigation/native';
import React, { useState } from "react";
import LogInScreen from "@/app/(Auth)/LogIn";
import SignUpScreen from "@/app/(Auth)/SignUp";

type SubMenuProps = {
    isVisible: boolean,
    onClose: () => void
}

// make this sub menu be set to the left side of the screen 
const SubMenu = (props: SubMenuProps) => {
    const navigation = useNavigation<SubMenuNavigationProp>(); // this gives you access to the hook
    const [isLogInVisible, setLogInVisible] = useState(false);
    const [isSignUpVisible, setSignUpVisible] = useState(false);

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
                                setLogInVisible(!isLogInVisible); // this shows LogInScreen modal
                                console.log("Login Pressed")
                            }}
                        />
                        <Drawer.Item
                            style={[styles.box, styles.BigSpace]}
                            label="Sign up"
                            onPress={() => {
                                setSignUpVisible(!isSignUpVisible); // this shows SignUpScreen modal
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
            <LogInScreen
                isVisible={isLogInVisible}
                onClose={() => setLogInVisible(false)}
            />

            {/* SignUpScreen Modal */}
            <SignUpScreen
                isVisible={isSignUpVisible}
                onClose={() => setSignUpVisible(false)}
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

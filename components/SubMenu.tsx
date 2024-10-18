import { Modal, View, StyleSheet, Pressable, Animated } from "react-native";
import { Drawer } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from "react";
import LogInModal from "@/app/(Auth)/LogInModal";
import SignUpModal from "@/app/(Auth)/SignUpModal";

type SubMenuProps = {
    isVisible: boolean,
    onClose: () => void
}

// make this sub menu be set to the left side of the screen 
const SubMenu = (props: SubMenuProps) => {
    const [isLogInVisible, setLogInVisible] = useState(false)
    const [isSignUpVisible, setSignUpVisible] = useState(false)
    const slideAnimation = useRef(new Animated.Value(-200)).current;

    const navigation = useNavigation();

    const toggleLogIn = () => {
        setLogInVisible(!isLogInVisible);
    }

    const toggleSignUp = () => {
        setSignUpVisible(!isSignUpVisible);
    }

    const openSubmenu =
        Animated.timing(slideAnimation, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        });

    const closeSubmenu =
        Animated.timing(slideAnimation, {
            toValue: -200,
            duration: 200,
            useNativeDriver: true,
        });

    useEffect(() => {
        if (props.isVisible) {
            openSubmenu.start();
        } else {
            closeSubmenu.start();
        }
    }, [props.isVisible]);

    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={props.isVisible}
            onRequestClose={props.onClose}
        >
            <Pressable style={styles.container} onPress={props.onClose}>
                <Animated.View style={[styles.left_side, { transform: [{ translateX: slideAnimation }] }]}>
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
                                label="Project Gallery"
                                onPress={() => {
                                    navigation.navigate('Gallery');
                                 }}
                            />
                             <Drawer.Item
                                style={[styles.box, styles.TextSpace]}
                                label="Search History"
                                onPress={() => {
                                    navigation.navigate('SearchHistory');
                                 }}
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
                </Animated.View>
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

            {/* GalleryScreen Modal */}
           
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

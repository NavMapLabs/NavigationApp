import { Text, View, TextInput, StyleSheet, Pressable, Modal } from "react-native"
import React, { useState } from "react";
import { TextInput as PaperTextInput } from 'react-native-paper';

type SignUpProps = {
    isVisible: boolean,
    onClose: () => void
    toggleLogIn: () => void
}

const SignUpModal = (props: SignUpProps) => {
    const [emailText, setEmailText] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(true);
    const [reEnterPasswordVisible, setReEnterPasswordVisible] = useState(true);

    const [emailBorderColor, setEmailBorderColor] = useState('gray');
    const [passwordbBorderColor, setPasswordBorderColor] = useState('gray');
    const [ReEnterPasswordbBorderColor, setReEnterPasswordBorderColor] = useState('gray');

    return (
        <Modal
            transparent={true}
            animationType="none"
            visible={props.isVisible}
            onRequestClose={props.onClose}
        >
            <Pressable style={styles.container} onPress={props.onClose}>
                <Pressable style={styles.box} onPress={(e) => e.stopPropagation()}>
                    <Text style={styles.label}>Email</Text>
                    <PaperTextInput
                        style={[styles.paperInput, { borderColor: emailBorderColor }]}
                        onFocus={() => setEmailBorderColor('black')} // border color on focus
                        onBlur={() => setEmailBorderColor('gray')}  // border color on focus

                        placeholder='Value'
                        placeholderTextColor="#a9a9a9"
                        value={emailText}
                        onChangeText={setEmailText}

                        theme={{ colors: { primary: "transparent" } }} // this removes the underline
                        underlineColor="transparent"
                    /* obtain data here */
                    />
                    <Text style={styles.label}>Password</Text>
                    <PaperTextInput
                        style={[styles.paperInput, { borderColor: passwordbBorderColor }]}
                        onFocus={() => setPasswordBorderColor('black')} // border color on focus
                        onBlur={() => setPasswordBorderColor('gray')}  // border color on focus

                        placeholder='Value'
                        placeholderTextColor="#a9a9a9"
                        secureTextEntry={passwordVisible}
                        value={password}
                        onChangeText={setPassword}
                        right={
                            <PaperTextInput.Icon
                                icon={passwordVisible ? 'eye' : 'eye-off'}
                                onPress={() => setPasswordVisible(!passwordVisible)}
                                style={styles.icon} // this adjusts eye icon position
                            />
                        }
                        theme={{ colors: { primary: "transparent" } }} // this removes the underline
                        underlineColor="transparent"
                    /* obtain data here */
                    />
                    <Text style={styles.label}>Re-enter Password</Text>
                    <PaperTextInput
                        style={[styles.paperInput, { borderColor: ReEnterPasswordbBorderColor }]}
                        onFocus={() => setReEnterPasswordBorderColor('black')} // border color on focus
                        onBlur={() => setReEnterPasswordBorderColor('gray')}  // border color on focus

                        placeholder='Value'
                        placeholderTextColor="#a9a9a9"
                        secureTextEntry={reEnterPasswordVisible}
                        value={reEnterPassword}
                        onChangeText={setReEnterPassword}
                        right={
                            <PaperTextInput.Icon
                                icon={reEnterPasswordVisible ? 'eye' : 'eye-off'}
                                onPress={() => setReEnterPasswordVisible(!reEnterPasswordVisible)}
                                style={styles.icon} // this adjusts eye icon position
                            />
                        }
                        theme={{ colors: { primary: "transparent" } }} // this removes the underline
                        underlineColor="transparent"
                    /* obtain data here */
                    />
                    <Pressable
                        style={styles.button}
                        onPress={() => {
                            /* handle action here */
                        }}
                    >
                        <Text style={styles.buttonText}>Sign In</Text>
                    </Pressable>
                    <Text
                        style={[styles.underline, styles.textSpace]}
                        onPress={() => {
                            props.toggleLogIn();
                            console.log("Login Pressed")
                            props.onClose();
                        }}
                    >
                        Already have an account? Login here!
                    </Text>
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
        alignItems: 'center',
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
    label: {
        alignSelf: 'flex-start', // align labels to the start
        marginLeft: 10, // Add some margin to the left to match the input margin
        marginBottom: 5, // Space between label and input
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
        // this adjust font size to to the standard
        fontSize: 14,
    },
    underline: {
        textDecorationLine: 'underline',
        color: 'black', // set this color of the underline 'black'
    },
    textSpace: {
        marginTop: 3, // Space before text
    },
});

export default SignUpModal;

/* self-note:
when clocking the navigation 'link',
it erases the most components from the main background. figure out how to prevent that.
setvisible prolly would work for the 'link' (?)
*/
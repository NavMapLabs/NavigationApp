import { Text, View, StyleSheet, Pressable} from "react-native"
import React, { useState } from "react";
import { TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native"
import { AuthError } from 'firebase/auth';

import { SignUpScreenNavigationProp } from "@/constants/types";
import { signUp } from "./firebaseAuth";

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [reEnterPassword, setReEnterPassword] = useState("");

    const [passwordVisible, setPasswordVisible] = useState(true);
    const [reEnterPasswordVisible, setReEnterPasswordVisible] = useState(true);

    const [emailBorderColor, setEmailBorderColor] = useState('gray');
    const [passwordbBorderColor, setPasswordBorderColor] = useState('gray');
    const [ReEnterPasswordbBorderColor, setReEnterPasswordBorderColor] = useState('gray');

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const navigation = useNavigation<SignUpScreenNavigationProp>();

    // Function to handle user creation
    const handleSignUp = async () => {
        try {
            const user = await signUp(email, password, reEnterPassword)
            if(user) {
                //use saveUserData from firebase if needed
                const id = user.uid;
            }
            //should navigate to a loading screen, or ask to verify first before doing anything
        } catch (error: unknown) {
            if ((error as AuthError).code === 'auth/email-already-in-use') {
                alert('Email already in use');
            } else if ((error as AuthError).code === 'auth/weak-password') {
                alert('Weak Password. Please choose a stronger password')
            } else {
                alert("Signup error: " + (error as Error).message)
            }
    };
}

    return (
        <View
            style={styles.container}>
            <View
                style={styles.box}>
                <Text style={styles.label}>Email</Text>
                <PaperTextInput
                    style={[styles.paperInput, { borderColor: emailBorderColor }]}
                    onFocus={() => setEmailBorderColor('black')} // border color on focus
                    onBlur={() => setEmailBorderColor('gray')}  // border color on focus

                    placeholder='Value'
                    placeholderTextColor="#a9a9a9"
                    value={email}
                    onChangeText={setEmail}

                    theme={{ colors: { primary: "transparent" } }} // this removes the underline
                    underlineColor="transparent"
                // obtain data here
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
                // obtain data here
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
                // obtain data here
                />
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        handleSignUp()
                    }}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    box: {
        backgroundColor: 'gray', // change this color to white later once we have the overall background
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
});


/*
fix the padding on the labels
*/

export default SignUpScreen;
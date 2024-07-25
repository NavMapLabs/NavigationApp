import { Text, View, TextInput, StyleSheet, Button } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native"
import { AuthError } from 'firebase/auth';

import { SignUpScreenNavigationProp } from "@/constants/types";
import { signUp } from "./firebaseAuth";

const SignUpScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [showPassword, setShowPassword] = useState(false)

    const navigation = useNavigation<SignUpScreenNavigationProp>();

    // Function to handle user creation
    const handleSignUp = async () => {
        try {
            const user = await signUp(email, password, rePassword)
            if(user) {
                //use saveUserData from firebase if needed
                const id = user.uid;
            }
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
                <TextInput
                    style={styles.input}
                    placeholder='Value'
                    placeholderTextColor="#a9a9a9"
                    value={email}
                    onChangeText={setEmail}
                    // obtain data here
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    secureTextEntry={!showPassword} 
                    style={styles.input}
                    placeholder='Value'
                    placeholderTextColor="#a9a9a9"
                    value={password}
                    onChangeText={setPassword}
                    // obtain data here
                />
                <Text style={styles.label}>Re-enter Password</Text>
                <TextInput
                    secureTextEntry={!showPassword} 
                    style={styles.input}
                    placeholder='Value'
                    placeholderTextColor="#a9a9a9"
                    value={rePassword}
                    onChangeText={setRePassword}
                    // obtain data here
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        handleSignUp()
                    }}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>
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
    input: {
        borderWidth: 1,
        borderColor: '#777',
        backgroundColor: 'white',
        padding: 8,
        margin: 10,
        borderRadius: 10,
        width: 350,
    },
    box: {
        // borderWidth: 1,      --> un-comment this later to check
        // borderColor: '#777', --> un-comment this later to check
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
        // fontSize: 10, --> change font size if needed
    },
    label: {
        alignSelf: 'flex-start', // align labels to the start
        marginLeft: 10, // Add some margin to the left to match the input margin
        marginBottom: 5, // Space between label and input
    },
});

/*
fix the padding on the labels
*/

export default SignUpScreen;
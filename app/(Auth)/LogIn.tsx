import { Text, View, TextInput, StyleSheet } from "react-native"
import { Link } from "expo-router"
import { TouchableOpacity } from "react-native-gesture-handler";
import React, { useState } from "react";
import { Auth, AuthError, signInWithEmailAndPassword, User } from "firebase/auth";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '@/constants/types';
import { emailVerification, logIn, logOut } from "./firebaseAuth";

type LogInScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LogInScreen'>;

const LogInScreen: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [showPassword, setShowPassword] = useState(false)

    const navigation = useNavigation<LogInScreenNavigationProp>();
    
    const handleLogIn = async () => {
        try {
            const user = await logIn(email, password)
            await checkIfEmailVerified(user)

        } catch (error: unknown) {
            if (
                (error as AuthError).code === "auth/user-not-found" ||
                (error as AuthError).code === "auth/wrong-password"
            ) {
                alert('Email already in use');
            } else if ((error as AuthError).code === "auth/too-many-request") {
                alert("Too many unsuccessful login attempts. Please try again later.")
            } else {
                alert("Sign In error: " + (error as Error).message)
            }
        }
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        handleLogIn()
                    }}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <Text style={styles.textSpace}>
                    <Text style={styles.underline}>
                        Forgot password?
                    </Text>
                </Text>
                <Text style={styles.underline}>
                    <Link href="/(Auth)/SignUp">
                        Need an account? Sign-up here.
                    </Link>
                </Text>
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
        // fontSize: 10, --> change font size if needed
    },
    textSpace: {
        marginTop: 8, // Space before text
        marginBottom: 8, // Space after text
    },
    label: {
        alignSelf: 'flex-start', // align labels to the start
        marginLeft: 10, // Add some margin to the left to match the input margin
        marginBottom: 5, // Space between label and input
    }
});

/*
Self-Note:
re-adjust the link to the left
fix the padding on the labels
*/

const checkIfEmailVerified = async (user: User) => {
    const navigation = useNavigation();

    if(user) {
        if(!user.emailVerified)
        // means that user is still not verified yet, need them to be verified
        await emailVerification()
        await logOut();

        // navigation.navigate("index");
    } else {
        throw new Error("Failed to check User")
    }
}

export default LogInScreen
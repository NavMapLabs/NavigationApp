import { Text, View, StyleSheet, Pressable } from "react-native"
import React, { useState } from "react";
import { TextInput as PaperTextInput } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { LogInScreenNavigationProp } from "@/constants/types"; // this is the identity 

export default function LogInScreen() {
    const [emailText, setEmailText] = useState('');
    const [passwordText, setPasswordText] = useState('');

    const [passwordVisible, setPasswordVisible] = useState(true);

    const [emailBorderColor, setEmailBorderColor] = useState('gray');
    const [PasswordBorderColor, setPasswordBorderColor] = useState('gray');

    const navigation = useNavigation<LogInScreenNavigationProp>(); // this gives you access to the hook

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
                    value={emailText}
                    onChangeText={setEmailText}

                    theme={{ colors: { primary: "transparent" } }} // this removes the underline
                    underlineColor="transparent"  // this removes the any extra underline
                // obtain data here
                />
                <Text style={styles.label}>Password</Text>
                <PaperTextInput
                    style={[styles.paperInput, { borderColor: PasswordBorderColor }]}
                    onFocus={() => setPasswordBorderColor('black')} // border color on focus
                    onBlur={() => setPasswordBorderColor('gray')}  // border color on focus

                    placeholder='Value'
                    placeholderTextColor="#a9a9a9"
                    secureTextEntry={passwordVisible}
                    value={passwordText}
                    onChangeText={setPasswordText}
                    right={
                        <PaperTextInput.Icon
                            icon={passwordVisible ? 'eye' : 'eye-off'}
                            onPress={() => setPasswordVisible(!passwordVisible)}
                            style={styles.icon} // this adjusts eye icon position
                        />
                    }
                    theme={{ colors: { primary: "transparent" } }} // this removes the underline
                    underlineColor="transparent" // this removes any extra underline
                // obtain data here
                />
                <Pressable
                    style={styles.button}
                    onPress={() => {
                        // handle sign-in action here
                    }}
                >
                    <Text style={styles.buttonText}>Sign In</Text>
                </Pressable>
                <Text
                    style={styles.textSpace}>
                    <Text
                        style={styles.underline}>
                        Forgot password?
                    </Text>
                </Text>
                <Text
                    style={styles.underline}
                    onPress={() => {
                        navigation.navigate('SignUpScreen')
                        console.log("Pressed")
                    }}
                >
                    Need an account? Sign-up here.
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
    box: {
        backgroundColor: 'gray', // change this color to white later once we have the overall background
        borderRadius: 10,
        padding: 15,
        width: 400,
        alignItems: "center",
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
    },
    textSpace: {
        marginTop: 4, // Space before text
        marginBottom: 8, // Space after text
    },
    label: {
        alignSelf: 'flex-start', // align labels to the start
        marginLeft: 10, // Add some margin to the left to match the input margin
        marginBottom: 1, // Space between label and input
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
        // this adjust font size and line height to the standard
        fontSize: 14,
    },
});

/* self-note
3. use navigation for link
 */

import { Text, View, TextInput, StyleSheet, Button } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler";

import "../../secret/firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default function SignUpScreen() {
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
                    // obtain data here
                />
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Value'
                    placeholderTextColor="#a9a9a9"
                    // obtain data here
                />
                <Text style={styles.label}>Re-enter Password</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Value'
                    placeholderTextColor="#a9a9a9"
                    // obtain data here
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // handle sign-in action here
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


import { Text, View, TextInput, StyleSheet, Button } from "react-native"
import { Link } from "expo-router"

export default function SignUpScreen() {
    return (
    <View
        style={styles.container}>
        <View
        style={styles.box}>
        <Text>Email</Text> 
        <TextInput 
            style={styles.input}
            placeholder='Value' 
            placeholderTextColor="#a9a9a9" // this makes the placeholder grey
        />
        <Text>Password</Text>
        <TextInput 
            style={styles.input}
            placeholder='Value' 
            placeholderTextColor="#a9a9a9" // this makes the placeholder grey
        />
         <Text>Re-enter Password</Text>
        <TextInput 
            style={styles.input}
            placeholder='Value' 
            placeholderTextColor="#a9a9a9" // this makes the placeholder grey
        />
         <Button
            title="Register"
            color="#37e6a8"
        >
        </Button>
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
        backgroundColor: 'white', // remove this later when youre done
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
    }
});

/*
Self-Note:
1. texts should be anligned.
2. have the button aligned with the text inputs and text needs to be black (Button)
3. Button needs to be customized
4. implement a modal.
*/
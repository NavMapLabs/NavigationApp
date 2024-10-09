import React from 'react';
import { View, StyleSheet, Pressable, Text } from 'react-native';
import { IconButton } from 'react-native-paper';
import { GalleryNavigationProp } from '@/constants/types';
import { useNavigation } from '@react-navigation/native';

// Header Function to render the header
const Header = () => {
    const navigation = useNavigation<GalleryNavigationProp>();

    return (
        <View style={styles.header}>
            <IconButton icon="arrow-left" size={25} style={styles.returnButton}
                onPress={() => navigation.navigate('MapEditor')}
            />
        </View>
    );
};

// ButtonRow Function to render the buttons
const ButtonRow = () => {
    return (
        <View style={styles.buttonContainer}>
            <Pressable
                style={styles.button1}
                onPress={() => {
                    /* handle action here */
                }}
            >
                <Text>Add Project</Text>
            </Pressable>
            <Pressable
                style={styles.button2}
                onPress={() => {
                    /* handle action here */
                }}
            >
                <Text>Share</Text>
            </Pressable>
        </View>
    );
};

// TextContaienr Function to render the text container
const TextContainer = () => {
    return (
        <View style={styles.textContainer}>
            <Text style={styles.text}>Name</Text>
            <Text style={styles.text}>Owner</Text>
            <Text style={styles.text}>Updated</Text>
        </View>
    );
};

const ProjectDisplay = () => {
    return (
        <View style={styles.buttonForProject}>
            <Pressable
                style={({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : styles.buttonNormal,
                ]}
                onPress={() => console.log('Button Pressed')}
            >
                <View style={styles.textRow}>
                    <Text style={styles.text1}>File 1</Text>
                    <Text>John Doe</Text>
                    <Text style={styles.text3}> 15 days ago</Text>
                </View>
            </Pressable>
        </View>
    );
};

// Main Function
const Gallery = () => {
    return (
        <View style={styles.container}>
            <Header />
            <ButtonRow />
            <TextContainer />
            <ProjectDisplay />
        </View>
    );
};

export default Gallery; // needed for Main Function

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flexDirection: 'row', // Place texts in a row
        justifyContent: 'space-between', // Distribute space evenly between texts
        alignItems: 'center',
        width: '75%', // Ensure it takes full width
        paddingHorizontal: 100, // Optional: Add some horizontal padding
        marginBottom: 650,
        marginRight: 90,
        bottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginLeft: 1660,
        bottom: 20,
    },
    button1: {
        backgroundColor: '#71E0BC',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        width: 100,
        marginLeft: 15, // Adjusted to a more reasonable margin
    },
    button2: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 10,
        width: 70,
        marginLeft: 15,
    },
    text: {
        left: 30,
        color: 'gray',
    },
    header: {
        height: 100,
        backgroundColor: '#71E0BC',
        width: '100%',
        bottom: 55,
    },
    returnButton: {
        marginTop: 45, // Center the arrow vertically
        left: 5,
    },
    buttonForProject: {
        bottom: 620,
        width: '80%',
    },
    buttonNormal: {
        backgroundColor: 'lightgrey'
    },
    buttonPressed: {
        backgroundColor: '#71E0BC', // change color when pressed
    },
    button: {
        padding: 30,
        borderRadius: 5,
        alignItems: 'center',
    },
    text1: {
        right: 100,
    },
    text3: {
        left: 80,
    },
    textRow: {
        flexDirection: 'row',
        alignItems: 'center', // Centers vertically
        justifyContent: 'space-between', // Distributes space between the texts
        width: '75%', // Optional: Set width to 100% to use the full width of the container
        paddingHorizontal: 16, // Optional: Padding for left/right
    },
});

/*
add submenu? or return button? (on header)
add "Last modified"? that'll display whether the user wants to organize the name of the project in order.
change the subtitle
*/
import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, FlatList } from 'react-native';
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
                style={styles.addProjectButton}
                onPress={() => {
                    /* handle action here */
                }}
            >
                <Text>Add Project</Text>
            </Pressable>
            <Pressable
                style={styles.shareButton}
                onPress={() => {
                    /* handle action here */
                }}
            >
                <Text>Share</Text>
            </Pressable>
        </View>
    );
};

const FileDisplay = () => {
    // file array in state: file name, owner, and updated date
    const files = [
        { name: 'gal', owner: 'John Doe', updated: '20 days ago', id: '1' },
        { name: 'kangaroo', owner: 'Patrick Jane', updated: '2 days ago', id: '2' },
        { name: 'abby', owner: 'Queen Elizabeth III', updated: '15 days ago', id: '3' },
    ];

    const [sortOrder, setSortOrder] = useState('asc');

    // this statement sorts alphabetically based on the name of the file in the Gallery
    const sortedFiles = files.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name);
        }
        else {
            return b.name.localeCompare(a.name);
        }
    });

    // this function is used to toggle alphabetically: A-Z or Z-A
    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    return (
        <View style={styles.textContainer}>
            <View style={styles.textRow}>
                <Pressable
                    onPress={toggleSortOrder}>
                    <Text style={{ color: 'gray', right: 25 }}>Name</Text>
                </Pressable>

                <Text style={{ color: 'gray', right: 40 }}>Owner</Text>
                <Text style={{ color: 'gray', right: 15 }}>Updated</Text>
            </View>

            {/* This displays the lists with file name, owner, and last updated date */}
            <FlatList
                data={sortedFiles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={[styles.listRow, styles.box]}>
                        {/* Pressable for name */}
                        <Pressable style={{ width: '33%' }} onPress={() => {/* handle action here */ }}>
                            <Text style={{ textAlign: 'left' }}>{item.name}</Text>
                        </Pressable>

                        {/* Pressable for owner */}
                        <Pressable style={{ width: '33%' }} onPress={() => {/* handle action here */ }}>
                            <Text style={{ textAlign: 'center' }}>{item.owner}</Text>
                        </Pressable>

                        {/* Pressable for updated */}
                        <Pressable style={{ width: '33%' }} onPress={() => {/* handle action here */ }}>
                            <Text style={{ textAlign: 'right' }}>{item.updated}</Text>
                        </Pressable>
                    </View>
                )}
            />
        </View>
    );
};

// Main Function
const Gallery = () => {
    return (
        <View style={styles.container}>
            <Header />
            <ButtonRow />
            <FileDisplay />
        </View>
    );
};

export default Gallery; // needed for Main Function

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textContainer: {
        width: '80%', // Ensure it takes full width
        paddingHorizontal: 100, // Optional: Add some horizontal padding
        marginRight: 90,
        top: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        left: 830,
        bottom: 15,
    },
    header: {
        height: 100,
        backgroundColor: '#71E0BC',
        width: '100%',
        bottom: 35,
    },
    textRow: {
        flexDirection: 'row',
        justifyContent: 'space-between', // Distributes space between the texts
        paddingHorizontal: 16, // Optional: Padding for left/right
        left: 10,
        marginBottom: 10,
    },
    addProjectButton: {
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
    shareButton: {
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
    returnButton: {
        marginTop: 45, // Center the arrow vertically
        left: 5,
    },
    listRow: {
        flexDirection: 'row',
        alignItems: 'center', // Centers vertically
        justifyContent: 'space-between', // Distributes space between the texts
        paddingVertical: 20,
    },
    box: {
        padding: 8,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 8,
        marginHorizontal: 5,
        marginVertical: 15,
        backgroundColor: 'white',
    },
});

/* make it dynamic */
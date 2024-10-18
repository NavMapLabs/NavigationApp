import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, FlatList, TextInput } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SearchHistoryNavigationProp } from '@/constants/types';
import { useNavigation } from '@react-navigation/native';

// Header Function to render the header
const Header = () => {
    const navigation = useNavigation<SearchHistoryNavigationProp>();

    return (
        <View style={styles.header}>
            <IconButton icon="arrow-left" size={25} style={styles.returnButton}
                onPress={() => navigation.navigate('MapEditor')}
            />
        </View>
    );
};

// Search Bar Function (rendering)
const SearchBar = ({ searchQuery, setSearchQuery }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={[styles.boxSearch, {color: 'gray'}]}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
    );
};

const FileDisplay = ({ searchQuery }) => {
    // file array in state: file name, owner, and updated date (Dynamic....)
    const files = [
        { name: 'gal', owner: 'John Doe', updated: '20 days ago', id: '1' },
        { name: 'kangaroo', owner: 'Patrick Jane', updated: '2 days ago', id: '2' },
        { name: 'abby', owner: 'Queen Elizabeth III', updated: '15 days ago', id: '3' },
        { name: 'bruce wayne', owner: 'Ed Sheeran', updated: '6 days ago', id: '4' },
    ];

    const [sortOrder, setSortOrder] = useState('asc');

    // this function is used to toggle alphabetically: A-Z or Z-A
    const toggleSortOrder = () => {
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    // this filters the files based on the search query
    const filterFiles = files.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

      // this statement sorts alphabetically based on sortOrder (Study on this)
    const sortedFiles = filterFiles.sort((a, b) => {
        if (sortOrder === 'asc') {
            return a.name.localeCompare(b.name); // ascending
        }
        else {
            return b.name.localeCompare(a.name); // descending
        }
    });

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
                    <View style={[styles.listRow, styles.boxFiles]}>
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
const SearchHistory = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <View style={styles.container}>
            <Header />
            {/* Passing searchQuery and setSearchQuery to SearchBar Function */}
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            {/* Passing searchQuery to FileDisplay Function */}
            <FileDisplay searchQuery={searchQuery} />
        </View>
    );
};

export default SearchHistory; // needed for Main Function

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
    searchContainer: {
        flexDirection: 'row',
        bottom: 10,
        right: 50,
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
    boxFiles: {
        padding: 8,
        borderWidth: 1,
        borderColor: 'light-gray',
        borderRadius: 8,
        marginHorizontal: 5,
        marginVertical: 15,
        backgroundColor: 'white',
    },
    boxSearch: {
        padding: 13,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        backgroundColor: 'white',
    },
});

// both the gallery and the query have red underline. FIX THEM
// add sorting for owner and updated (same as name)
// make a indicator for name, owner and updated
// change file name to search page, not searchhistory
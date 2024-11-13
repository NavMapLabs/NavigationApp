import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, FlatList, TextInput, Animated, GestureResponderEvent, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';
import { SearchPageNavigationProp } from '@/constants/types';
import { useNavigation } from '@react-navigation/native';

// Define the types for other components
interface HoverButtonProps {
    onPress: (event: GestureResponderEvent) => void;
    children: React.ReactNode;
    style?: ViewStyle;
}

interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

interface FileDisplayProps {
    searchQuery: string;
}

// Header Function to render the header
const Header = () => {
    const navigation = useNavigation<SearchPageNavigationProp>();

    return (
        <View style={styles.header}>
            <IconButton icon="arrow-left" size={25} style={styles.returnButton}
                onPress={() => navigation.navigate('MapEditor')}
            />
        </View>
    );
};

// Search Bar Function (rendering)
const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, setSearchQuery }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={[styles.boxSearch, { color: 'gray' }]}
                placeholder="Search..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
        </View>
    );
};

const FileDisplay: React.FC<FileDisplayProps> = ({ searchQuery }) => {
    // file array in state: file name, owner, and updated date (Dynamic....)
    const files = [
        { name: 'gal', owner: 'John Doe', updated: '2024-05-08', id: '1' },
        { name: 'kangaroo', owner: 'Patrick Jane', updated: '2024-10-02', id: '2' },
        { name: 'abby', owner: 'Queen Elizabeth III', updated: '2023-11-18', id: '3' },
        { name: 'bruce wayne', owner: 'Ed Sheeran', updated: '2024-05-08', id: '4' },
    ];

    const [sortField, setSortField] = useState('name'); // this sort by 'name'
    const [sortOrder, setSortOrder] = useState('asc'); // this sorts by ascending/descending

    // this function is used to toggle alphabetically: A-Z or Z-A
    // Toggle sorting order
    const handleSort = (field: React.SetStateAction<string>) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortOrder('asc');
        }
    };

    // this filters the files based on the SEARCH query
    const filterFiles = files.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // this statement sorts alphabetically based on sortOrder
    // this sort the filtered files based on sortField and sortOrder
    const sortedFiles = [...filterFiles].sort((a, b) => {
        if (sortOrder === 'asc') {
            if (sortField === 'name') {
                return a.name.localeCompare(b.name); // Compare name alphabetically
            } else if (sortField === 'owner') {
                return a.owner.localeCompare(b.owner); // Compare owner alphabetically
            } else if (sortField === 'updated') {
                return new Date(a.updated).getTime() - new Date(b.updated).getTime(); // Compare dates
            }
        } else {
            if (sortField === 'name') {
                return b.name.localeCompare(a.name); // Compare name alphabetically (reverse order)
            } else if (sortField === 'owner') {
                return b.owner.localeCompare(a.owner); // Compare owner alphabetically (reverse order)
            } else if (sortField === 'updated') {
                return new Date(b.updated).getTime() - new Date(a.updated).getTime(); // Compare dates (reverse order)
            }
        }
        return 0; // Ensure the function always returns a number
    });

    const HoverButton: React.FC<HoverButtonProps> = ({ onPress, children, style }) => {
        const [isHovered, setIsHovered] = useState(false);

        return (
            <Pressable
                onPress={onPress}
                onPressIn={() => setIsHovered(true)}
                onPressOut={() => setIsHovered(false)}
                style={[
                    styles.boxFiles,
                    isHovered ? styles.hoveredButton : null, // Apply hovered style if hovered
                    style,
                ]}
            >
                <Text style={{ color: 'gray' }}>{children}</Text>
            </Pressable>
        );
    };

    return (
        <View style={styles.textContainer}>
            <View style={styles.textRow}>
                <Pressable
                    onPress={() => handleSort('name')}>
                    <Text style={[styles.indicatorBox, { color: 'gray', right: 25 }]}>Name</Text>
                </Pressable>

                <Pressable
                    onPress={() => handleSort('owner')}>
                    <Text style={[styles.indicatorBox, { color: 'gray', right: 40 }]}>Owner</Text>
                </Pressable>

                <Pressable
                    onPress={() => handleSort('updated')}>
                    <Text style={[styles.indicatorBox, { color: 'gray', right: 15 }]}>Updated</Text>
                </Pressable>
            </View>

            {/* This displays the lists with file name, owner, and last-updated date */}
            <FlatList
                data={sortedFiles}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <HoverButton onPress={() => console.log(item.name)} style={styles.listRow}>
                        <View style={styles.textRow}>
                            <Text style={[styles.textItem, { textAlign: 'left', right: 20 }]} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                            <Text style={[styles.textItem, { textAlign: 'left', left: 430 }]} numberOfLines={1} ellipsizeMode="tail">{item.owner}</Text>
                            <Text style={[styles.textItem, { textAlign: 'left', left: 900 }]} numberOfLines={1} ellipsizeMode="tail">{item.updated}</Text>
                        </View>
                    </HoverButton>
                )}
            />
        </View>
    );
};

// Main Function
const SearchPage = () => {
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

export default SearchPage; // needed for Main Function

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    textContainer: {
        width: '80%', // Ensure it takes full width
        justifyContent: 'space-between',
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
    indicatorBox: {
        backgroundColor: 'light-gray',
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 10,
        padding: 6,
    },
    hoveredButton: {
        backgroundColor: '#d3d3d3',
    },
    textItem: {
        minWidth: 150, // Minimum width for consistency
        textAlign: 'center', // Center align text
        overflow: 'hidden', // Prevent overflow
    },
});

// look at the video: add stuff and then polish the UI/UX and the code

// add calculation: see if u could calculate how long the file has been updated (for updated part)
// case-sensitive (?) (discuss this later)

/* needed */
// process JSON data after search. generate items based on a JSON data
// make it connect to the canvas. possible to direct from the page (link)
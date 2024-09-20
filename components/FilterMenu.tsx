import React, { useEffect } from "react";
import {View, StyleSheet, Modal, Pressable, Text, TextInput, FlatList} from "react-native";
import { changeMode } from "@/store/NavStateSlice";
import { AppDispatch} from '../store/datastore';
import { useDispatch } from 'react-redux';

type FilterMenuProps = {
    isVisible: boolean,
    filters: string[],
    onClose: () => void,
    onApplyFilters: (selectedFilters: string[]) => void
}


const FilterMenu = (props: FilterMenuProps) => {
    const [selectedFilters, setSelectedFilters] = React.useState<string[]>([]);
    const [searchQuery, setSearchQuery] = React.useState('');
    const dispatch = useDispatch<AppDispatch>();

    const filterOptions = props.filters.filter(option =>
        option.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleFilter = (filter: string) => {
        setSelectedFilters((prevFilters) =>{
          if(prevFilters.includes(filter)){
              return prevFilters.filter((f) => f !== filter);
          }
            return [...prevFilters, filter];
        });
      };

    const applyFilters = () => {
        props.onApplyFilters(selectedFilters);
        closeMenu();
    };

    const closeMenu = () => {
        props.onClose();
        dispatch(changeMode({mode: 'default'}));
    }

    return (
        <Modal
          transparent={true}
          animationType="none"
          visible={props.isVisible}
          onRequestClose={props.onClose}
        >
            <Pressable style={styles.modalOverlay} onPress={closeMenu}>
                <View style={styles.menu}>
                    <Pressable onPress={(e) => e.stopPropagation()}>
                        <TextInput 
                            placeholder="Search..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                            style={styles.searchInput}
                        />
                    </Pressable>
                    <FlatList
                        data={filterOptions}
                        keyExtractor={(item) => item}
                        renderItem={({item}) => (
                            <Pressable onPress={() => toggleFilter(item)}>
                                <Text style={selectedFilters.includes(item) ? styles.selected : styles.option}>
                                    {item}
                                </Text>
                            </Pressable>
                        )}
                    />
                    <Pressable style={styles.applyButton} onPress={applyFilters}>
                        <Text style={styles.buttonText}>Apply Filters</Text>
                    </Pressable>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-end',
      paddingTop: 50, // Adjust to match the height of the top navigation
    },
    menu: {
      backgroundColor: 'white',
      padding: 10,
      borderRadius: 5,
      elevation: 5,
      marginTop: 15,
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
    },
    option: {
      fontSize: 16,
      padding: 15,
      marginVertical: 5
    },
    selected: {
      fontSize: 16,
      padding: 15,
      backgroundColor: '#71E0BC',
      borderRadius: 20,
      marginVertical: 5
    },
    applyButton: {
      backgroundColor: '#71E0BC',
      padding: 10,
      borderRadius: 20,
      marginTop: 10,
    },
    buttonText: {
      color: 'white',
      textAlign: 'center',
    },
    searchInput: {
        height: 50,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 20,
        marginBottom: 10,
        padding: 10,
    }
  });

  export default FilterMenu;
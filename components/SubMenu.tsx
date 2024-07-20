import { Text, View, StyleSheet } from "react-native";
import React from 'react'; // remove if needed
import { Drawer } from 'react-native-paper';


// make this sub menu be set to the left side of the screen 
export default function SubMenu() {
    const [active, setActive] = React.useState('');


    return (
        <View style={styles.container}>
            <View style={styles.left_side}>
                <Drawer.Section title="MENU">
                    <Drawer.Item
                        label="Log in"
                        active={active === 'login'}
                        onPress={() => setActive('login')}
                    />
                    <Drawer.Item
                        label="Sign up"
                        active={active === 'signup'}
                        onPress={() => setActive('signup')}
                    />
                </Drawer.Section>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    left_side: {
        position: 'absolute',
        top: '0%',
        left: '0%',
        height: '100%',
        backgroundColor: '#71E0BC',
        padding: 5,
        width: 200, // maybe change this width(?)
    },
});

/*
Self-Note:
change the font size smaller(?)
*/
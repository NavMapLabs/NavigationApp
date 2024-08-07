import { Modal, View, StyleSheet, Pressable} from "react-native";
import { Drawer } from 'react-native-paper';
import { SubMenuNavigationProp } from "@/constants/types"; // this is the identity
import { useNavigation } from '@react-navigation/native';

type SubMenuProps = {
    isVisible: boolean,
    onClose: () => void
}

// make this sub menu be set to the left side of the screen 
const SubMenu= (props : SubMenuProps) => {
    const navigation = useNavigation<SubMenuNavigationProp>(); // this gives you access to the hook

    return (
        <Modal
          transparent={true}
          animationType="none"
          visible={props.isVisible}
          onRequestClose={props.onClose}
        >
            <Pressable onPress={props.onClose}>
                <View style={styles.container}>
                    <View style={styles.left_side}>
                            <Drawer.Section title="MENU">
                                <Drawer.Item
                                    style={[styles.box, styles.TextSpace]}
                                    label="Log in"
                                    onPress={() => {
                                        navigation.navigate('LogInScreen')
                                        console.log("Pressed")
                                    }}
                                />
                                <Drawer.Item
                                    style={[styles.box, styles.BigSpace]}
                                    label="Sign up"
                                    onPress={() => {
                                        navigation.navigate('SignUpScreen')
                                        console.log("Pressed")
                                    }}
                                />
                                <Drawer.Item
                                    style={[styles.box, styles.TextSpace]}
                                    label="New"
                                    onPress={() => { }}
                                />
                                <Drawer.Item
                                    style={[styles.box, styles.TextSpace]}
                                    label="Save"
                                    onPress={() => { }}
                                />
                                <Drawer.Item
                                    style={[styles.box, styles.TextSpace]}
                                    label="Save & Exit"
                                    onPress={() => { }}
                                />
                                <Drawer.Item
                                    style={[styles.box, styles.TextSpace]}
                                    label="Exit"
                                    onPress={() => { }}
                                />
                            </Drawer.Section>
                    </View>
                </View>
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#71E0BC',
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
    box: {
        left: -17,
        backgroundColor: '#57ad91', // darker shade
        width: 200,
        borderRadius: 0,
    },
    TextSpace: {
        marginBottom: 1,
    },
    BigSpace: {
        marginBottom: 60,
    },
});

export default SubMenu;
/*
Self-Note:
change the font size smaller(?)
*/
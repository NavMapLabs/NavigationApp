import React from "react";
import { View, StyleSheet } from "react-native";

type SelectionBoxProps = {
    start: { x: number, y: number },
    end: { x: number, y: number }
}

const SelectionBox = (props: SelectionBoxProps) => {
    return (
        <View style={[styles.selectionBox, {
            top: props.end?.y > props.start?.y ? props.start?.y : props.end?.y,
            left: props.end?.x > props.start?.x ? props.start?.x : props.end?.x,
            width:  props.end?.x > props.start?.x ? props.end?.x - props.start?.x : props.start?.x - props.end?.x,
            height: props.end?.y > props.start?.y ? props.end?.y - props.start?.y : props.start?.y - props.end?.y
        }]} />
    );
}

const styles = StyleSheet.create({
    selectionBox: {
        position: 'absolute',
        left: "50%",
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: 'black',
        backgroundColor: 'transparent',
        zIndex: 100
    }
});

export default SelectionBox;
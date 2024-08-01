import {Button} from "react-native"
import { AppDispatch } from '../../store/datastore';
import { useDispatch } from 'react-redux';
import { addNode } from "@/store/NavMapSlice";
import { Coordinate } from "@/constants/Coordinate";
import { NavNodeType } from "@/constants/NavigationNode";
import { useState } from "react";


const AddNodeButton = () => {
    const [count, setCount ]= useState(1);
    const dispatch = useDispatch<AppDispatch>();

    const handlePress = () => {
        const coords:Coordinate = {x:10, y:0}
        const node: NavNodeType = {
            name: "test" + count,
            id: "" + count,
            tag: "" + count,
            coords: coords,
            description: "testing node"
        }
        dispatch(addNode({key: "TestNode", node:node}));
      };

    return (
        <>
            <Button title="Add Node" onPress={handlePress} />
        </>
    );
}


export default AddNodeButton;
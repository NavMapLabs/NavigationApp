import {Button} from "react-native"
import { AppDispatch } from "@/store/datastore";
import { useDispatch, UseDispatch } from "react-redux";
import { removeNode, addNode, addNode_Dev, addEdge, removeEdge } from "@/store/NavMapSlice";
import { Coordinate } from "@/constants/Coordinate";
import { NavNodeType } from "@/constants/NavigationNode";
import { useState } from "react";

const AddNodeButton = () => {
    const [count, setCount ]= useState(0);
    const dispatch = useDispatch<AppDispatch>();
    const handlePress = () => {
        const id_1:string = "node_1"
        const id_2:string = "node_2"
        const coords_1:Coordinate = {x:-100, y:100}
        const coords_2:Coordinate = {x:100, y:100}
        if (count == 0) {

            dispatch(addNode_Dev({id:id_1, coords:coords_1}));
            setCount(count+1);
        } else if (count == 1) {

            dispatch(addNode_Dev({id:id_2, coords:coords_2}));
            setCount(count+1);
        } else if (count == 2) {

            dispatch(addEdge({nodeID_1:id_1, nodeID_2:id_2}));
            setCount(count+1);
        } else if (count == 3) {

            dispatch(removeNode({key:id_2}));
            setCount(count+1);
        } else {
            dispatch(removeNode({key:id_1}));
            setCount(0);
        }
      };

    return (
        <>
            <Button title="Add Node" onPress={handlePress} />
        </>
    );
}


export default AddNodeButton;
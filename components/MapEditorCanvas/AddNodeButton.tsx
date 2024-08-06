import {Button} from "react-native"
import { AppDispatch } from "@/store/datastore";
import { useDispatch, UseDispatch } from "react-redux";
import { addNodeWithCoord, addEdge } from "@/store/NavMapSlice";
import { Coordinate } from "@/constants/Coordinate";
import { NavNodeType } from "@/constants/NavigationNode";
import { useState } from "react";

const AddNodeButton = () => {
    const [count, setCount ]= useState(1);
    const dispatch = useDispatch<AppDispatch>();
    const handlePress = () => {
        const coords:Coordinate = {x:10, y:10 * count}
        // dispatch(addNodeWithCoord({coords}));
        // setCount(count+1);

        
        dispatch(addEdge({nodeID_1:"node1", nodeID_2:"node2"}));
      };

    return (
        <>
            <Button title="Add Node" onPress={handlePress} />
        </>
    );
}


export default AddNodeButton;
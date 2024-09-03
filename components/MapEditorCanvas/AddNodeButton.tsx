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
        const id_3:string = "node_3"
        const id_4:string = "node_4"
        const id_5:string = "node_5"
        const coords_1:Coordinate = {x: 0, y:100}
        const coords_2:Coordinate = {x: 200, y:300}
        const coords_3:Coordinate = {x: 120, y:500}
        const coords_4:Coordinate = {x: -120, y:500}
        const coords_5:Coordinate = {x:-200, y:300}
        if (count == 0) {
            dispatch(addNode_Dev({id:id_1, coords:coords_1}));
            dispatch(addNode_Dev({id:id_2, coords:coords_2}));
            dispatch(addNode_Dev({id:id_3, coords:coords_3}));
            dispatch(addNode_Dev({id:id_4, coords:coords_4}));
            dispatch(addNode_Dev({id:id_5, coords:coords_5}));
            setCount(count+1);
        } else if (count == 1) {
            dispatch(addEdge({nodeID_1:id_1, nodeID_2:id_2}));
            dispatch(addEdge({nodeID_1:id_2, nodeID_2:id_3}));
            dispatch(addEdge({nodeID_1:id_3, nodeID_2:id_4}));
            dispatch(addEdge({nodeID_1:id_4, nodeID_2:id_5}));
            dispatch(addEdge({nodeID_1:id_5, nodeID_2:id_1}));
            
            setCount(count+1);
        } else if (count == 2) {
            dispatch(addEdge({nodeID_1:id_1, nodeID_2:id_3}));
            dispatch(addEdge({nodeID_1:id_3, nodeID_2:id_5}));
            dispatch(addEdge({nodeID_1:id_5, nodeID_2:id_2}));
            dispatch(addEdge({nodeID_1:id_2, nodeID_2:id_4}));
            dispatch(addEdge({nodeID_1:id_4, nodeID_2:id_1}));

            setCount(count+1);
        } else if (count == 3) {
            dispatch(removeNode({key:id_1}));
            dispatch(removeNode({key:id_2}));

            setCount(count+1);
        } else {
            dispatch(removeNode({key:id_3}));
            dispatch(removeNode({key:id_4}));
            dispatch(removeNode({key:id_5}));
            setCount(0);
        }
      };
    
    return (
        <>
            <Button title="Add Node Tester (star)" onPress={handlePress} />
        </>
    );
}


export default AddNodeButton;
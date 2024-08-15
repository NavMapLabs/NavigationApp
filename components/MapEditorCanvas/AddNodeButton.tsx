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
        const coords_2:Coordinate = {x:100, y:400}
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

    //   const handlePress_funny = () => {
    //     const ids:string[] = ["node_1", "node_2", "node_3", "node_4", "node_5"]
    //     const coords:Coordinate[] = [{x:0, y:100}, {x:-137, y:400}, {x:-74, y:391}, 
    //                                             {x:-137, y:400}, {x:74, y:391}]
    //     if (count < 5) {
    //         dispatch(addNode_Dev({id:ids[count], coords:coords[count]}));
    //         setCount(count+1);
    //     } else if (count <15) {
    //         const state = count - 5
    //         const edgesIndex:number[][] = [
    //             [0, 2], [2, 4], [4, 1], [1, 3], [3, 0], 
    //             [0, 1], [1, 2], [2, 3], [3, 4], [4, 0], 
    //         ]
    //         const indexPair:number[] = edgesIndex[state]
    //         dispatch(addEdge({nodeID_1:ids[indexPair[0]], nodeID_2:ids[indexPair[1]]}));

    //         setCount(count+1);
    //     } else if (count < 20) {
    //         const state = count - 15

    //         dispatch(removeNode({key:ids[state]}));
    //         setCount(count+1);
    //     } else {
            
    //         setCount(0);
    //     }
    //   }

    return (
        <>
            <Button title="Add Node" onPress={handlePress} />
        </>
    );
}


export default AddNodeButton;
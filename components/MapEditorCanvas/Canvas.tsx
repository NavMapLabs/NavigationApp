import { StyleSheet, Pressable, GestureResponderEvent, PanResponder, ScrollView  } from "react-native";
import React, { ReactNode, useEffect } from "react";
import { Coordinate } from "@/constants/Coordinate";
import { Dimension } from "@/constants/Dimension";
import { useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState } from "@/store/datastore";
import { NavNodeType } from "@/constants/NavigationNode";
import { addNode, addEdge} from "@/store/NavMapSlice";
import { pressNode } from "@/store/NavStateSlice";


type CanvasProps = {
    children: ReactNode,
    offsetCoor:Coordinate,
    dimension: Dimension,
}

// define the dynamic canvas view containing all canvas element in screen
// will be moved and resize for the zoom-in features
const Canvas = (props: CanvasProps) => {
    const dispatch = useDispatch<AppDispatch>();
    // const [nodeID, setNodeID] = useState("");

    const pastNodeId = useSelector((state: RootState) => state.navState.pastSelectedNodeId);
    const currentNodeId = useSelector((state: RootState) => state.navState.selectedNodeId);
    const nodes = useSelector((state: RootState) => state.NavMapState.present.nodes);
    const canAddNode = useSelector((state: RootState) => state.navState.mode === 'add-node');
    const moveNode = useSelector((state: RootState) => state.navState.mode === 'move-node');

    useEffect(() => {
        if ((canAddNode||moveNode) && pastNodeId != "") {
            connectSelectedNode();
        }
    }, [pastNodeId]);

    const handlePress = (event: GestureResponderEvent) => {
        
        // false error from VS Code, it will work
        const { offsetX, offsetY } = event.nativeEvent;
        // false error from VS Code, it will work

        addNodeEvent(offsetX - props.dimension.width/2, offsetY);
        const coords:Coordinate = {x:offsetX - props.dimension.width/2, y:offsetY}
        console.log("=> added node at " + coords.x + ", " + coords.y);
    };

    const addNodeEvent = (x:number, y:number) => {
        const coords:Coordinate = {x:x, y:y}
        let newId = Math.random().toString().slice(2, 8);
        while (nodes.has(newId)) {
            newId = Math.random().toString().slice(2, 8);
        }
        const newNode: NavNodeType = { 
            name: "node-" + newId,
            id: newId,
            tags: [],
            coords: coords,
            description: ""
        }
        dispatch(addNode({node: newNode}));
        dispatch(pressNode({nodeID: newNode.id}));
    };

    const connectSelectedNode = () => {
        dispatch(addEdge({nodeID_1:pastNodeId, nodeID_2:currentNodeId}));
    }

    return (
        <Pressable onPress={handlePress} disabled={!canAddNode} style={[styles.canvas,
            { 
                marginLeft: -props.dimension.width/2 + props.offsetCoor.x,
                marginTop: -props.dimension.height/2 + props.offsetCoor.y,
                height: props.dimension.height,
                width: props.dimension.width,
            }]} >
                {props.children}
        </Pressable>     
    )
}

const styles = StyleSheet.create({
    canvas: {
        flex: 1,
        left: "50%",
        // height:"100%"
    }
});

export default Canvas;
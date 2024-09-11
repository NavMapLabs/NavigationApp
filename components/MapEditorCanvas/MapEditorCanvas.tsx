import { View, StyleSheet,StyleProp, ViewStyle, Pressable, GestureResponderEvent  } from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import MapBackgroud from './MapBackgroud';
import NavigationNodeDisplay from './NavigationNodeDisplay';
import NavigationEdgeDisplay from './NavigationEdgeDisplay';
import { Coordinate } from "@/constants/Coordinate";
import { Dimension } from "@/constants/Dimension";
import AddNodeButton from "./AddNodeButton";
import { useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState } from "@/store/datastore";
import { NavNodeType } from "@/constants/NavigationNode";
import { addNode, addNodeWithCoord, addEdge, addNodeCoordandSelect} from "@/store/NavMapSlice";
import { pressNode } from "@/store/NavStateSlice";
import NavigationEdge from "./NavigationEdge";

type MapCanvasProps = {
    children: ReactNode,
    offsetCoor:Coordinate,
    dimension: Dimension,
    canAddNode: boolean
}
// define the dynamic canvas view containing all canvas element in screen
// will be moved and resize for the zoom-in features
const MapCanvas = (props: MapCanvasProps) => {
    const dispatch = useDispatch<AppDispatch>();
    // const [nodeID, setNodeID] = useState("");

    const pastNodeId = useSelector((state: RootState) => state.navState.pastSelectedNodeId);
    const currentNodeId = useSelector((state: RootState) => state.navState.selectedNodeId);
    const nodes = useSelector((state: RootState) => state.NavMapState.nodes);

    useEffect(() => {
        const connectingNodes = true; // replace with actual control
        if (connectingNodes && pastNodeId != "") {
            connectSelectedNode();
        }
    }, [pastNodeId]);

    const handlePress = (event: GestureResponderEvent) => {
        // console.log("===== pressed canvas =====");
        // console.log(event.nativeEvent);
        
        // false error from VS Code, it will work
        // @ts-ignore // ignore the false Error
        const { offsetX, offsetY } = event.nativeEvent;
        // false error from VS Code, it will work

        // console.log(offsetX, offsetY);
        // console.log("===== offsetted =====");
        // console.log(offsetX - props.dimension.width/2, offsetY);
        addNodeEvent(offsetX - props.dimension.width/2, offsetY);
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
            tag: "",
            coords: coords,
            description: ""
        }
        dispatch(addNode({node: newNode}));
        dispatch(pressNode({nodeID: newNode.id}));
    };

    const connectSelectedNode = () => {
        console.log("selected ID", currentNodeId, pastNodeId)
        dispatch(addEdge({nodeID_1:pastNodeId, nodeID_2:currentNodeId}));
        console.log("=> added edges between " + pastNodeId + " and " + currentNodeId);
    }

    return (
        <Pressable onPress={handlePress} disabled={!props.canAddNode} style={[styles.canvas, 
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

type MapCanvasWrapperProps = {
    children: ReactNode,
    canvasStyle: StyleProp<ViewStyle>,
    offsetCoor:Coordinate,
    dimension: Dimension,
    canAddNode: boolean
}

// define the static canvas view wrapper in screen
const MapCanvasWrapper = (props: MapCanvasWrapperProps) => {
    return (
        <View style={props.canvasStyle} >
            <AddNodeButton/>
            <MapCanvas offsetCoor={props.offsetCoor}  
                       dimension={props.dimension}
                       canAddNode={props.canAddNode}>
                {props.children} 
            </MapCanvas>
        </View>
    )
}

// define here for testing, will be link to actuall state
const centerCoor:Coordinate = {x:0, y:700};
const convaseHeightState:number = 700;
const aspectRatio = 16/9;
const defultImage:string = '@/assets/images/sampleMap.png';
const defaultNodeDimention:Dimension = {height:30, width: 30}

type MapEditorCanvasProps = {
    canvasStyle: StyleProp<ViewStyle>
    canAddNode: boolean
}

const MapEditorCanvas = (props: MapEditorCanvasProps) => {
    const [canvasDimensions, setCanvasDimensions] = useState({ height: 0,  width: 0 });

    useEffect(() => {
        const canvasWidth:number = convaseHeightState* aspectRatio;
        const canvasHeight:number = convaseHeightState;
        setCanvasDimensions({ height:canvasHeight, width:canvasWidth });
        // console.log("updating canvas dimension")
        // console.log(canvasDimensions)
    }, [aspectRatio]);
    
    return (
        <MapCanvasWrapper canvasStyle = {props.canvasStyle} 
                          offsetCoor={centerCoor}  
                          dimension={canvasDimensions}
                          canAddNode={props.canAddNode}>
            <MapBackgroud imageURL={defultImage} canvasDimension={canvasDimensions}/>
            <NavigationNodeDisplay dimension={defaultNodeDimention}/>
            <NavigationEdgeDisplay />
            {/* <Text>Hi Honghui</Text> */}
        </MapCanvasWrapper>
    )
}

export default MapEditorCanvas;


const styles = StyleSheet.create({
    canvas: {
        flex: 1,
        left: "50%",
        // height:"100%"
    }
})
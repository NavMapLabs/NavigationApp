import { View, StyleSheet,StyleProp, ViewStyle, Pressable, GestureResponderEvent, PanResponder, ScrollView  } from "react-native";
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
import { addNode, addEdge} from "@/store/NavMapSlice";
import { pressNode, pressSelectedNodes, unpressSelectedNodes } from "@/store/NavStateSlice";
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import SelectionBox from "./SelectionBox";

type MapCanvasProps = {
    children: ReactNode,
    offsetCoor:Coordinate,
    dimension: Dimension,
}


// define the dynamic canvas view containing all canvas element in screen
// will be moved and resize for the zoom-in features
const MapCanvas = (props: MapCanvasProps) => {
    const dispatch = useDispatch<AppDispatch>();
    // const [nodeID, setNodeID] = useState("");

    const pastNodeId = useSelector((state: RootState) => state.navState.pastSelectedNodeId);
    const currentNodeId = useSelector((state: RootState) => state.navState.selectedNodeId);
    const nodes = useSelector((state: RootState) => state.NavMapState.present.nodes);
    const canAddNode = useSelector((state: RootState) => state.navState.mode === 'add-node');

    useEffect(() => {
        if (canAddNode && pastNodeId != "") {
            connectSelectedNode();
        }
    }, [pastNodeId]);

    


    // this cannot be used for mobile as window doesn't exist
    /* useEffect(() => {
        
        const undoEvent = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.key === 'z') {
                dispatch(UndoActionCreators.undo());
            }
            if (event.ctrlKey && event.key === 'y') {
                dispatch(UndoActionCreators.redo());
            }
        }
        window.addEventListener('keydown', undoEvent);
        return () => {
            window.removeEventListener('keydown', undoEvent);
        }
    }, []); */

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
            tag: "",
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

type MapCanvasWrapperProps = {
    children: ReactNode,
    canvasStyle: StyleProp<ViewStyle>,
    offsetCoor:Coordinate,
    dimension: Dimension,
    scrollEnabled: boolean
}

// define the static canvas view wrapper in screen
const MapCanvasWrapper = (props: MapCanvasWrapperProps) => {
    return (
        <ScrollView style={props.canvasStyle} 
                    scrollEnabled={props.scrollEnabled}>
            <AddNodeButton/>
            <MapCanvas offsetCoor={props.offsetCoor}  
                       dimension={props.dimension}>
                {props.children} 
            </MapCanvas>
        </ScrollView>
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
}

const MapEditorCanvas = (props: MapEditorCanvasProps) => {
    const [canvasDimensions, setCanvasDimensions] = useState({ height: 0,  width: 0 });
    const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
    const [selection, setSelection] = useState<{ start : Coordinate, end : Coordinate } | null>(null);
    const nodes = useSelector((state: RootState) => state.NavMapState.present.nodes);
    const selectedNodeIDs = useSelector((state: RootState) => state.navState.selectedNodes);
    const isSelectionMode = useSelector((state: RootState) => state.navState.mode === 'selection-drag');
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const canvasWidth:number = convaseHeightState* aspectRatio;
        const canvasHeight:number = convaseHeightState;
        setCanvasDimensions({ height:canvasHeight, width:canvasWidth });
    }, [aspectRatio]);

    const selectionPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => isSelectionMode,
        onPanResponderGrant: (evt) => {
            const { locationX, locationY } = evt.nativeEvent;
            setSelection({ start : { x: locationX, y: locationY }, end : { x: locationX, y: locationY } });
        },
        onPanResponderMove: (evt, gestureState) => {
            if (selection) {
                const { locationX, locationY } = evt.nativeEvent;
                setSelection((prev) => {
                    if (!prev) return null;
                    return { start: prev.start, end: { x: locationX, y: locationY } };
                });
            }
        },
        onPanResponderRelease: () => {
            if (selection) {
                const selectedNodes = Array.from(nodes.values()).filter(node => isNodeInSelection(node.coords, selection));
                const currSelectedNodeIDs = selectedNodes.map(node => node.id);
                if (selectedNodeIDs.length > 0) {
                    const unselectedNodes = selectedNodeIDs.filter(nodeID => !currSelectedNodeIDs.includes(nodeID));
                    const newlySelectedNodes = currSelectedNodeIDs.filter(nodeID => !selectedNodeIDs.includes(nodeID));
                    dispatch(pressSelectedNodes({nodeIDs: newlySelectedNodes}));
                    dispatch(unpressSelectedNodes({nodeIDs: unselectedNodes}));
                }
                else{
                    dispatch(pressSelectedNodes({nodeIDs: currSelectedNodeIDs}));
                    console.log("Selected nodes: ", currSelectedNodeIDs);
                }
            }
            setSelection(null);
        },
    });

    // Utility function to check if a node is within the selection box
    const isNodeInSelection = (node_coords: Coordinate, selection: { start: Coordinate, end: Coordinate}) => {
        const x:number = node_coords.x + canvasDimensions.width/2;
        const y:number = node_coords.y;
        console.log("node coordinates: ", x +", " + y);
        const { start, end } = selection;
        if (start.x < end.x) {
            if (x < start.x || x > end.x) return false;
        }
        else {
            if (x > start.x || x < end.x) return false;
        }
        if (start.y < end.y) {
            if (y < start.y || y > end.y) return false;
        }
        else {
            if (y > start.y || y < end.y) return false;
        }
        return true;
    };
    
    return (
        <MapCanvasWrapper canvasStyle = {props.canvasStyle} 
                          offsetCoor={centerCoor}  
                          dimension={canvasDimensions}
                          scrollEnabled={!props.enableSelectionTool}>
            <View {...selectionPanResponder.panHandlers}>
                <MapBackgroud imageURL={defultImage} canvasDimension={canvasDimensions}/>
                <NavigationNodeDisplay dimension={defaultNodeDimention}/>
                <NavigationEdgeDisplay />
                {/* <Text>Hi Honghui</Text> */}
                {selection && <SelectionBox start={selection.start} end={selection.end} />}
            </View>
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
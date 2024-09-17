import { View, StyleSheet,StyleProp, ViewStyle, PanResponder, Animated } from "react-native";
import React, { useEffect, useState } from "react";
import MapBackgroud from './MapBackgroud';
import NavigationNodeDisplay from './NavigationNodeDisplay';
import NavigationEdgeDisplay from './NavigationEdgeDisplay';
import { Coordinate } from "@/constants/Coordinate";
import { Dimension } from "@/constants/Dimension";
import { useDispatch, useSelector} from "react-redux";
import { AppDispatch, RootState } from "@/store/datastore";
import { pressSelectedNodes, unpressSelectedNodes } from "@/store/NavStateSlice";
import { updateNodeCoordsFinal, updateNodeCoords } from "@/store/NavMapSlice";
import SelectionBox from "./SelectionBox";
import CanvasContainer from "./CanvasContainer";

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
    const [selection, setSelection] = useState<{ start : Coordinate, end : Coordinate } | null>(null);
    const nodes = useSelector((state: RootState) => state.NavMapState.present.nodes);
    const selectedNodeIDs = useSelector((state: RootState) => state.navState.selectedNodes);
    const isSelectionMode = useSelector((state: RootState) => state.navState.mode === 'selection-drag');
    const isMoveMode = useSelector((state: RootState) => state.navState.mode === 'move-node');
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

    const movePanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => isMoveMode,
        onPanResponderMove: (evt, gestureState) => {
            if (selectedNodeIDs.length > 0) {
                selectedNodeIDs.forEach(nodeID => {
                    const node = nodes.get(nodeID);
                    if (node) {
                        dispatch(updateNodeCoords({key: nodeID, coords: {x: node.coords.x + gestureState.dx, y: node.coords.y + gestureState.dy}}));
                    }
                });
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (selectedNodeIDs.length > 0) {
                selectedNodeIDs.forEach(nodeID => {
                    const node = nodes.get(nodeID);
                    if (node) {
                        dispatch(updateNodeCoordsFinal({key: nodeID, coords: {x: node.coords.x + gestureState.dx, y: node.coords.y + gestureState.dy}}));
                    }
                });
            }
        }
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
        <CanvasContainer canvasStyle = {props.canvasStyle} 
                          offsetCoor={centerCoor}  
                          dimension={canvasDimensions}
                          scrollEnabled={!isSelectionMode}>
            <Animated.View {...selectionPanResponder.panHandlers}>
                <Animated.View {...movePanResponder.panHandlers}>
                    <MapBackgroud imageURL={defultImage} canvasDimension={canvasDimensions}/>
                    <NavigationNodeDisplay dimension={defaultNodeDimention} canvasDimensions={canvasDimensions}/>
                    <NavigationEdgeDisplay />
                    {/* <Text>Hi Honghui</Text> */}
                    {selection && <SelectionBox start={selection.start} end={selection.end} />}
                </Animated.View>
            </Animated.View>
        </CanvasContainer>
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
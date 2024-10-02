import { View, StyleSheet,StyleProp, ViewStyle, PanResponder, Animated, GestureResponderEvent, PanResponderGestureState, Dimensions, Platform } from "react-native";
import React, { useEffect, useRef, useState } from "react";
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
import AddNodeButton from "./AddNodeButton";

// define here for testing, will be link to actuall state
const centerCoor:Coordinate = {x:0, y:700};
const convaseHeightState:number = 700;
const aspectRatio = 16/9;
const defultImage:string = '@/assets/images/sampleMap.png';
const defaultNodeDimention:Dimension = {height:30, width: 30}
const MIN_SCALE = 0.5; // Minimum zoom level
const MAX_SCALE = 3; // Maximum zoom level
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');    

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
    const isDefaultMode = useSelector((state: RootState) => state.navState.mode === 'default');
    const dispatch = useDispatch<AppDispatch>();
    const pan = useRef(new Animated.ValueXY()).current;
    let offsetX = useRef(0).current;
    let offsetY = useRef(0).current;
    const scale = useRef(new Animated.Value(1)).current; // Scale for zooming
    const scaleValue = useRef(1); // To store the current scale value
    const lastScale = useRef(1); // To store the last known scale

    const MOVEMENT_SENSITIVITY_FACTOR = 1.0;

    const BOUNDARIES_LIMITS = {
    left: -SCREEN_WIDTH / 2,       // Max left movement
    top: -SCREEN_HEIGHT / 2,       // Max up movement
    right: SCREEN_WIDTH / 2,       // Max right movement (cannot exceed 0)
    bottom: SCREEN_HEIGHT / 2,     // Max down movement (cannot exceed 0)
    };

    useEffect(() => {
        const canvasWidth:number = convaseHeightState* aspectRatio;
        const canvasHeight:number = convaseHeightState;
        setCanvasDimensions({ height:canvasHeight, width:canvasWidth });
    }, [aspectRatio]);


    useEffect(() => {
        // Listener to keep track of the current scale value in the `scaleValue` ref
        const scaleListener = scale.addListener(({ value }) => {
          scaleValue.current = value;
        });
    
        return () => {
          // Cleanup listener when component unmounts
          scale.removeListener(scaleListener);
        };
      }, []);

    useEffect(() => {
        if (Platform.OS === 'web') {
          const handleWheel = (event: WheelEvent) => {
            // Zoom in/out based on the wheel direction
            let newScale = lastScale.current - event.deltaY * 0.001; // Adjust this multiplier for zoom sensitivity
            newScale = Math.max(MIN_SCALE, Math.min(newScale, MAX_SCALE));
    
            scale.setValue(newScale);
            lastScale.current = newScale;
          };
    
          window.addEventListener('wheel', handleWheel);
    
          // Cleanup on unmount
          return () => {
            window.removeEventListener('wheel', handleWheel);
          };
        }
      }, []);

    // PanResponder for pinch-to-zoom and dragging
    const panCanvasResponder = useRef(
        PanResponder.create({
        // disable pan responder if not in default mode
        onStartShouldSetPanResponder: () => isDefaultMode,
        onPanResponderGrant: () => {
            pan.setOffset({
            x: offsetX,
            y: offsetY,
            });
            pan.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: (event, gestureState) => {
            if (gestureState.numberActiveTouches === 2) {
            const touches = event.nativeEvent.touches;
            if (touches.length == 2) {
                const dx = touches[0].pageX - touches[1].pageX;
                const dy = touches[0].pageY - touches[1].pageY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                const currentScale = Math.max(
                MIN_SCALE,
                Math.min((distance / 300) * lastScale.current, MAX_SCALE)
                );
                scale.setValue(currentScale);
            }
            } else if (gestureState.numberActiveTouches === 1) {
            const slowedDx = gestureState.dx * MOVEMENT_SENSITIVITY_FACTOR;
            const slowedDy = gestureState.dy * MOVEMENT_SENSITIVITY_FACTOR;

            pan.setValue({ x: slowedDx, y: slowedDy });
            }
        },
        onPanResponderRelease: (event, gestureState) => {
            if (gestureState.numberActiveTouches === 2) {
                lastScale.current = scaleValue.current;
            } else {
            const newX = Math.min(Math.max(gestureState.dx * MOVEMENT_SENSITIVITY_FACTOR + offsetX, BOUNDARIES_LIMITS.left), BOUNDARIES_LIMITS.right);
            const newY = Math.min(Math.max(gestureState.dy * MOVEMENT_SENSITIVITY_FACTOR + offsetY, BOUNDARIES_LIMITS.top), BOUNDARIES_LIMITS.bottom);

            pan.flattenOffset();
            offsetX = newX;
            offsetY = newY;

            Animated.spring(pan, {
                toValue: { x: newX, y: newY },
                useNativeDriver: false,
            }).start();
            }
        },
        })
    ).current;

    const selectionPanResponder = PanResponder.create({
        onStartShouldSetPanResponder: () => isSelectionMode,
        onPanResponderGrant: (evt) => {
            const { locationX, locationY } = evt.nativeEvent;
            const scaledX = locationX / scaleValue.current;
            const scaledY = locationY / scaleValue.current;
            setSelection({ start : { x: scaledX, y: scaledY }, end : { x: scaledX, y: scaledY } });
        },
        onPanResponderMove: (evt, gestureState) => {
            if (selection) {
                const { locationX, locationY } = evt.nativeEvent;
                const scaledX = locationX / scaleValue.current;
                const scaledY = locationY / scaleValue.current;
                setSelection((prev) => {
                    if (!prev) return null;
                    return { start: prev.start, end: { x: scaledX, y: scaledY } };
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
                        const adjustedDx = gestureState.dx / scaleValue.current;
                        const adjustedDy = gestureState.dy / scaleValue.current;
                        dispatch(updateNodeCoords({key: nodeID, coords: {x: node.coords.x + adjustedDx, y: node.coords.y + adjustedDy}}));
                    }
                });
            }
        },
        onPanResponderRelease: (evt, gestureState) => {
            if (selectedNodeIDs.length > 0) {
                selectedNodeIDs.forEach(nodeID => {
                    const node = nodes.get(nodeID);
                    if (node) {
                        const adjustedDx = gestureState.dx / scaleValue.current;
                        const adjustedDy = gestureState.dy / scaleValue.current;
                        dispatch(updateNodeCoordsFinal({key: nodeID, coords: {x: node.coords.x + adjustedDx, y: node.coords.y + adjustedDy}}));
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
        <View>
            <Animated.View style={[styles.moveableCanvas,
                {
                    transform: [
                      { translateX: pan.x }, // Apply pan to move
                      { translateY: pan.y }, // Apply pan to move
                      { scale: scale }, // Apply scale to zoom
                    ],
                },]} {...panCanvasResponder.panHandlers}>
                <CanvasContainer canvasStyle = {props.canvasStyle} 
                                offsetCoor={centerCoor}  
                                dimension={canvasDimensions}
                                scrollEnabled={!isSelectionMode}>
                    <Animated.View {...selectionPanResponder.panHandlers}>
                        <Animated.View {...movePanResponder.panHandlers}>
                            <MapBackgroud imageURL={defultImage} canvasDimension={canvasDimensions}/>
                            <NavigationNodeDisplay dimension={defaultNodeDimention} canvasDimensions={canvasDimensions}
                            scale={scaleValue.current}/>
                            <NavigationEdgeDisplay />
                            {/* <Text>Hi Honghui</Text> */}
                            {selection && <SelectionBox start={selection.start} end={selection.end} />}
                        </Animated.View>
                    </Animated.View>
                </CanvasContainer>
            </Animated.View>
        </View>
    )
}

export default MapEditorCanvas;


const styles = StyleSheet.create({
    canvas: {
        flex: 1,
    },
    moveableCanvas: {
        width: '100%',
        height: '100%', // Larger height to demonstrate
        position: 'absolute',
    }
})
import { View, StyleSheet,StyleProp, ViewStyle, Pressable, GestureResponderEvent  } from "react-native"
import React, { ReactNode, useEffect, useState } from "react"
import MapBackgroud from './MapBackgroud'
import NavigationNodeDisplay from './NavigationNodeDisplay'
import NavigationEdgeDisplay from './NavigationEdgeDisplay'
import { Coordinate } from "@/constants/Coordinate";
import { Dimension } from "@/constants/Dimension";
import AddNodeButton from "./AddNodeButton"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/store/datastore"
import { NavNodeType } from "@/constants/NavigationNode"
import { addNode, addNodeWithCoord } from "@/store/NavMapSlice";

// define the dynamic canvas view containing all canvas element in screen
// will be moved and resize for the zoom-in features
const MapCanvas = ({children, offsetCoor, dimension}: 
    {children: ReactNode, offsetCoor:Coordinate, dimension: Dimension}) => {
    const dispatch = useDispatch<AppDispatch>();


    const handlePress = (event: GestureResponderEvent) => {
        console.log("===== pressed =====");
        // console.log(event.nativeEvent);
        
        // false error from VS Code, it will work
        const { offsetX, offsetY } = event.nativeEvent;
        // false error from VS Code, it will work

        console.log(offsetX, offsetY);
        console.log("===== offsetted =====");
        console.log(offsetX - dimension.width/2, offsetY);
        addNodeEvent(offsetX - dimension.width/2, offsetY)
    };

    const addNodeEvent = (x:number, y:number) => {
        const coords:Coordinate = {x:x, y:y}
        dispatch(addNodeWithCoord({coords:coords}));
      };

    return (
        <Pressable onPress={handlePress} style={[styles.canvas, 
            { 
                marginLeft: -dimension.width/2 + offsetCoor.x,
                marginTop: -dimension.height/2 + offsetCoor.y,
                height: dimension.height,
                width: dimension.width,
            }]} >
                {children}
        </Pressable>
    )
}

// define the static canvas view wrapper in screen
const MapCanvasWrapper = ({children, canvasStyle, offsetCoor, dimension}: 
    {children: ReactNode, canvasStyle: StyleProp<ViewStyle>, offsetCoor:Coordinate, dimension: Dimension}) => {
    return (
        <View style={canvasStyle} >
            <AddNodeButton/>
            <MapCanvas offsetCoor={offsetCoor}  dimension={dimension}>
                {children} 
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

const MapEditorCanvas = ({canvasStyle}: {canvasStyle: StyleProp<ViewStyle>}) => {
    const [canvasDimensions, setCanvasDimensions] = useState({ height: 0,  width: 0 });

    useEffect(() => {
        const canvasWidth:number = convaseHeightState* aspectRatio;
        const canvasHeight:number = convaseHeightState;
        setCanvasDimensions({ height:canvasHeight, width:canvasWidth });
        console.log("updating canvas dimension")
        console.log(canvasDimensions)
    }, [aspectRatio]);
    
    return (
        <MapCanvasWrapper canvasStyle = {canvasStyle} offsetCoor={centerCoor}  dimension={canvasDimensions}>
            <MapBackgroud imageURL={defultImage} canvasDimension={canvasDimensions}/>
            <NavigationNodeDisplay dimension={defaultNodeDimention}/>
            <NavigationEdgeDisplay/>
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
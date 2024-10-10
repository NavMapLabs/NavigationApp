import React, { useEffect } from "react"
import { View } from "react-native"
import { useSelector } from 'react-redux';
import { RootState } from '../../store/datastore';
import { Dimension } from "@/constants/Dimension";
import { Coordinate } from "@/constants/Coordinate";
import NavigationEdge from "@/components/MapEditorCanvas/NavigationEdge"
import { NavNodeType } from "@/constants/NavigationNode";


//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const NavigationEdgeDisplay = () => {
    const nodes = useSelector((state: RootState) => state.NavMapState.present.nodes);
    const graph = useSelector((state: RootState) => state.NavMapState.present.graph);
    // use graphModifiedFlag for sometime react don't recognized graph is updated (detail related to redux store state update rules...)
    const graphModifiedFlag = useSelector((state: RootState) => state.NavMapState.present.graphModifiedFlag);
    const emptyCoords:Coordinate = {x:0, y:0}
    const emptyNode:NavNodeType = {
        name:"empty",
        id:"empty",
        type:"empty",
        tags:[],
        description:"empty",
        coords: emptyCoords
    }

    // useEffect(() => {
    //     console.log("=== graph updated ===")
    //     console.log(graph)
    // }, [graph])
    return (
        <>
        {
            [...graph.entries()].map(([ID_1, adjlist_1]) => 
                {
                    return adjlist_1.forwardList.map((ID_2) => {
                        // ?? emptyNode is used to avoid get(ID_2) return undefine
                        const edge_id = ID_1 + "-" + ID_2
                        const node_1:NavNodeType = nodes.get(ID_1) ?? emptyNode;
                        const node_2:NavNodeType = nodes.get(ID_2) ?? emptyNode;

                        if (node_1 == emptyNode || node_2 == emptyNode) {
                            return;
                        }

                        return (
                            <NavigationEdge key={edge_id} coords_1={node_1.coords} 
                                            coords_2={node_2.coords} 
                                            id1={ID_1} id2={ID_2}/>
                        )
                    })
    
                })
        }
        </>
    )
}

export default NavigationEdgeDisplay;
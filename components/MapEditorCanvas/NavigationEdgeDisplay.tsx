import React from "react"
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
    const nodes = useSelector((state: RootState) => state.NavMapState.nodes);
    const graph = useSelector((state: RootState) => state.NavMapState.graph);
    return (
        <>
        {


            [...nodes.entries()].map(([ID_1, node_1]) => 
            {
                graph.get(ID_1)?.forwardList.map((ID_2) => {
                    const node_2:NavNodeType = nodes.get(ID_2) ?? node_1; // ?? node_1 is used to avoid get(ID_2) return undefine
                    const edge_id = ID_1 + "-" + ID_2

                    return (
                        <NavigationEdge key={edge_id} node_1={node_1} node_2={node_2}/>
                    )
                })

            })
        }
        </>
    )
}

export default NavigationEdgeDisplay;
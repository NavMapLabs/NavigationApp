import { useSelector } from 'react-redux';
import { RootState } from '../../store/datastore';
import React from "react"
import { Dimension } from "@/constants/Dimension";
import { Coordinate } from "@/constants/Coordinate";
import { addNode } from "@/store/NavMapSlice";
import { NavNodeType } from "@/constants/NavigationNode";
import NavigationNode from "@/components/MapEditorCanvas/NavigationNode"


//just testing this format out
//make map component an empty component for now that takes up the whole screen using flex
const NavigationNodeDisplay = ({dimension}: {dimension:Dimension}) => {
    const nodes = useSelector((state: RootState) => state.NavMapState.nodes);

    return (
      <>
      {
        [...nodes.entries()].map(([name, node]) => (
          <NavigationNode key={node.id} name={node.name} id={node.id} coords={node.coords} dimension={dimension}/>
        ))
      }
      </>
        // <G>
        //   {nodes.map(node => (
        //     <NodeComponent key={node.id} {...node} />
        //   ))}
        // </G>
      );
}

export default NavigationNodeDisplay;
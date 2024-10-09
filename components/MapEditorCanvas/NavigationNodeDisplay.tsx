import { useSelector } from 'react-redux';
import { RootState } from '../../store/datastore';
import React from "react"
import { Dimension } from "@/constants/Dimension";
import { Coordinate } from "@/constants/Coordinate";
import NavigationNode from "@/components/MapEditorCanvas/NavigationNode"

//make map component an empty component for now that takes up the whole screen using flex
type NavigationNodeDisplayProps = {
    dimension: Dimension,
    canvasDimensions: Dimension,
    scale: number,
}

const NavigationNodeDisplay = (props: NavigationNodeDisplayProps) => {
    const nodes = useSelector((state: RootState) => state.NavMapState.present.nodes);

    return (
      <>
      {
        [...nodes.entries()].map(([name, node]) => (
          <NavigationNode key={node.id} 
                          name={node.name} 
                          id={node.id} 
                          type={node.type}
                          coords={node.coords} 
                          dimension={props.dimension}
                          canvasDimension = {props.canvasDimensions}
                          scale={props.scale}
                          />
        ))
      }
      </>
      );
}

export default NavigationNodeDisplay;
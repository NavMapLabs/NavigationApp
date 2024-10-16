
import {NavNodeType} from "@/constants/NavigationNode";
import {AdjacencyList, NavMapState} from "@/store/NavMapSlice"
import { Map as Map_I } from 'immutable';

export const serializeMapData = (mapData:NavMapState):string => {

  return JSON.stringify(mapData);
}


export const deSerializationMapData = (mapDataString:string): NavMapState => {
  let mapDataJson = JSON.parse(mapDataString);
  let mapData:NavMapState = {
    nodes: Map_I<string, NavNodeType>(Object.entries(mapDataJson.nodes)),
    graph: Map_I<string, AdjacencyList>(Object.entries(mapDataJson.graph)),
    graphModifiedFlag: mapDataJson.graphModifiedFlag,
  };
  // console.log(mapData)

  return mapData;
}
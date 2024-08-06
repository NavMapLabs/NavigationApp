import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Map as Map_I } from 'immutable';
import { NavNodeType } from '@/constants/NavigationNode';
import { Coordinate } from '@/constants/Coordinate';

interface AdjacencyList {
  forwardList: string[],
  backwardList: string[],
}

// Define the initial state using an Immutable.js Map
interface NavMapState {
  nodes: Map_I<string, NavNodeType>;
  graph: Map_I<string, AdjacencyList>;
}

const initialState: NavMapState = {
  nodes: Map_I<string, NavNodeType>(),
  graph: Map_I<string, AdjacencyList>()
};

// Create the slice
const navMapSlice = createSlice({
  name: 'navMap',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<{ node: NavNodeType }>) => {
      let id:string = Math.random().toString().slice(2, 8);
      while (state.nodes.has(id)) { 
        id = Math.random().toString().slice(2, 8);
      };
      state.nodes = state.nodes.set(id, action.payload.node);
    },
    addNodeWithCoord: (state, action: PayloadAction<{ coords:Coordinate }>) => {
      let id:string = Math.random().toString().slice(2, 8);
      while (state.nodes.has(id)) { 
        id = Math.random().toString().slice(2, 8);
      };

      const newNode: NavNodeType = {
        name: "node-" + id,
        id: id,
        tag: "",
        coords: action.payload.coords,
        description: ""
      }

      state.nodes = state.nodes.set(id, newNode);
    },
    removeNode: (state, action: PayloadAction<{ key: string }>) => {
      // the error is Microsoft's error, it will work
      // the delete function from immutable should return a new Map not like the "go to defenition"
      // weird issue from VS code or something
      state.nodes = state.nodes.delete(action.payload.key);
      // the error is Microsoft's error, it will work
    },
    updateNodeCoords: (state, action: PayloadAction<{ key: string, coords: Coordinate }>) => {
      const existingNode = state.nodes.get(action.payload.key);
      if (existingNode) {
        const updatedNode = { ...existingNode, coords: action.payload.coords };
        state.nodes = state.nodes.set(action.payload.key, updatedNode);
      }
    },
    addEdge: (state, action:PayloadAction<{nodeID_1: string, nodeID_2:string}>) => {
      const nodeID_1: string = action.payload.nodeID_1;
      const nodeID_2: string = action.payload.nodeID_2;
      
      console.log("====== before =====")
      console.log(state.graph)

      let draftGraph = state.graph;

      if (!draftGraph.has(nodeID_1)) {
        draftGraph = draftGraph.set(nodeID_1, {forwardList:[], backwardList:[]})
      }

      if (!draftGraph.has(nodeID_2)) {
        draftGraph = draftGraph.set(nodeID_2, {forwardList:[], backwardList:[]})
      }


      if (!draftGraph.get(nodeID_1).forwardList.includes(nodeID_2)) {
        draftGraph.get(nodeID_1).forwardList = [...draftGraph.get(nodeID_1).forwardList, nodeID_2]
      }

      if (!draftGraph.get(nodeID_2).backwardList.includes(nodeID_1)) {
        draftGraph.get(nodeID_2).backwardList = [...draftGraph.get(nodeID_2).backwardList, nodeID_1]
      }



      state.graph = draftGraph
      console.log("====== after =====")
      console.log(state.graph)
    }
  },
});

// Export the actions
export const { addNode, addNodeWithCoord, removeNode, updateNodeCoords, addEdge } = navMapSlice.actions;

// Export the reducer
export default navMapSlice.reducer;
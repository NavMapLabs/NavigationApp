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
  modifiedFlag: number;
}

const initialState: NavMapState = {
  nodes: Map_I<string, NavNodeType>(),
  graph: Map_I<string, AdjacencyList>(),
  modifiedFlag: 0,
};

// Create the slice
const navMapSlice = createSlice({
  name: 'navMap',
  initialState,
  reducers: {
    addNode_Dev: (state, action: PayloadAction<{ id:string, coords:Coordinate }>) => {
      const newNode: NavNodeType = {
        name: action.payload.id,
        id: action.payload.id,
        tag: "",
        coords: action.payload.coords,
        description: ""
      }
      state.nodes = state.nodes.set(action.payload.id, newNode);
    },
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
      // If it shows error is Microsoft's error, it will work
      // the delete function from immutable should return a new Map not like the "go to defenition"
      // weird issue from VS code or something
      // if see error, install "JavaScript and TypeScript Nightly" extension, fixed linking issue
      state.nodes = state.nodes.delete(action.payload.key);
      // If it shows error is Microsoft's error, it will work

      // removing all edges
      const nodeID_1: string = action.payload.key;
      let draftGraph = state.graph;
      
      let forwardList:string[] = draftGraph.get(nodeID_1)?.forwardList ?? [];

      forwardList.forEach((nodeID_2: string) => {
        let node_2 = draftGraph.get(nodeID_2)
        let backwardList:string[] = node_2?.backwardList ?? [];
        backwardList = backwardList.filter(node => node !== nodeID_1);
        if ( node_2 != undefined) {
          node_2.backwardList = backwardList;
        }
      });
      
      state.graph = state.graph.delete(action.payload.key);
    },
    updateNodeCoords: (state, action: PayloadAction<{ key: string, coords: Coordinate }>) => {
      const existingNode = state.nodes.get(action.payload.key);
      if (existingNode) {
        const updatedNode = { ...existingNode, coords: action.payload.coords };
        state.nodes = state.nodes.set(action.payload.key, updatedNode);
      }
    },
    updateName: (state, action: PayloadAction<{ key: string, name: string }>) => {
      const existingNode = state.nodes.get(action.payload.key);
      if (existingNode) {
        const updatedNode = { ...existingNode, name: action.payload.name };
        state.nodes = state.nodes.set(action.payload.key, updatedNode);
      }
    },
    addEdge: (state, action:PayloadAction<{nodeID_1: string, nodeID_2:string}>) => {
      const nodeID_1: string = action.payload.nodeID_1;
      const nodeID_2: string = action.payload.nodeID_2;
      
      // console.log("====== before addEdge =====")
      // console.log(state.graph)

      let draftGraph = state.graph;

      if (!draftGraph.has(nodeID_1)) {
        draftGraph = draftGraph.set(nodeID_1, {forwardList:[], backwardList:[]})
      }

      if (!draftGraph.has(nodeID_2)) {
        draftGraph = draftGraph.set(nodeID_2, {forwardList:[], backwardList:[]})
      }


      // If it shows error is fine, it will work
      let forwardList = draftGraph.get(nodeID_1)?.forwardList ?? [];
      let backwardList = draftGraph.get(nodeID_2)?.backwardList ?? [];


      if (!forwardList.includes(nodeID_2)) {
        forwardList = [...forwardList, nodeID_2]
      }

      if (!backwardList.includes(nodeID_1)) {
       backwardList = [...backwardList, nodeID_1]
      }

      // type graud for [Object is possibly 'undefined'] issue
      let node_1 = draftGraph.get(nodeID_1)
      let node_2 = draftGraph.get(nodeID_2)
      if (node_1 != undefined && node_2 != undefined) {
        node_1.forwardList = forwardList;
        node_2.backwardList = backwardList;
      }


      // assign back the state's graph in redux store
      // "mark" the graph state as updated using set and delete
      state.graph = draftGraph
      state.modifiedFlag = state.modifiedFlag + 1
      // console.log("====== after =====")
      // console.log(state.graph)
      // console.log(state.nodes)
    },
    removeEdge: (state, action:PayloadAction<{nodeID_1: string, nodeID_2:string}>) => {
      const nodeID_1: string = action.payload.nodeID_1;
      const nodeID_2: string = action.payload.nodeID_2;
      
      // console.log("====== before removeEdge =====")
      // console.log(state.graph)

      let draftGraph = state.graph;

      if (!draftGraph.has(nodeID_1)) {
        console.log("Node not existing: ", nodeID_1)
      }
      if (!draftGraph.has(nodeID_2)) {
        console.log("Node not existing: ", nodeID_2)
      }


      // If it shows error is fine, it will work
      let forwardList:string[] = draftGraph.get(nodeID_1)?.forwardList ?? [];
      let backwardList:string[] = draftGraph.get(nodeID_2)?.backwardList ?? [];

      if (forwardList.includes(nodeID_2)) {
        forwardList = forwardList.filter(node => node !== nodeID_2);
      }
      if (backwardList.includes(nodeID_1)) {
        backwardList = backwardList.filter(node => node !== nodeID_1);
      }

      // type graud for [Object is possibly 'undefined'] issue
      let node_1 = draftGraph.get(nodeID_1)
      let node_2 = draftGraph.get(nodeID_2)
      if (node_1 != undefined && node_2 != undefined) {
        node_1.forwardList = forwardList;
        node_2.backwardList = backwardList;
      }

      // assign back the state's graph in redux store
      state.graph = draftGraph
      // console.log("====== after =====")
      // console.log(state.graph)
    }
  },
});

// Export the actions
export const {addNode_Dev, addNode, addNodeWithCoord, removeNode, updateNodeCoords, addEdge, removeEdge } = navMapSlice.actions;

// Export the reducer
export default navMapSlice.reducer;
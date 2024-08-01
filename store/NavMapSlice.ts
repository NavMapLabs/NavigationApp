import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Map } from 'immutable';
import { NavNodeType } from '@/constants/NavigationNode';
import { Coordinate } from '@/constants/Coordinate';

interface AdjacencyList {
  list: any;
}

// Define the initial state using an Immutable.js Map
interface NavMapState {
  nodes: Map<string, NavNodeType>;
  graph: Map<string, AdjacencyList>;
}

const initialState: NavMapState = {
  nodes: Map<string, NavNodeType>(),
  graph: Map<string, AdjacencyList>()
};

// Create the slice
const navMapSlice = createSlice({
  name: 'navMap',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<{ key: string, node: NavNodeType }>) => {
      state.nodes = state.nodes.set(action.payload.key, action.payload.node);
    },
    removeNode: (state, action: PayloadAction<{ key: string }>) => {
      state.nodes = state.nodes.delete(action.payload.key);
    },
    updateNodeCoords: (state, action: PayloadAction<{ key: string, coords: Coordinate }>) => {
      const existingNode = state.nodes.get(action.payload.key);
      if (existingNode) {
        const updatedNode = { ...existingNode, coords: action.payload.coords };
        state.nodes = state.nodes.set(action.payload.key, updatedNode);
      }
    },
  },
});

// Export the actions
export const { addNode, removeNode, updateNodeCoords } = navMapSlice.actions;

// Export the reducer
export default navMapSlice.reducer;
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Map } from 'immutable';
import { NavigationNode } from '@/constants/NavigationNode';
import { Coordinate } from '@/constants/Coordinate';

interface AdjacencyList {
    list: any;
  }

// Define the initial state using an Immutable.js Map
interface NavMapState {
  floorPlan: Map<string, NavigationNode>;
  graph: Map<string, AdjacencyList>;
}

const initialState: NavMapState = {
    floorPlan: Map<string, NavigationNode>(),
    graph: Map<string, AdjacencyList>()
};

// Create the slice
const navMapSlice = createSlice({
  name: 'navMap',
  initialState,
  reducers: {
    addNode: (state, action: PayloadAction<{ key: string, node: NavigationNode }>) => {
      state.floorPlan.set(action.payload.key, action.payload.node);
    },
    removeNode: (state, action: PayloadAction<{key: string}>) => {
      state.floorPlan.delete(action.payload.key);
    },
    updateNodeCoords: (state, action: PayloadAction<{ key: string, coords: Coordinate }>)=> {
        let existingNode = state.floorPlan.get(action.payload.key);
        if (existingNode) {
          existingNode = { ...existingNode, coords: action.payload.coords };
        }
    },
  },
});

// Export the actions
export const { addNode, removeNode, updateNodeCoords } = navMapSlice.actions;

// Export the reducer
export default navMapSlice.reducer;

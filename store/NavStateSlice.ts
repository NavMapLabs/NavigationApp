import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { remove } from 'immutable';

//create the initial state, pressed on a node

interface NavStateState {
  pressed: boolean;
  selectedNodeId: string;
  pastSelectedNodeId: string;
  selectedNodes: string[];
  mode: string;
}

const initialState: NavStateState = {
  pressed: false,
  selectedNodeId: "",
  pastSelectedNodeId: "",
  selectedNodes: [],
  mode: "single" // single, multiple or drag
};

//create the slice
const navStateSlice = createSlice({
  name: 'navState',
  initialState,
  reducers: {
    pressNode: (state, action: PayloadAction<{ nodeID: string }>) => {
        state.selectedNodes = [];
        state.pastSelectedNodeId = state.selectedNodeId;
        state.pressed = true;
        state.selectedNodeId = action.payload.nodeID;
    },
    unpressNode: (state) => {
      state.selectedNodes = [];
      state.pressed = false;
      state.selectedNodeId = "";
      state.pastSelectedNodeId = state.selectedNodeId;
    },
    pressSelectedNodes: (state, action: PayloadAction<{ nodeIDs: string[] }>) => {
      state.pastSelectedNodeId = "";
      state.selectedNodeId = "";
      for (let i = 0; i < action.payload.nodeIDs.length; i++) {
        state.selectedNodes.push(action.payload.nodeIDs[i]);
      }

      if (state.selectedNodes.length > 0) {
        state.pressed = true
      }
    },
    unpressSelectedNodes: (state, action: PayloadAction<{ nodeIDs: string[] }>) => {
      for (let i = 0; i < action.payload.nodeIDs.length; i++) {
        state.selectedNodes = state.selectedNodes.filter((node) => node !== action.payload.nodeIDs[i]);
      }
      if (state.selectedNodes.length === 0) {
        state.pressed = false
      }
    },
    addPressedNode: (state, action: PayloadAction<{ nodeID: string }>) => {
      state.selectedNodeId = "";
      state.selectedNodes.push(action.payload.nodeID);
    },
    removePressedNode: (state, action: PayloadAction<{ nodeID: string }>) => {
      state.selectedNodes = state.selectedNodes.filter((node) => node !== action.payload.nodeID);
    },
    changeMode: (state, action: PayloadAction<{ mode: string }>) => {
      state.mode = action.payload.mode;
    },
    resetSelectedNodes: (state) => {
      state.selectedNodes = [];
    }
  }
});

export const { pressNode, 
               unpressNode, 
               pressSelectedNodes, 
               unpressSelectedNodes,
               addPressedNode,
               removePressedNode,
               changeMode,
               resetSelectedNodes } = navStateSlice.actions;

export default navStateSlice.reducer;
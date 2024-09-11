import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//create the initial state, pressed on a node

interface NavStateState {
  pressed: boolean;
  selectedNodeId: string;
  pastSelectedNodeId: string;
  selectedNodes: string[];
}

const initialState: NavStateState = {
  pressed: false,
  selectedNodeId: "",
  pastSelectedNodeId: "",
  selectedNodes: []
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
    pressSelectedNode: (state, action: PayloadAction<{ nodeID: string }>) => {
        state.selectedNodes.push(action.payload.nodeID);
    },
    unpressSelectedNode: (state, action: PayloadAction<{ nodeID: string }>) => {
        state.selectedNodes = state.selectedNodes.filter(id => id !== action.payload.nodeID);
    },
    resetSelectedNodes: (state) => {
        state.selectedNodes = [];
    }
  }
});

export const { pressNode, unpressNode, pressSelectedNode, unpressSelectedNode, resetSelectedNodes } = navStateSlice.actions;

export default navStateSlice.reducer;
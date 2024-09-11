import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { addNode } from './NavMapSlice';

//create the initial state, pressed on a node

interface NavStateState {
  pressed: boolean;
  selectedNodeId: string;
  pastSelectedNodeId: string;
}

const initialState: NavStateState = {
  pressed: false,
  selectedNodeId: "",
  pastSelectedNodeId: ""
};

//create the slice
const navStateSlice = createSlice({
  name: 'navState',
  initialState,
  reducers: {
    pressNode: (state, action: PayloadAction<{ nodeID: string }>) => {
        // console.log("============= pre press state =============")
        // console.log(state.selectedNodeId, state.pastSelectedNodeId)

        state.pastSelectedNodeId = state.selectedNodeId;
        state.pressed = true;
        state.selectedNodeId = action.payload.nodeID;
        
        // console.log("============= post press state =============")
        // console.log(state.selectedNodeId, state.pastSelectedNodeId)
    },
    unpressNode: (state) => {
        state.pressed = false;
        state.selectedNodeId = "";
        state.pastSelectedNodeId = "";
    },
    resetPreviousNode: (state) => {
        state.selectedNodeId = "";
    }
  }

});

export const { pressNode, unpressNode, resetPreviousNode } = navStateSlice.actions;

export default navStateSlice.reducer;
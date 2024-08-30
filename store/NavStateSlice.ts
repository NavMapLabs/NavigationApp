import { createSlice, PayloadAction } from '@reduxjs/toolkit';

//create the initial state, pressed on a node

interface NavStateState {
  pressed: boolean;
  selectedNodeId: string;
}

const initialState: NavStateState = {
  pressed: false,
  selectedNodeId: ""
};

//create the slice
const navStateSlice = createSlice({
  name: 'navState',
  initialState,
  reducers: {
    pressNode: (state, action: PayloadAction<{ nodeID: string }>) => {
        state.pressed = true;
        state.selectedNodeId = action.payload.nodeID;
    },
    unpressNode: (state) => {
        state.pressed = false;
        state.selectedNodeId = "";
    }
  }
});

export const { pressNode, unpressNode } = navStateSlice.actions;

export default navStateSlice.reducer;
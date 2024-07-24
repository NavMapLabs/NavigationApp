import { combineReducers } from '@reduxjs/toolkit';
import floorplanReducer from './floorplanReducer';

const rootReducer = combineReducers({
  floorplan: floorplanReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;

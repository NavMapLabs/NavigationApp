import { configureStore, createSelector  } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import floorplanReducer from './floorPlanSlice';

const rootReducer = combineReducers({
  floorplanState: floorplanReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const selectNodeByKey = (key: string) =>
  createSelector(
    (state: RootState) => state.floorplanState.floorPlan,
    (floorPlan) => floorPlan.get(key)
  );

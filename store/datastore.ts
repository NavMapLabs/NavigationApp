import { configureStore, createSelector  } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import NavMapReducer, { updateNodeCoords } from './NavMapSlice';
import NavStateReducer from './NavStateSlice';
import undoable, { excludeAction } from 'redux-undo';

const rootReducer = combineReducers({
  NavMapState: undoable(NavMapReducer, {
    limit: 20, //set a limit for the size of the history,
    filter: excludeAction([updateNodeCoords.type])
  }),
  // NavMapState: NavMapReducer,
  navState: NavStateReducer
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export const selectNodeByKey = (key: string) =>
  createSelector(
    (state: RootState) => state.NavMapState.present.nodes,
    (nodes) => nodes.get(key)
  );

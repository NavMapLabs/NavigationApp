import { configureStore, createSelector  } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import NavMapReducer from './NavMapSlice';

const rootReducer = combineReducers({
  NavMapState: NavMapReducer,
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
    (state: RootState) => state.NavMapState.nodes,
    (nodes) => nodes.get(key)
  );

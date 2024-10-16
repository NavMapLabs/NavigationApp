import { Button, StyleSheet, View } from "react-native";
import { AppDispatch, RootState } from "@/store/datastore";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import {
  removeNode,
  addNode,
  addNode_Dev,
  addEdge,
  removeEdge,
  loadMapState,
  NavMapState
} from "@/store/NavMapSlice";
import { Coordinate } from "@/constants/Coordinate";
import { NavNodeType } from "@/constants/NavigationNode";
import { useState } from "react";
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import { serializeMapData, deSerializationMapData } from "@/scripts/mapDataSerialization";

const AddNodeButton = () => {
  const [count, setCount] = useState(0);
  const [savedMap, setSavedMap] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const curState = useSelector((state: RootState) => state.NavMapState.present);
  const pastState = useSelector((state: RootState) => state.NavMapState.past);

  const handlePress_s = () => {
    // console.log("=== original ===");
    // console.log(curState);
    // console.log("=== serialized ===");
    const dataString = serializeMapData(curState);
    console.log(dataString);
    setSavedMap(dataString);
  };

  const handlePress_l = () => {
    // console.log("=== de-serialized ===");
    const newMapState = deSerializationMapData(savedMap);
    // console.log(newMapState);
    dispatch(loadMapState({newMapState: newMapState}));
    // console.log("=== loaded ===");
  };


  return (
    <>
      <Button title="save State" onPress={handlePress_s} />
      <Button title="load state" onPress={handlePress_l} />
    </>
  );
};

export default AddNodeButton;

const styles = StyleSheet.create({
  button: {
    zIndex: 9
},
});
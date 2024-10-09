import { Button } from "react-native";
import { AppDispatch, RootState } from "@/store/datastore";
import { useDispatch, UseDispatch, useSelector } from "react-redux";
import {
  removeNode,
  addNode,
  addNode_Dev,
  addEdge,
  removeEdge,
} from "@/store/NavMapSlice";
import { Coordinate } from "@/constants/Coordinate";
import { NavNodeType } from "@/constants/NavigationNode";
import { useState } from "react";
import { ActionCreators as UndoActionCreators } from 'redux-undo';
import {json} from "stream/consumers";

const AddNodeButton = () => {
  const [count, setCount] = useState(0);
  const dispatch = useDispatch<AppDispatch>();

  const curState = useSelector((state: RootState) => state.NavMapState.present);
  const pastState = useSelector((state: RootState) => state.NavMapState.past);

  const handlePress = () => {
    const jsonString = JSON.stringify(curState);
    console.log("Json string ----------")
    console.log(JSON.stringify(curState));

    console.log("parsed ----------")
    console.log(JSON.parse(jsonString))
    console.log("original ----------")
    console.log(curState)
  };

  const printState = () => {
    console.log("===== state history =====");
    // console.log(curState)
    console.log("history length: " + pastState.length);
  };

  const func2  = () => {
    dispatch(UndoActionCreators.undo());
    printState();
  }

  return (
    <>
      <Button title="stringify" onPress={handlePress} />
      <Button title="undo" onPress={func2} />
    </>
  );
};

export default AddNodeButton;

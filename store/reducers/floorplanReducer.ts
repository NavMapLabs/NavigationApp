import { FloorplanActions, CREATE_FLOORPLAN, ADD_NODE, REMOVE_NODE, ADD_EDGE, REMOVE_EDGE, MODIFY_NODE, MODIFY_NODE_TAG, MODIFY_NODE_DESCRIPTION, CHECK_EDGE } from '../actions/floorplanActions';
import Graph from '../../scripts/map_editor/graph';
import Floorplan from '../../scripts/map_editor/floorplan';

interface FloorplanState {
  floorplan: Floorplan;
  edgeExists?: boolean;
}

const initialState: FloorplanState = {
  floorplan: new Floorplan("empty", null),
};

const floorplanReducer = (state = initialState, action: FloorplanActions): FloorplanState => {
  switch (action.type) {
    case CREATE_FLOORPLAN:
      return {
        ...state,
        floorplan: new Floorplan(action.payload.name, action.payload.data),
      };

    case ADD_NODE:
      if (state.floorplan) {
        state.floorplan.addNode(action.payload.name, action.payload.coords, action.payload.tag, action.payload.description);
      }
      return { ...state };

    case REMOVE_NODE:
      if (state.floorplan) {
        state.floorplan.removeNode(action.payload.nodeId);
      }
      return { ...state };

    case ADD_EDGE:
      if (state.floorplan) {
        state.floorplan.addEdge(action.payload.nodeId1, action.payload.nodeId2, action.payload.distance);
      }
      return { ...state };

    case REMOVE_EDGE:
      if (state.floorplan) {
        state.floorplan.removeEdge(action.payload.nodeId1, action.payload.nodeId2);
      }
      return { ...state };

    case MODIFY_NODE:
      if (state.floorplan) {
        state.floorplan.modifyNode(action.payload.nodeId, action.payload.name);
      }
      return { ...state };

    case MODIFY_NODE_TAG:
      if (state.floorplan) {
        state.floorplan.modifyNodeTag(action.payload.nodeId, action.payload.tag);
      }
      return { ...state };

    case MODIFY_NODE_DESCRIPTION:
      if (state.floorplan) {
        state.floorplan.modifyNodeDescription(action.payload.nodeId, action.payload.description);
      }
      return { ...state };

    case CHECK_EDGE:
      if (state.floorplan) {
        const edgeExists = state.floorplan.checkEdge(action.payload.nodeId1, action.payload.nodeId2);
        return { ...state, edgeExists };
      }
      return { ...state };

    default:
      return state;
  }
};

export default floorplanReducer;

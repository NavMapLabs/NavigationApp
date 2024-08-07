import { Action } from 'redux';
import { Coordinate } from '@/constants/Coordinate';

export const CREATE_FLOORPLAN = 'CREATE_FLOORPLAN';
export const ADD_NODE = 'ADD_NODE';
export const REMOVE_NODE = 'REMOVE_NODE';
export const ADD_EDGE = 'ADD_EDGE';
export const REMOVE_EDGE = 'REMOVE_EDGE';
export const MODIFY_NODE = 'MODIFY_NODE';
export const MODIFY_NODE_TAG = 'MODIFY_NODE_TAG';
export const MODIFY_NODE_DESCRIPTION = 'MODIFY_NODE_DESCRIPTION';
export const CHECK_EDGE = 'CHECK_EDGE';

export interface CreateFloorplanAction extends Action<typeof CREATE_FLOORPLAN> {
  payload: { name: string; data: any | null };
}

export interface AddNodeAction extends Action<typeof ADD_NODE> {
  payload: { name: string; coords: Coordinate; tag?: string; description?: string };
}

export interface RemoveNodeAction extends Action<typeof REMOVE_NODE> {
  payload: { nodeId: string };
}

export interface AddEdgeAction extends Action<typeof ADD_EDGE> {
  payload: { nodeId1: string; nodeId2: string; distance: number };
}

export interface RemoveEdgeAction extends Action<typeof REMOVE_EDGE> {
  payload: { nodeId1: string; nodeId2: string };
}

export interface ModifyNodeAction extends Action<typeof MODIFY_NODE> {
  payload: { nodeId: string; name: string };
}

export interface ModifyNodeTagAction extends Action<typeof MODIFY_NODE_TAG> {
  payload: { nodeId: string; tag: string };
}

export interface ModifyNodeDescriptionAction extends Action<typeof MODIFY_NODE_DESCRIPTION> {
  payload: { nodeId: string; description: string };
}

export interface CheckEdgeAction extends Action<typeof CHECK_EDGE> {
  payload: { nodeId1: string; nodeId2: string };
}

export type FloorplanActions =
  | CreateFloorplanAction
  | AddNodeAction
  | RemoveNodeAction
  | AddEdgeAction
  | RemoveEdgeAction
  | ModifyNodeAction
  | ModifyNodeTagAction
  | ModifyNodeDescriptionAction
  | CheckEdgeAction;

export const createFloorplan = (name: string, data: any | null): CreateFloorplanAction => ({
  type: CREATE_FLOORPLAN,
  payload: { name, data },
});

export const addNode = (name: string, coords: Coordinate, tag: string = 'None', description: string = ''): AddNodeAction => ({
  type: ADD_NODE,
  payload: { name, coords, tag, description },
});

export const removeNode = (nodeId: string): RemoveNodeAction => ({
  type: REMOVE_NODE,
  payload: { nodeId },
});

export const addEdge = (nodeId1: string, nodeId2: string, distance: number): AddEdgeAction => ({
  type: ADD_EDGE,
  payload: { nodeId1, nodeId2, distance },
});

export const removeEdge = (nodeId1: string, nodeId2: string): RemoveEdgeAction => ({
  type: REMOVE_EDGE,
  payload: { nodeId1, nodeId2 },
});

export const modifyNode = (nodeId: string, name: string): ModifyNodeAction => ({
  type: MODIFY_NODE,
  payload: { nodeId, name },
});

export const modifyNodeTag = (nodeId: string, tag: string): ModifyNodeTagAction => ({
  type: MODIFY_NODE_TAG,
  payload: { nodeId, tag },
});

export const modifyNodeDescription = (nodeId: string, description: string): ModifyNodeDescriptionAction => ({
  type: MODIFY_NODE_DESCRIPTION,
  payload: { nodeId, description },
});

export const checkEdge = (nodeId1: string, nodeId2: string): CheckEdgeAction => ({
  type: CHECK_EDGE,
  payload: { nodeId1, nodeId2 },
});

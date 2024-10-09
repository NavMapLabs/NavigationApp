import {Coordinate} from './Coordinate'

export interface NavNodeType {
    name: string;
    id: string;
    type: string;
    coords: Coordinate;
    tags: string[];
    description: string;
  }
  
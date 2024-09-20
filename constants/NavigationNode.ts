import {Coordinate} from './Coordinate'

export interface NavNodeType {
    name: string;
    id: string;
    coords: Coordinate;
    tags: string[];
    description: string;
  }
  
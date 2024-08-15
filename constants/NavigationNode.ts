import {Coordinate} from './Coordinate'

export interface NavNodeType {
    name: string;
    id: string;
    coords: Coordinate;
    tag: string;
    description: string;
  }
  
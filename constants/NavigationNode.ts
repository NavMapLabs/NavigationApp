import {Coordinate} from './Coordinate'

export interface NavigationNode {
    name: String;
    id: String;
    coords: Coordinate;
    tag: String;
    description: string;
  }
  
import { NavNodeType } from "@/constants/NavigationNode";

export interface MapData {
    data:string;
}

export interface MapData_Decoded {
    name: string;
    nodes: Map<string, NavNodeType>;
    graph: any;
    idPrefix: string;
}
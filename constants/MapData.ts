import { NavigationNode } from "@/constants/NavigationNode";

export interface MapData {
    data:string;
}

export interface MapData_Decoded {
    name: string;
    nodes: Map<string, NavigationNode>;
    graph: any;
    idPrefix: string;
}
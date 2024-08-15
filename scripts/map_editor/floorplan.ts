import { Coordinate } from "@/constants/Coordinate";
import { NavNodeType } from "@/constants/NavigationNode";
import {MapData, MapData_Decoded} from "@/constants/MapData";
const Graph = require('./graph')

class Floorplan {
    #nodes: Map<string, NavNodeType> = new Map();
    #graph = new Graph();
    name: string = "Blank";
    #idPrefix: string = "NA";
    
    constructor(name: string, data:MapData | null) {
        this.name = name;
        if (data != null) {
            this.deserialize(data);
        }
        else {
            this.#idPrefix = name.replace(/\s+/g, '').slice(0,2);
        }
    }

    get nodes(): Map<string, NavNodeType> {
        return this.#nodes;
    }

    get graph() {
        return this.#graph;
    }

    addNode(name: string, coords: Coordinate, tag = 'None', description = '') {
        const nodeId = this.#generateId();
        const node: NavNodeType = { 
            name:name, 
            id: nodeId, 
            coords:coords, 
            tag:tag, 
            description:description 
        };

        this.#nodes.set(nodeId, node);
        if (!this.#graph.addNode(nodeId)) {
            console.log('failed to add node');
        }
    }

    addEdge(nodeId1: string, nodeId2: string, distance: number) {
        if (!this.#graph.addEdge(nodeId1, nodeId2, distance)) {
            console.log('failed to add edge');
        }
    }

    removeNode(nodeId: string) {
        if (!this.#graph.removeNode(nodeId)) {
            console.log('node does not exist');
        }
        this.#nodes.delete(nodeId);
    }

    removeEdge(nodeId1: string, nodeId2: string) {
        if (!this.#graph.removeEdge(nodeId1, nodeId2)) {
            console.log('failed to remove edge: ');
        }
    }

    #generateId() {
        let id = this.#idPrefix + Math.random().toString().slice(2, 8);
        while (this.#nodes.get(id)) { 
            id = this.#idPrefix + Math.random().toString().slice(2, 8);
        };
        return id;
    }

    modifyNode(nodeId: string, name: string) {
        let node = this.#nodes.get(nodeId);
        if (!node) { return; }
        node.name = name;
    }

    modifyNodeTag(nodeId: string, tag: string = 'None') {
        let node = this.#nodes.get(nodeId);
        if (!node) { return; }
        node.tag = tag;
    }
    
    modifyNodeDescription(nodeId: string, description = '') {
        let node = this.#nodes.get(nodeId);
        if (!node) { return; }
        node.description = description;
    }
    
    checkEdge(node1Id:string , node2Id:string ) {
        return this.#graph.hasEdge(node1Id, node2Id)
    }

    serialize() {
        return JSON.stringify({
            'name': this.name,
            '#nodes': JSON.stringify(Array.from(this.nodes.entries())),
            '#graph': this.#graph.serialize(),
            '#idPrefix': this.#idPrefix
        });
    }

    deserialize(mapData:MapData) {
        let mapData_json: MapData_Decoded = JSON.parse(mapData.data);
        this.#nodes = mapData_json.nodes;
        this.#idPrefix = mapData_json.idPrefix;
        this.#graph = new Graph(mapData_json.graph);
    }
}

module.exports = Floorplan; 

export default Floorplan;
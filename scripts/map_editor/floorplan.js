const Graph = require('./graph')

class Floorplan {
    #nodes;
    #graph;
    #idPrefix;
    
    constructor(name, data = null) {
        this.name = name;
        if (data) {
            this.deserialize(data);
        }
        else {
            this.#nodes = new Map();
            this.#graph = new Graph();
            this.#idPrefix = name.replace(/\s+/g, '').slice(0,2);
        }
    }

    get nodes() {
        return this.#nodes;
    }

    get graph() {
        return this.#graph;
    }

    addNode(name, coords, tag = 'None', description = '') {
        const node = { name, coords, tag, description };
        const nodeId = this.#generateId();
        this.#nodes.set(nodeId, node);
        if (!this.#graph.addNode(nodeId)) {
            console.log('failed to add node');
        }
    }

    addEdge(nodeId1, nodeId2, distance) {
        if (!this.#graph.addEdge(nodeId1, nodeId2, distance)) {
            console.log('failed to add edge');
        }
    }

    removeNode(nodeId) {
        if (!this.#graph.removeNode(nodeId)) {
            console.log('node does not exist');
        }
        this.#nodes.delete(nodeId);
    }

    removeEdge(nodeId1, nodeId2) {
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

    modifyNode(nodeId, name) {
        let node = this.#nodes.get(nodeId);
        if (!node) { return; }
        node.name = name;
    }

    modifyNodeTag(nodeId, tag = 'None') {
        let node = this.#nodes.get(nodeId);
        if (!node) { return; }
        node.tag = tag;
    }
    
    modifyNodeDescription(nodeId, description = '') {
        let node = this.#nodes.get(nodeId);
        if (!node) { return; }
        node.description = description;
    }
    
    checkEdge(node1, node2) {
        return this.#graph.hasEdge(node1, node2)
    }

    serialize() {
        return JSON.stringify({
            'name': this.name,
            '#nodes': JSON.stringify(Array.from(this.nodes.entries())),
            '#graph': this.#graph.serialize(),
            '#idPrefix': this.#idPrefix
        });
    }

    deserialize(data) {
        data = JSON.parse(data);
        this.#nodes = new Map(JSON.parse(data['#nodes']));
        this.#idPrefix = data['#idPrefix'];
        this.#graph = new Graph(data = data['#graph']);
    }
}

module.exports = Floorplan; 
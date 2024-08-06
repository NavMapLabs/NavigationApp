class Graph {
    #directed;
    #adjacencyList;

    constructor(data = null, directed = true) {
        if (data) {
            this.deserialize(data);
        }
        else {
            this.#adjacencyList = {};
            this.#directed = directed;
        }
    }
    
    get adjacencyList() {
        // returns a deep copy of #adjacencyList
        return structuredClone(this.#adjacencyList);
    }
    
    addNode(node) {
        if (this.hasNode(node)) { return false }
        this.#adjacencyList[node] = [];
        return true;
    }

    addEdge(node1, node2, weight) {
        if (!this.hasNode(node1) || !this.hasNode(node2)) { return false; }
        this.#adjacencyList[node1].push({ node: node2, weight });
        if (this.#directed)
            this.#adjacencyList[node2].push({ node: node1, weight });
        return true;
    }

    removeEdge(node1, node2) {
        this.#adjacencyList[node1] = this.#adjacencyList[node1].filter(v => v.node != node2);
        if (this.#directed)
            this.#adjacencyList[node2] = this.#adjacencyList[node2].filter(v => v.node != node1);
        return true;
    }

    removeNode(node) {
        if (!this.hasNode(node)) { return false; }
        if (this.#directed) {
            this.#adjacencyList[node].forEach(edge => {
                this.removeEdge(node, edge.node);
            });
        }
        delete this.#adjacencyList[node];
        return true;
    }

    hasNode(node) {
        return node in this.#adjacencyList
    }

    hasEdge(node1, node2) {
        return this.#adjacencyList[node1].find(v => v.node == node2);
    }

    bfsPath(start, end) {
        if (!this.hasNode(start) || !this.hasNode(end)) { return []; }
        let visited = {};
        let q = [];
        visited[start] = true;
        q.push([start]);
        while (q.length > 0) {
            let path = q.shift();
            let node = path[path.length - 1]
            if (node == end) { return path; }
            this.#adjacencyList[node].forEach(neighbor => {
                if (!visited[neighbor.node]) {
                    let new_path = [...path];
                    new_path.push(neighbor.node);
                    q.push(new_path);
                    visited[neighbor.node] = true;
                }
            })
        }
        return [];
    }

    dfsPath(start, end) {
        if (!this.hasNode(start) || !this.hasNode(end)) { return false; }
        let visited = {};
        const self = this;
        function dfsHelper(node) {
            if (node == end) { return true; }
            visited[node] = true;
            for (let neighbor of self.adjacencyList[node]) {
                if (!visited[neighbor.node] && dfsHelper(neighbor.node)) { return true; }
            }
            return false;
        }
        return dfsHelper(start);
    }

    serialize() {
        return JSON.stringify({'#adjacencyList': this.#adjacencyList, '#directed': this.#directed});
    }

    deserialize(data) {
        data = JSON.parse(data);
        this.#adjacencyList = data['#adjacencyList'];
        this.#directed = data['#directed'];
    }
}

module.exports = Graph;
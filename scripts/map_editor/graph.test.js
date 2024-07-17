const Graph = require('./graph')

describe('Graph operations', () => {
    let graph;
    beforeEach(() => {
        graph = new Graph();
        graph.addNode('A');
        graph.addNode('B');
        graph.addNode('C');
        graph.addNode('D');
        graph.addNode('E');
        graph.addNode('F');
        graph.addNode('G');
        graph.addEdge('A', 'B', 10);
        graph.addEdge('A', 'C', 2);
        graph.addEdge('B', 'D', 5);
        graph.addEdge('B', 'E', 8);
        graph.addEdge('C', 'E', 3);
        graph.addEdge('C', 'F', 1);
        graph.addEdge('D', 'E', 4);
        graph.addEdge('E', 'F', 2);
    });

    test('Adding Nodes Test', () => {
        expect(graph.adjacencyList).toHaveProperty('A');
        expect(graph.adjacencyList).toHaveProperty('B');
        expect(graph.adjacencyList).toHaveProperty('C');
    });

    test('Adding Edges Test', () => {
        expect(graph.adjacencyList['A']).toContainEqual({ node: 'B', weight: 10 });
        expect(graph.adjacencyList['A']).toContainEqual({ node: 'C', weight: 2 });
        expect(graph.adjacencyList['B']).toContainEqual({ node: 'A', weight: 10 });
        expect(graph.adjacencyList['B']).toContainEqual({ node: 'D', weight: 5 });
        expect(graph.adjacencyList['C']).toContainEqual({ node: 'A', weight: 2 });
        expect(graph.adjacencyList['C']).toContainEqual({ node: 'E', weight: 3 });
        expect(graph.adjacencyList['D']).toContainEqual({ node: 'B', weight: 5 });
        expect(graph.adjacencyList['E']).toContainEqual({ node: 'C', weight: 3 });
    });

    test('Removing Edges Test', () => {
        graph.removeEdge('C', 'F');
        graph.removeEdge('A', 'B');
        expect(graph.adjacencyList['A']).not.toContainEqual({ node: 'B', weight: 10});
        expect(graph.adjacencyList['C']).not.toContainEqual({ node: 'F', weight: 1});
    });

    test('Removing Nodes Test', () => {
        graph.removeNode('F');
        expect(graph.adjacencyList['C']).not.toContainEqual({ node: 'F', weight: 1});
        expect(graph.adjacencyList['E']).not.toContainEqual({ node: 'F', weight: 2});
        expect(graph.adjacencyList).not.toHaveProperty('F');
    });

    test('Has Node Function Test', () => {
        expect(graph.hasNode('A')).toBeTruthy();
        expect(graph.hasNode('F')).toBeTruthy();
        expect(graph.hasNode('Z')).toBeFalsy();
    });

    test('Has Edge Function Test', () => {
        expect(graph.hasEdge('A', 'B')).toBeTruthy();
        expect(graph.hasEdge('E', 'F')).toBeTruthy();
        expect(graph.hasEdge('A', 'F')).toBeFalsy();
    });

    test('BFS Search Path Test', () => {
        expect(graph.bfsPath('A', 'E')).toEqual(['A','B','E']);
        expect(graph.bfsPath('A', 'C')).toEqual(['A', 'C']);
        expect(graph.bfsPath('A', 'G')).toEqual([]);
    });

    test('DFS Search Path Test', () => {
        expect(graph.dfsPath('A', 'E')).toBeTruthy();
        expect(graph.dfsPath('A', 'C')).toBeTruthy();
        expect(graph.dfsPath('A', 'G')).toBeFalsy();
    })

    test('Graphs with no edges Test', () => {
        const emptyGraph = new Graph();
        emptyGraph.addNode('X');
        emptyGraph.addNode('Y');
        expect(emptyGraph.adjacencyList['X']).toHaveLength(0);
    })
})
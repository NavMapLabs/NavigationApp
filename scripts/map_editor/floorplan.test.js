const Floorplan = require('./floorplan')

describe('Graph operations', () => {
    let floorplan;
    let array;
    beforeEach(() => {
        floorplan = new Floorplan('temp');
        floorplan.addNode('A', [0, 0]);
        floorplan.addNode('B', [0, 1]);
        floorplan.addNode('C', [1, 1]);
        floorplan.addNode('D', [2, 1]);
        floorplan.addNode('E', [2, 2]);
        floorplan.addNode('F', [2, 3]);
        floorplan.addNode('G', [3, 2]);

        array = [...floorplan.nodes];
        const a = array.find(([key, value]) => 'A' === value.name)[0];
        const b = array.find(([key, value]) => 'B' === value.name)[0];
        const c = array.find(([key, value]) => 'C' === value.name)[0];
        const d = array.find(([key, value]) => 'D' === value.name)[0];
        const e = array.find(([key, value]) => 'E' === value.name)[0];
        const f = array.find(([key, value]) => 'F' === value.name)[0];
        floorplan.addEdge(a, b, 10);
        floorplan.addEdge(a, c, 2);
        floorplan.addEdge(b, d, 5);
        floorplan.addEdge(b, e, 8);
        floorplan.addEdge(c, e, 3);
        floorplan.addEdge(c, f, 1);
        floorplan.addEdge(d, e, 4);
        floorplan.addEdge(e, f, 2);
    });

    test('Adding Nodes Test', () => {
        expect(floorplan.nodes.values()).toContainEqual(expect.objectContaining({ 'name': 'A', 'coords': [0, 0] }));
        expect(floorplan.nodes.values()).toContainEqual(expect.objectContaining({ 'name': 'B', 'coords': [0, 1] }));
        expect(floorplan.nodes.values()).toContainEqual(expect.objectContaining({ 'name': 'C', 'coords': [1, 1] }));
    });

    test('Adding Edges Test', () => {
        const a = array.find(([key, value]) => 'A' === value.name)[0];
        const b = array.find(([key, value]) => 'B' === value.name)[0];
        const c = array.find(([key, value]) => 'C' === value.name)[0];
        const d = array.find(([key, value]) => 'D' === value.name)[0];
        const e = array.find(([key, value]) => 'E' === value.name)[0];

        expect(floorplan.checkEdge(a,b)).toEqual({ node: b, weight: 10 });
        expect(floorplan.checkEdge(a,c)).toEqual({ node: c, weight: 2 });
        expect(floorplan.checkEdge(b,a)).toEqual({ node: a, weight: 10 });
        expect(floorplan.checkEdge(b,d)).toEqual({ node: d, weight: 5 });
        expect(floorplan.checkEdge(c,a)).toEqual({ node: a, weight: 2 });
        expect(floorplan.checkEdge(c,e)).toEqual({ node: e, weight: 3 });
        expect(floorplan.checkEdge(d,b)).toEqual({ node: b, weight: 5 });
        expect(floorplan.checkEdge(e,c)).toEqual({ node: c, weight: 3 });
    });

    test('Removing Edges Test', () => {
        const a = array.find(([key, value]) => 'A' === value.name)[0];
        const b = array.find(([key, value]) => 'B' === value.name)[0];
        const c = array.find(([key, value]) => 'C' === value.name)[0];
        const f = array.find(([key, value]) => 'F' === value.name)[0];
        floorplan.removeEdge(c, f);
        floorplan.removeEdge(a, b);
        expect(floorplan.checkEdge(a, b)).toBeUndefined();
        expect(floorplan.checkEdge(b, a)).toBeUndefined();
        expect(floorplan.checkEdge(c, f)).toBeUndefined();
        expect(floorplan.checkEdge(f, c)).toBeUndefined();
    });

    test('Removing Nodes Test', () => {
        const c = array.find(([key, value]) => 'C' === value.name)[0];
        const e = array.find(([key, value]) => 'E' === value.name)[0];
        const f = array.find(([key, value]) => 'F' === value.name)[0];

        floorplan.removeNode(f);
        expect(floorplan.checkEdge(c, f)).toBeUndefined();
        expect(floorplan.checkEdge(e, f)).toBeUndefined();
        expect(floorplan.graph.adjacencyList).not.toHaveProperty(f);
        expect(floorplan.nodes).not.toHaveProperty(f);
    });

    test('Serialization of Floorplan', () => {
        let serialized = floorplan.serialize();
        const copy = new Floorplan(floorplan.name, data = serialized);
        expect(copy.serialize()).toEqual(serialized);
    })
})
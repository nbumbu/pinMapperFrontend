import Mapper, { createGraph, matchingToMapping, CFG} from "./algorithm";

const matrixGenerator = (numberOfColumns, numberOfRows) => {

    const matrix = new Array(numberOfRows).fill([]);
    for (let i in matrix) {
        let ports = [];
        console.log(i)
        new Array(numberOfColumns).fill(0).forEach(port => {
            let portValue = Math.round(Math.random());
            ports.push(portValue);
        })
        matrix[i] = ports;
    };
    console.log(matrix);
    return matrix;
};

describe('Algorithm test-suite', () => {


    test('it should not throw errors', () => {

    });

    test('it shall return Ford-Fulkerson graph where capacity is 1 or 0 => mapping matrix', () => {
        const selectedSignals = ['s1', 's2', 's3', 's4'];
        const signalPortsData = {
            's1': ['p1', 'p2', 'p3'],
            's2': ['p2', 'p3'],
            's3': ['p3'],
            's4': ['p1', 'p4'],
            's5': ['p1', 'p12'],
            's6': ['p1', 'p5', 'p6', 'p7']
        };

        const resultMatrix = createGraph(selectedSignals, signalPortsData);
        const expectedMatrix = [[1, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [1, 0, 0, 1]
        ];

        expect(resultMatrix).toEqual(expectedMatrix);
    });

    test('it shall return the matching, 4 ports 4 signals case', () => {
        const inputMatrix = [[1, 1, 1, 0],
        [0, 1, 1, 0],
        [0, 0, 1, 0],
        [1, 0, 0, 1]
        ];
        const expectedMatching = { '0': '0', '1': '1', '2': '2', '3': '3' };
        const g = new CFG(inputMatrix);
        expect(g.maxBPM()).toEqual(expectedMatching);
    });


    test('it shall return the matching, 4 ports 4 signals, order chaotic', () => {
        const inputMatrix = [[0, 0, 1, 1],
        [1, 0, 1, 0],
        [1, 0, 1, 0],
        [0, 1, 0, 1]
        ];
        const expectedMatching = { '0': '3', '1': '2', '2': '0', '3': '1' };
        const g = new CFG(inputMatrix);
        expect(g.maxBPM()).toEqual(expectedMatching);
    });

    test('it shall return the matching, 5 ports 4 signals, order chaotic', () => {
        const inputMatrix = [[0, 0, 1, 1, 1],
        [1, 0, 1, 0, 0],
        [1, 0, 1, 0, 0],
        [0, 1, 0, 1, 1]
        ];
        const expectedMatching = { '0': '3', '1': '2', '2': '0', '3': '1' };
        const g = new CFG(inputMatrix);
        expect(g.maxBPM()).toEqual(expectedMatching);
    });

    test('it shall return the matching, 5 ports 6 signals, order chaotic', () => {
        const inputMatrix = [[0, 0, 1, 1, 1],
        [1, 0, 1, 0, 0],
        [1, 0, 1, 0, 0],
        [0, 1, 0, 1, 1],
        [0, 1, 0, 1, 1],
        [0, 1, 0, 1, 1]
        ];
        const expectedMatching = { '0': '4', '1': '2', '2': '0', '3': '3', '4': '1' };
        const g = new CFG(inputMatrix);
        expect(g.maxBPM()).toEqual(expectedMatching);
        matrixGenerator(4, 4);
    });

    test('it shall create mapping from resulted matching (signals & ports instead of 0 & 1)', () => {
        const selectedSignals = ['s1', 's2', 's3', 's4'];
        const signalPortsData = {
            's1': ['p1', 'p2', 'p3'],
            's2': ['p2', 'p3'],
            's3': ['p3'],
            's4': ['p1', 'p4'],
            's5': ['p1', 'p12'],
            's6': ['p1', 'p5', 'p6', 'p7']
        };

        const matchingResult = { '0': '0', '1': '1', '2': '2', '3': '3' };
        const expectedMapping = { 's1': 'p1', 's2': 'p2', 's3': 'p3', 's4': 'p4' };
        const mapping = matchingToMapping(selectedSignals, signalPortsData, matchingResult);


        expect(mapping).toEqual(expectedMapping);
    });

    test('it shall return a valid mathcing: error encoountered', () => {
        const selectedSignals = ['s1', 's2', 's3'];
        const signalsPortsData = {
            's1': ['p0', 'p1'],
            's2': ['p0', 'p1', 'p2', 'p3', 'p4'],
            's3': ['p5']
        };

        const mappingResult = Mapper(selectedSignals, signalsPortsData);
        console.log(mappingResult);
    });

    test('it shall run the Mapper() function without errors', () => {
        const selectedSignals = ['s1', 's2', 's3', 's4'];
        const signalPortsData = {
            's1': ['p1', 'p2', 'p3'],
            's2': ['p2', 'p3'],
            's3': ['p3'],
            's4': ['p1', 'p4'],
            's5': ['p1', 'p12'],
            's6': ['p1', 'p5', 'p6', 'p7']
        };
        const mappingResult = Mapper(selectedSignals, signalPortsData);
        console.log(mappingResult);
    });

});

describe('Algorithm stress testing with random matrix generator', () => {

    test.skip('it shall execute without errors: case 70x70', () => {
        const inputMatrix = matrixGenerator(70, 70);
        const g = new CFG(inputMatrix);
        g.maxBPM();
    });

});

const {
    calculateMapChecksum,
    calculateMinOrbitalTransfers,
} = require('./utils');

describe('calculateMapChecksum()', () => {
    const testHelper = (orbitMap, expectedOutput) => {
        expect(calculateMapChecksum(orbitMap)).toEqual(expectedOutput);
    };

    it('Returns the correct distances', () => {
        testHelper('COM)B', 1);
        testHelper(`COM)B
B)C`, 3);
        testHelper(`COM)B
B)C
C)D`, 6);
        testHelper(`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`, 42);
    });
});

describe('calculateMinOrbitalTransfers()', () => {
    const testHelper = (orbitalMap, fromNode, toNode, expectedOutput) => {
        expect(calculateMinOrbitalTransfers(orbitalMap, fromNode, toNode)).toEqual(expectedOutput);
    };

    it('Returns the correct transfers', () => {
        testHelper(`COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L
K)YOU
I)SAN`, 'YOU', 'SAN', 4);
    });
});

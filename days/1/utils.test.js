const {
    calculateModuleFuel,
    calculateTotalModuleFuel,
} = require('./utils');

describe('calculateModuleFuel()', () => {
    const testHelper = (mass, expectedFuel) => {
        expect(calculateModuleFuel(mass)).toEqual(expectedFuel);
    };

    test('Calculates fuel needed for module based on mass', () => {
        testHelper(12, 2);
        testHelper(14, 2);
        testHelper(1969, 654);
        testHelper(100756, 33583);
    });
});

describe('calculateTotalModuleFuel()', () => {
    const testHelper = (mass, expectedFuel) => {
        expect(calculateTotalModuleFuel(mass)).toEqual(expectedFuel);
    };

    test('Calculates total fuel needed for module based on mass', () => {
        testHelper(12, 2);
        testHelper(14, 2);
        testHelper(1969, 966);
        testHelper(100756, 50346);
    });
});

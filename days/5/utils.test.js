const {
    processIntcodeProgram,
} = require('./utils');

describe('processIntcodeProgram()', () => {
    const testHelper = (intCodes, inputs, expectedCodes, expectedOutputs) => {
        const target = processIntcodeProgram(intCodes, inputs);
        if (expectedCodes) {
            expect(target.codes).toEqual(expectedCodes);
        }
        if (expectedOutputs) {
            expect(target.outputs).toEqual(expectedOutputs);
        }
    };

    it('Works correctly', () => {
        testHelper('1,0,0,0,99', '', '2,0,0,0,99', []);
        testHelper('2,3,0,3,99', '', '2,3,0,6,99', []);
        testHelper('2,4,4,5,99,0', '', '2,4,4,5,99,9801', []);
        testHelper('1,1,1,4,99,5,6,0,99', '', '30,1,1,4,2,5,6,0,99', []);
        testHelper('1002,4,3,4,33', '', '1002,4,3,4,99', []);
    });

    it('Works for part 2', () => {
        testHelper('3,9,8,9,10,9,4,9,99,-1,8', '8', undefined, [1]);
        testHelper('3,9,8,9,10,9,4,9,99,-1,8', '5', undefined, [0]);

        testHelper('3,9,7,9,10,9,4,9,99,-1,8', '7', undefined, [1]);
        testHelper('3,9,7,9,10,9,4,9,99,-1,8', '8', undefined, [0]);

        testHelper('3,3,1108,-1,8,3,4,3,99', '8', undefined, [1]);
        testHelper('3,3,1108,-1,8,3,4,3,99', '2', undefined, [0]);

        testHelper('3,3,1107,-1,8,3,4,3,99', '7', undefined, [1]);
        testHelper('3,3,1107,-1,8,3,4,3,99', '8', undefined, [0]);

        testHelper('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', '0', undefined, [0]);
        testHelper('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', '1', undefined, [1]);
        testHelper('3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9', '4', undefined, [1]);

        testHelper('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', '0', undefined, [0]);
        testHelper('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', '1', undefined, [1]);
        testHelper('3,3,1105,-1,9,1101,0,0,12,4,12,99,1', '4', undefined, [1]);

        testHelper('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99', '7', undefined, [999]);
        testHelper('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99', '8', undefined, [1000]);
        testHelper('3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99', '9', undefined, [1001]);
    });
});

const {
    processIntcodeProgram,
} = require('./index');

describe('processIntcodeProgram()', () => {
    const testHelper = (intCodes, expectedOutput) => {
        expect(processIntcodeProgram(intCodes)).toEqual(expectedOutput);
    };

    it('Works correctly', () => {
        testHelper('1,0,0,0,99', '2,0,0,0,99');
        testHelper('2,3,0,3,99', '2,3,0,6,99');
        testHelper('2,4,4,5,99,0', '2,4,4,5,99,9801');
        testHelper('1,1,1,4,99,5,6,0,99', '30,1,1,4,2,5,6,0,99');
    });
});

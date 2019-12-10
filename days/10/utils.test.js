const {
    IntcodeProgram,
} = require('./utils');

describe('IntcodeProgram', () => {
    const testHelper = (intCodes, inputs, expectedOutput) => {
        const p = new IntcodeProgram(intCodes, inputs);
        p.runUntilHalted();
        expect(p.takeNextOutput()).toEqual(expectedOutput);
    };

    it('handles the new opcode correctly', () => {
        testHelper('1102,34915192,34915192,7,4,7,99,0', [], 1219070632396864);
        testHelper('104,1125899906842624,99', [], 1125899906842624);
    });

    it('outputs a copy of itself', () => {
        const codes = '109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99';
        const computer = new IntcodeProgram(codes, []);
        codes.split(',').map(Number).forEach(c => {
            expect(computer.takeNextOutput()).toEqual(c);
        });
    });
});

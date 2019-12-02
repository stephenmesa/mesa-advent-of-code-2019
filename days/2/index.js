const processIntcodeProgram = (intCodes) => {
    const codes = intCodes.split(',').map(v => Number(v));

    let i = 0;

    let opCode, a, b, aIndex, bIndex, targetIndex, target;

    while(i < codes.length) {
        opCode = codes[i];

        switch (opCode) {
            case 1:
                // Add
                aIndex = codes[i+1];
                a = codes[aIndex];
                bIndex = codes[i+2];
                b = codes[bIndex];

                targetIndex = codes[i+3];
                codes[targetIndex] = a + b;

                i += 4;
                break;
            case 2:
                // Multiply
                aIndex = codes[i+1];
                a = codes[aIndex];
                bIndex = codes[i+2];
                b = codes[bIndex];

                targetIndex = codes[i+3];
                codes[targetIndex] = a * b;

                i += 4;
                break;
            case 99:
                // Terminate
                i = codes.length;
                break;
            default:
                throw new Error(`Invalid opCode: ${opCode}`);
        }
    }

    return codes.join(',');
};

const generateProgram = (noun, verb) =>
    `1,${noun},${verb},3,1,1,2,3,1,3,4,3,1,5,0,3,2,10,1,19,2,19,6,23,2,13,23,27,1,9,27,31,2,31,9,35,1,6,35,39,2,10,39,43,1,5,43,47,1,5,47,51,2,51,6,55,2,10,55,59,1,59,9,63,2,13,63,67,1,10,67,71,1,71,5,75,1,75,6,79,1,10,79,83,1,5,83,87,1,5,87,91,2,91,6,95,2,6,95,99,2,10,99,103,1,103,5,107,1,2,107,111,1,6,111,0,99,2,14,0,0`;

const getOutputFromProgram = (program) =>
    processIntcodeProgram(program).split(',')[0];

console.log('Part 1:', getOutputFromProgram(generateProgram(12,2)));

const deriveNounAndVerbForOutput = (output) => {
    for (let noun = 0; noun < 100; noun++) {
        for (let verb = 0; verb < 100; verb++) {
            if (Number(getOutputFromProgram(generateProgram(noun, verb))) === output) {
                return 100 * noun + verb;
            }
        }
    }
}

console.log('Part 2:', deriveNounAndVerbForOutput(19690720));

module.exports = {
    processIntcodeProgram,
};

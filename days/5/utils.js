const processIntcodeProgram = (intCodes, inputValues = '') => {
    const codes = intCodes.split(',').map(v => Number(v));
    const inputs = inputValues.split(',');
    const outputs = [];

    let i = 0;

    let opCodeChars, opCode, a, b, targetIndex, firstMode, secondMode, thirdMode;

    while(i < codes.length) {
        opCodeChars = codes[i].toString().split('');
        opCode = Number(opCodeChars.splice(-2, 2).join(''));

        firstMode = opCodeChars.length > 0 ? Number(opCodeChars.splice(-1, 1)) : 0;
        secondMode = opCodeChars.length > 0 ? Number(opCodeChars.splice(-1, 1)) : 0;
        thirdMode = opCodeChars.length > 0 ? Number(opCodeChars.splice(-1, 1)) : 0;

        const getParameterValue = (parameter, mode) =>
            mode === 1 ? Number(parameter) : Number(codes[parameter]);

        switch (opCode) {
            case 1:
                // Add
                a = getParameterValue(codes[i+1], firstMode);
                b = getParameterValue(codes[i+2], secondMode);

                targetIndex = codes[i+3];
                codes[targetIndex] = a + b;

                i += 4;
                break;
            case 2:
                // Multiply
                a = getParameterValue(codes[i+1], firstMode);
                b = getParameterValue(codes[i+2], secondMode);

                targetIndex = codes[i+3];
                codes[targetIndex] = a * b;

                i += 4;
                break;
            case 3:
                // Input
                const input = Number(inputs[0]);
                inputs.splice(0, 1);
                if (typeof input == 'Number') {
                    throw new Error('Input requested but not provided');
                }

                targetIndex = codes[i+1];
                codes[targetIndex] = input;

                i += 2;
                break;
            case 4:
                // Output
                a = getParameterValue(codes[i+1], firstMode);

                outputs.push(a);

                i += 2;
                break;
            case 5:
                // Jump if true
                a = getParameterValue(codes[i+1], firstMode);
                b = getParameterValue(codes[i+2], secondMode);

                if (a !== 0) {
                    // Jump instruction pointer
                    i = b;
                } else {
                    i += 3;
                }

                break;
            case 6:
                // Jump if false
                a = getParameterValue(codes[i+1], firstMode);
                b = getParameterValue(codes[i+2], secondMode);

                if (a === 0) {
                    // Jump instruction pointer
                    i = b;
                } else {
                    i += 3;
                }

                break;
            case 7:
                // Less than
                a = getParameterValue(codes[i+1], firstMode);
                b = getParameterValue(codes[i+2], secondMode);
                targetIndex = codes[i+3];


                if (a < b) {
                    codes[targetIndex] = 1;
                } else {
                    codes[targetIndex] = 0;
                }

                i += 4;
                break;
            case 8:
                // Equals
                a = getParameterValue(codes[i+1], firstMode);
                b = getParameterValue(codes[i+2], secondMode);
                targetIndex = codes[i+3];

                if (a === b) {
                    codes[targetIndex] = 1;
                } else {
                    codes[targetIndex] = 0;
                }

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

    return {
        codes: codes.join(','),
        outputs,
    };
};

module.exports = {
    processIntcodeProgram,
};

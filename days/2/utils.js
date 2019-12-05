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

module.exports = {
    processIntcodeProgram,
};

class IntcodeProgram {
    constructor(intCodes, inputs = []) {
        this.codes = intCodes.split(',').map(Number);
        this.inputQueue = inputs.map(Number);
        this.instructionPointer = 0;
        this.outputQueue = [];
        this.terminated = false;
        this.halted = false;
        this.relativeBase = 0;
    }
    getParameterValue(parameter, mode) {
        switch (mode) {
            case 0:
                // Position Mode
                const posVal = this.codes[parameter];
                // Default to 0 if nothing exists at that address
                return typeof posVal === 'undefined' ? 0 : Number(posVal);
                break;
            case 1:
                // Absolute Mode
                return Number(parameter);
                break;
            case 2:
                // Relative Mode
                const relVal = this.codes[this.relativeBase + parameter];
                return typeof relVal === 'undefined' ? 0 : Number(relVal);
            default:
                break;
        }
    }
    getParameterLiteralValue(parameter, mode) {
        switch (mode) {
            case 0:
            case 1:
                return Number(parameter);
                break;
            case 2:
                // Relative Mode
                return this.relativeBase + parameter;
                break;
            default:
                break;
        }
    }
    setCode(index, value) {
        this.codes[index] = value;
    }
    moveInstructionPointer(distance) {
        this.instructionPointer += distance;
    }
    getCodeRelativeToInstructionPointer(distance) {
        return this.codes[this.instructionPointer + distance];
    }
    takeNextInput() {
        return this.inputQueue.splice(0, 1)[0];
    }
    addOutput(value) {
        this.outputQueue.push(value);
    }
    takeNextOutput() {
        if (this.outputQueue.length === 0) {
            // no output, try to run the program until there is output
            this.halted = false;
            this.runUntilHalted();
        }
        if (this.outputQueue.length > 0) {
            return this.outputQueue.splice(0, 1)[0];
        }
    }
    runUntilHalted() {
        while (!this.terminated && !this.halted) {
            const opCodeChars = this.codes[this.instructionPointer].toString().split('');
            const opCode = Number(opCodeChars.splice(-2, 2).join(''));

            const firstMode = opCodeChars.length > 0 ? Number(opCodeChars.splice(-1, 1)) : 0;
            const secondMode = opCodeChars.length > 0 ? Number(opCodeChars.splice(-1, 1)) : 0;
            const thirdMode = opCodeChars.length > 0 ? Number(opCodeChars.splice(-1, 1)) : 0;

            let a, b

            switch (opCode) {
                case 1:
                    // Add
                    a = this.getParameterValue(this.getCodeRelativeToInstructionPointer(1), firstMode);
                    b = this.getParameterValue(this.getCodeRelativeToInstructionPointer(2), secondMode);

                    this.setCode(this.getParameterLiteralValue(this.getCodeRelativeToInstructionPointer(3), thirdMode), a + b);

                    this.moveInstructionPointer(4);
                    break;
                case 2:
                    // Multiply
                    a = this.getParameterValue(this.getCodeRelativeToInstructionPointer(1), firstMode);
                    b = this.getParameterValue(this.getCodeRelativeToInstructionPointer(2), secondMode);

                    this.setCode(this.getParameterLiteralValue(this.getCodeRelativeToInstructionPointer(3), thirdMode), a * b);

                    this.moveInstructionPointer(4);
                    break;
                case 3:
                    // Input
                    const input = this.takeNextInput();

                    if (typeof input !== 'number') {
                        this.halted = true;
                        break;
                    }

                    this.setCode(this.getParameterLiteralValue(this.getCodeRelativeToInstructionPointer(1), firstMode), input);

                    this.moveInstructionPointer(2);
                    break;
                case 4:
                    // Output
                    a = this.getParameterValue(this.getCodeRelativeToInstructionPointer(1), firstMode);

                    this.addOutput(a);

                    this.moveInstructionPointer(2);
                    break;
                case 5:
                    // Jump if true
                    a = this.getParameterValue(this.getCodeRelativeToInstructionPointer(1), firstMode);
                    b = this.getParameterValue(this.getCodeRelativeToInstructionPointer(2), secondMode);

                    if (a !== 0) {
                        // Jump instruction pointer
                        this.instructionPointer = b;
                    } else {
                        this.moveInstructionPointer(3);
                    }

                    break;
                case 6:
                    // Jump if false
                    a = this.getParameterValue(this.getCodeRelativeToInstructionPointer(1), firstMode);
                    b = this.getParameterValue(this.getCodeRelativeToInstructionPointer(2), secondMode);

                    if (a === 0) {
                        // Jump instruction pointer
                        this.instructionPointer = b;
                    } else {
                        this.moveInstructionPointer(3);
                    }

                    break;
                case 7:
                    // Less than
                    a = this.getParameterValue(this.getCodeRelativeToInstructionPointer(1), firstMode);
                    b = this.getParameterValue(this.getCodeRelativeToInstructionPointer(2), secondMode);

                    this.setCode(this.getParameterLiteralValue(this.getCodeRelativeToInstructionPointer(3), thirdMode), (a < b) ? 1 : 0);

                    this.moveInstructionPointer(4);
                    break;
                case 8:
                    // Equals
                    a = this.getParameterValue(this.getCodeRelativeToInstructionPointer(1), firstMode);
                    b = this.getParameterValue(this.getCodeRelativeToInstructionPointer(2), secondMode);

                    this.setCode(this.getParameterLiteralValue(this.getCodeRelativeToInstructionPointer(3), thirdMode), (a === b) ? 1 : 0);

                    this.moveInstructionPointer(4);
                    break;
                case 9:
                    // Relative Base Offset
                    const relativeBaseOffset = this.getParameterValue(this.getCodeRelativeToInstructionPointer(1), firstMode);

                    this.relativeBase += relativeBaseOffset;

                    this.moveInstructionPointer(2);
                    break;
                case 99:
                    // Terminate
                    this.terminated = true;
                    break;
                default:
                    throw new Error(`Invalid opCode: ${opCode}`);
            }
        }
    }
}

module.exports = {
    IntcodeProgram,
};
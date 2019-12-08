class IntcodeProgram {
    constructor(intCodes, inputs = []) {
        this.codes = intCodes.split(',').map(Number);
        this.inputQueue = inputs.map(Number);
        this.instructionPointer = 0;
        this.outputQueue = [];
        this.terminated = false;
        this.halted = false;
    }
    getParameterValue(parameter, mode) {
        return mode === 1 ? Number(parameter) : Number(this.codes[parameter]);
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
        const opCodeChars = this.codes[this.instructionPointer].toString().split('');
        const opCode = Number(opCodeChars.splice(-2, 2).join(''));

        const firstMode = opCodeChars.length > 0 ? Number(opCodeChars.splice(-1, 1)) : 0;
        const secondMode = opCodeChars.length > 0 ? Number(opCodeChars.splice(-1, 1)) : 0;

        let a, b

        switch (opCode) {
            case 1:
                // Add
                a = this.getParameterValue(this.getCodeRelativeToInstructionPointer(1), firstMode);
                b = this.getParameterValue(this.getCodeRelativeToInstructionPointer(2), secondMode);

                this.setCode(this.getCodeRelativeToInstructionPointer(3), a + b);

                this.moveInstructionPointer(4);
                break;
            case 2:
                // Multiply
                a = this.getParameterValue(this.getCodeRelativeToInstructionPointer(1), firstMode);
                b = this.getParameterValue(this.getCodeRelativeToInstructionPointer(2), secondMode);

                this.setCode(this.getCodeRelativeToInstructionPointer(3), a * b);

                this.moveInstructionPointer(4);
                break;
            case 3:
                // Input
                const input = this.takeNextInput();

                if (typeof input !== 'number') {
                    this.halted = true;
                    break;
                }

                this.setCode(this.getCodeRelativeToInstructionPointer(1), input);

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

                this.setCode(this.getCodeRelativeToInstructionPointer(3), (a < b) ? 1 : 0);

                this.moveInstructionPointer(4);
                break;
            case 8:
                // Equals
                a = this.getParameterValue(this.getCodeRelativeToInstructionPointer(1), firstMode);
                b = this.getParameterValue(this.getCodeRelativeToInstructionPointer(2), secondMode);

                this.setCode(this.getCodeRelativeToInstructionPointer(3), (a === b) ? 1 : 0);

                this.moveInstructionPointer(4);
                break;
            case 99:
                // Terminate
                this.terminated = true;
                break;
            default:
                throw new Error(`Invalid opCode: ${opCode}`);
        }

        if (!this.terminated && !this.halted) {
            this.runUntilHalted();
        }
    }
}

const calculateThrusterSignal = (program, shouldFeedback = false) => (phaseSequence) => {
    const amplifiers = phaseSequence.map((p, index) => ({
        program: new IntcodeProgram(program, index === 0 ? [Number(p), 0] : [Number(p)]),
    }));

    let bailOnInifiniteLoopCounter = 0;
    let lastOutputValue = null;

    let i = 0;
    while (i < amplifiers.length) {
        if (bailOnInifiniteLoopCounter > 4000) {
            throw new Error('We got an infinite loop y\'all');
        } else {
            bailOnInifiniteLoopCounter += 1;
        }
        const amplifier = amplifiers[i];
        const outputValue = amplifier.program.takeNextOutput();
        if (typeof outputValue !== 'number') {
            return lastOutputValue;
        }
        lastOutputValue = outputValue;
        const nextAmplifier = amplifiers[(i + 1) % amplifiers.length];
        nextAmplifier.program.inputQueue.push(outputValue);

        i += 1;
        if (i === amplifiers.length && shouldFeedback && outputValue) {
            i = 0;
        }
    }

    return lastOutputValue;
};

const getPermutations = (inputArr) => {
    let result = [];

    const permute = (arr, m = []) => {
        if (arr.length === 0) {
            result.push(m)
        } else {
            for (let i = 0; i < arr.length; i++) {
                let curr = arr.slice();
                let next = curr.splice(i, 1);
                permute(curr.slice(), m.concat(next))
            }
        }
    }

    permute(inputArr)

    return result;
}

const calculateMaxThrusterSignal = (program, shouldFeedback = false) => {
    const calculateThrusterSignalForProgram = calculateThrusterSignal(program, shouldFeedback);
    const thrusterSignals = shouldFeedback ?
        getPermutations([5, 6, 7, 8, 9]).map(calculateThrusterSignalForProgram) :
        getPermutations([0, 1, 2, 3, 4]).map(calculateThrusterSignalForProgram);
    return Math.max(...thrusterSignals);
};

module.exports = {
    calculateThrusterSignal,
    calculateMaxThrusterSignal,
};
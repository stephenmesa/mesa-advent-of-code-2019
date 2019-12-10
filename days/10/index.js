const fs = require('fs');

const {
    IntcodeProgram,
} = require('./utils');

fs.readFile('input.txt', { encoding: 'UTF-8' }, (err, data) => {
    if (err) {
        console.error('Could not read file input.txt');
        process.exit(1);
    }

    const part1 = new IntcodeProgram(data, [1]);
    console.log('Part 1:', part1.takeNextOutput());

    const part2 = new IntcodeProgram(data, [2]);
    console.log('Part 2:', part2.takeNextOutput());
});


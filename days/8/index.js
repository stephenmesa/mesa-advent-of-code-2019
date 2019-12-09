const fs = require('fs');

const {
    part1,
    part2,
} = require('./utils');

fs.readFile('input.txt', { encoding: 'UTF-8' }, (err, data) => {
    if (err) {
        console.error('Could not read file input.txt');
        process.exit(1);
    }
    console.log('Part 1:', part1(data, 25, 6));
    part2(data, 25, 6);
});


const fs = require('fs');

const {
    calculateMapChecksum,
} = require('./utils.js');

fs.readFile('input.txt', { encoding: 'utf-8' }, (err, data) => {
    if (err) {
        console.error('Error reading input.txt file', err);
        process.exit(1);
    }

    console.log('Part 1:', calculateMapChecksum(data));
});

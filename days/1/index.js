const fs = require('fs');
const { calculateModuleFuel } = require('./utils');

const isValidNumber = d =>
    d && d.length > 0 && !Number.isNaN(Number(d));

fs.readFile('input.txt', "utf8", (err, data) => {
    if (err) {
        console.error('Error reading input.txt file', err);
        process.exit(1);
    }
    const validInputValues = data.split('\n').filter(isValidNumber);
    const moduleMasses = validInputValues.map(v => Number(v));
    const moduleFuels = moduleMasses.map(calculateModuleFuel);

    const totalFuel = moduleFuels.reduce((acc, val) => acc + val, 0);

    console.log(`Total fuel required is ${totalFuel}`);
});

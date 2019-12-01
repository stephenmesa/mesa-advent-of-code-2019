const fs = require('fs');

const calculateModuleFuel = (mass) => {
    return Math.floor(mass / 3) - 2;
};

const calculateTotalModuleFuel = (mass) => {
    const fuel = calculateModuleFuel(mass);
    if (fuel < 0) {
        return 0;
    } else {
        return fuel + calculateTotalModuleFuel(fuel);
    }
};

const isValidNumber = d =>
    d && d.length > 0 && !Number.isNaN(Number(d));

const parseInputMasses = (filename) => new Promise((resolve, reject) =>
    fs.readFile(filename, "utf8", (err, data) => {
        if (err) {
            reject(err);
        } else {
            resolve(data.split('\n').filter(isValidNumber).map(v => Number(v)));
        }
    }));

module.exports = {
    calculateModuleFuel,
    calculateTotalModuleFuel,
    isValidNumber,
    parseInputMasses,
};

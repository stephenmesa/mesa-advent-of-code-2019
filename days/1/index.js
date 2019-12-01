const {
    calculateModuleFuel,
    calculateTotalModuleFuel,
    parseInputMasses,
} = require('./utils');

parseInputMasses('input.txt')
    .then((moduleMasses) => {
        // Part 1
        const moduleFuels = moduleMasses.map(calculateModuleFuel);
        const totalFuel = moduleFuels.reduce((acc, val) => acc + val, 0);
        console.log(`Part 1: Total fuel required is ${totalFuel}`);

        // Part 2
        const totalModuleFuels = moduleMasses.map(calculateTotalModuleFuel);
        const totalTotalFuel = totalModuleFuels.reduce((acc, val) => acc + val, 0);
        console.log(`Part 2: Total fuel required is ${totalTotalFuel}`);
    })
    .catch((err) => {
        // Handle input errors
        console.error('Error reading input.txt file', err);
        process.exit(1);
    });

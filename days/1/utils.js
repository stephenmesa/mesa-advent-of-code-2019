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

module.exports = {
    calculateModuleFuel,
    calculateTotalModuleFuel,
};

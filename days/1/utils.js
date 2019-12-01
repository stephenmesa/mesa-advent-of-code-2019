const calculateModuleFuel = (mass) => {
    return Math.floor(mass / 3) - 2;
};

module.exports = {
    calculateModuleFuel,
};

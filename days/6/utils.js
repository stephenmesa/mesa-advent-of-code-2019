const parseOrbital = (orbital) => {
    const [ left, right ] = orbital.split(')');
    return { left, right };
}

const parseOrbitalMap = (orbitalMap) =>
    orbitalMap.split('\n').map(parseOrbital);

const getPlanetChain = (orbitalLookup) => (startingPlanet) => {
    const planetChain = [startingPlanet];
    let planet = orbitalLookup[startingPlanet];

    while (planet && planet !== 'COM') {
        planetChain.push(planet);
        planet = orbitalLookup[planet];
    }

    return planetChain;
};

const countOrbitalOrbits = (orbitalLookup) => (startingPlanet) =>
    getPlanetChain(orbitalLookup)(startingPlanet).length;

const getOrbitsLookup = (orbitalMap) => {
    const orbitals = parseOrbitalMap(orbitalMap);
    return orbitals.reduce((acc, cur) => { acc[cur.right] = cur.left; return acc; }, {});
}

const calculateMapChecksum = (orbitalMap) => {
    const orbitsLookup = getOrbitsLookup(orbitalMap);

    const countOrbits = countOrbitalOrbits(orbitsLookup);
    const planets = Object.keys(orbitsLookup);
    const orbitalOrbitCounts = planets.map(countOrbits);

    const totalOrbitalCount = orbitalOrbitCounts.reduce((acc, cur) => acc + cur, 0);

    return totalOrbitalCount;
};

const getMinTransferDistance = (chain1, chain2) => {
    const travel = [];
    for (let i = 1; i < chain1.length; i++) {
        const planet = chain1[i];
        travel.push(planet);
        const matchingIndex = chain2.indexOf(planet);
        if (matchingIndex > -1) {
            // We've found our planetary intersection
            travel.push(...chain2.slice(0, matchingIndex));
            return travel.length;
        }
    }
};

const calculateMinOrbitalTransfers = (orbitalMap, fromNode, toNode) => {
    const orbitsLookup = getOrbitsLookup(orbitalMap);

    const getOrbitalPlanetChain = getPlanetChain(orbitsLookup);

    const startingPlanet = orbitsLookup[fromNode];
    const startingPlanetChain = getOrbitalPlanetChain(startingPlanet);

    const endingPlanet = orbitsLookup[toNode];
    const endingPlanetChain = getOrbitalPlanetChain(endingPlanet);

    return getMinTransferDistance(startingPlanetChain, endingPlanetChain);
};

module.exports = {
    calculateMapChecksum,
    calculateMinOrbitalTransfers,
};

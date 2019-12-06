const parseOrbital = (orbital) => {
    const [ left, right ] = orbital.split(')');
    return { left, right };
}

const parseOrbitalMap = (orbitalMap) =>
    orbitalMap.split('\n').map(parseOrbital);

const countOrbitalOrbits = (orbitalLookup) => (orbit) => {
    let planet = orbitalLookup[orbit.right];
    let orbitCount = 0;

    do {
        orbitCount += 1;
        planet = orbitalLookup[planet];
    } while (planet);

    return orbitCount;
};

const calculateMapChecksum = (orbitalMap) => {
    const orbitals = parseOrbitalMap(orbitalMap);
    const orbitsLookup = orbitals.reduce((acc, cur) => { acc[cur.right] = cur.left; return acc; }, {});
    const countOrbits = countOrbitalOrbits(orbitsLookup);
    const orbitalOrbitCounts = orbitals.map(countOrbits);
    const totalOrbitalCount = orbitalOrbitCounts.reduce((acc, cur) => acc + cur, 0);
    return totalOrbitalCount;
};

module.exports = {
    calculateMapChecksum,
};

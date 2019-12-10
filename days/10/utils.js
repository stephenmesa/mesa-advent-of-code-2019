const parseAsteroidMap = (input) => {
    const asteroidMap = {
        asteroids: [],
        coordinateLookup: {},
    };

    const charMap = input.split('\n').map(x => x.split(''));

    for (let y = 0; y < charMap.length; y++) {
        const row = charMap[y];
        for (let x = 0; x < row.length; x++) {
            const coordinate = `${x},${y}`;
            const value = row[x];
            if (value === '#') {
                const asteroid = { x, y };
                asteroidMap.asteroids.push(asteroid);
                asteroidMap.coordinateLookup[coordinate] = asteroid;
            }
        }
    }

    // Calculate line-of-sights
    asteroidMap.asteroids = asteroidMap.asteroids.map(asteroid => {
        asteroidMap.asteroids.forEach((targetAsteroid) => {
            // Don't compare to yourself
            if (targetAsteroid !== asteroid) {
                const xDistance = Math.abs(targetAsteroid.x - asteroid.x);
                const yDistance = Math.abs(targetAsteroid.y - asteroid.y);
                const minX = Math.min(targetAsteroid.x, asteroid.x);
                const minY = Math.min(targetAsteroid.y, asteroid.y);
                const maxX = Math.max(targetAsteroid.x, asteroid.x);
                const maxY = Math.max(targetAsteroid.y, asteroid.y);
                asteroidMap.asteroids.some((middleAsteroid) => {
                    // Don't check for blockers with either of our end asteroids
                    if (middleAsteroid !== asteroid && middleAsteroid !== targetAsteroid) {
                        // Be within the basic rectangle of the end asteroids
                        if (middleAsteroid.y > minY && middleAsteroid.y < maxY && middleAsteroid.x > minX && middleAsteroid.x < maxX) {
                            // 1,0 2,2 3,4

                            // rise = 2, run = 4, rise/run = 2/4 = .5 
                            // y = x/2 + 1
                            // TODO: Calculate slope of line and see if the asteroid falls on the point
                            const x = (yDistance / xDistance) + 
                        }
                    }
                });
            }
        })
    });
};

module.exports = {
    
};

const parseCommands = (inputs) => {
    return inputs.split(',').map(i => {
        const [ m, direction, amount ] = i.match(/(\w)(\d+)/);
        return { direction, amount: Number(amount) };
    });
}

const getNearestIntersectionDistance = (wiresInput) => {
    const [wire1Inputs, wire2Inputs] = wiresInput.split('\n');

    const wire1Commands = parseCommands(wire1Inputs);
    const wire2Commands = parseCommands(wire2Inputs);

    const visitedCoords = {};

    let cursorX = 0;
    let cursorY = 0;

    moveCursorOperationLookup = {
        U: () => cursorY++,
        D: () => cursorY--,
        L: () => cursorX--,
        R: () => cursorX++,
    };

    for(let i = 0; i < wire1Commands.length; i++) {
        const command = wire1Commands[i];
        for(let x = 0; x < command.amount; x++) {
            moveCursorOperationLookup[command.direction]();
            visitedCoords[`${cursorX},${cursorY}`] = { x: cursorX, y: cursorY };
        }
    }

    const intersections = [];

    // Restart coordinated back at 0, 0
    cursorX = 0;
    cursorY = 0;

    for(let i = 0; i < wire2Commands.length; i++) {
        const command = wire2Commands[i];
        for(let x = 0; x < command.amount; x++) {
            moveCursorOperationLookup[command.direction]();
            if (visitedCoords[`${cursorX},${cursorY}`]) {
                intersections.push({ x: cursorX, y: cursorY });
            }
        }
    }

    const distances = intersections.map(c => Math.abs(c.x) + Math.abs(c.y));

    return Math.min(...distances);
};

const getFewestStepsIntersectionSteps = (wiresInput) => {
    const [wire1Inputs, wire2Inputs] = wiresInput.split('\n');

    const wire1Commands = parseCommands(wire1Inputs);
    const wire2Commands = parseCommands(wire2Inputs);

    const visitedCoords = {};

    let cursorX = 0;
    let cursorY = 0;
    let stepCounter = 0;

    moveCursorOperationLookup = {
        U: () => cursorY++,
        D: () => cursorY--,
        L: () => cursorX--,
        R: () => cursorX++,
    };

    for(let i = 0; i < wire1Commands.length; i++) {
        const command = wire1Commands[i];
        for(let x = 0; x < command.amount; x++) {
            moveCursorOperationLookup[command.direction]();
            stepCounter++;
            if (!visitedCoords[`${cursorX},${cursorY}`]) {
                visitedCoords[`${cursorX},${cursorY}`] = { x: cursorX, y: cursorY, steps: stepCounter };
            }
        }
    }

    const intersections = [];

    // Restart coordinated back at 0, 0
    cursorX = 0;
    cursorY = 0;
    stepCounter = 0;

    for(let i = 0; i < wire2Commands.length; i++) {
        const command = wire2Commands[i];
        for(let x = 0; x < command.amount; x++) {
            moveCursorOperationLookup[command.direction]();
            stepCounter++;
            const intersectingCoord = visitedCoords[`${cursorX},${cursorY}`];
            if (intersectingCoord) {
                intersections.push({ steps: intersectingCoord.steps + stepCounter });
            }
        }
    }

    const steps = intersections.map(i => i.steps);
    return Math.min(...steps);
};

module.exports = {
    getNearestIntersectionDistance,
    getFewestStepsIntersectionSteps,
};

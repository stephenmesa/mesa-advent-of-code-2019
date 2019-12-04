const getFirstGroupOfNumbers = (numbers) => {
    const firstGroup = [numbers[0]];
    let cursor = 1;
    while (cursor < numbers.length) {
        const currentNumber = numbers[cursor];
        if (currentNumber === firstGroup[0]) {
            firstGroup.push(currentNumber);
        } else {
            break;
        }
        cursor += 1;
    }

    return firstGroup;
};

const isValidPassword = (password, isPart2Password = false) => {
    const numbers = password.toString().split('').map(Number);

    if (numbers.length !== 6) {
        return false;
    }

    let descendingNeighborDetected = false;
    let duplicateNeighborDetected = false;

    let previousNumberGroup;
    while (numbers.length > 0) {
        const numberGroup = getFirstGroupOfNumbers(numbers);

        if (isPart2Password) {
            if (numberGroup.length === 2) {
                duplicateNeighborDetected = true;
            }
        } else {
            if (numberGroup.length > 1) {
                duplicateNeighborDetected = true;
            }
        }

        if (previousNumberGroup && numberGroup[0] < previousNumberGroup[0]) {
            descendingNeighborDetected = true;
        }

        numbers.splice(0, numberGroup.length);
        previousNumberGroup = numberGroup;
    }

    return duplicateNeighborDetected && !descendingNeighborDetected;
};

const getPasswordSpace = (passwordRange, isPart2Password = false) => {
    const [minString, maxString] = passwordRange.split('-');
    const min = Number(minString);
    const max = Number(maxString);

    let validPasswords = [];

    for (i = min; i <= max; i++) {
        if (isValidPassword(i, isPart2Password)) {
            validPasswords.push(i);
        }
    }

    return validPasswords;
};

module.exports = {
    isValidPassword,
    getPasswordSpace,
};

const {
    isValidPassword,
} = require('./utils');

describe('isValidPassword()', () => {
    const testHelper = (password, isPart2Password, expectedOutput) => {
        expect(isValidPassword(password, isPart2Password)).toEqual(expectedOutput);
    };

    it('Recognizes the correct part1 passwords', () => {
        testHelper(111111, false, true);
    });

    it('Recognizes the incorrect passwords', () => {
        testHelper(223450, false, false);
        testHelper(123789, false, false);
    });

    it('Recognizes part2 passwords', () => {
        testHelper(112233, true, true);
        testHelper(123444, true, false);
        testHelper(111122, true, true);
    });
});

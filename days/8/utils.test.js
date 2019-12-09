const {
    parseImageLayers,
    part1,
    getPixelFromLayer,
    getDerivedPixel,
} = require('./utils');

describe('parseImageLayers()', () => {
    it('parses the correct layers', () => {
        const target = parseImageLayers('123456789012', 3, 2);
        expect(target.length).toEqual(2);
        expect(target[0]).toEqual([1, 2, 3, 4, 5, 6]);
        expect(target[1]).toEqual([7, 8, 9, 0, 1, 2]);
    });
});

describe('part1()', () => {
    it('Returns the correct answer', () => {
        const target = part1('123156789012', 3, 2);
        expect(target).toEqual(2);
    });
    it('Returns the correct answer again', () => {
        const target = part1('789012123156', 3, 2);
        expect(target).toEqual(2);
    });
});

describe('getPixelFromLayer()', () => {
    /*
        012
        345
        678
        901
    */
    const testLayer = [0,1,2,3,4,5,6,7,8,9,0,1];
    it('Returns the correct answer', () => {
        expect(getPixelFromLayer(testLayer, 0, 0, 3)).toEqual(0);
        expect(getPixelFromLayer(testLayer, 2, 0, 3)).toEqual(2);
        expect(getPixelFromLayer(testLayer, 0, 2, 3)).toEqual(6);
        expect(getPixelFromLayer(testLayer, 2, 2, 3)).toEqual(8);
        expect(getPixelFromLayer(testLayer, 2, 3, 3)).toEqual(1);
    });
});

describe('getDerivedPixel()', () => {
    const testLayers = [
        [0,2,2,2],
        [1,1,2,2],
        [2,2,1,2],
        [0,0,0,0],
    ];
    it('Returns the correct answer', () => {
        expect(getDerivedPixel(testLayers, 0, 0, 2, 2)).toEqual(0);
        expect(getDerivedPixel(testLayers, 1, 0, 2, 2)).toEqual(1);
        expect(getDerivedPixel(testLayers, 0, 1, 2, 2)).toEqual(1);
        expect(getDerivedPixel(testLayers, 1, 1, 2, 2)).toEqual(0);
    });
});

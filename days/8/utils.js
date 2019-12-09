const parseImageLayers = (imageData, width, height) => {
    const pixels = imageData.split('').map(Number);
    const layerSize = width * height;
    const layers = [];
    while (pixels.length > 0) {
        layers.push(pixels.splice(0, layerSize));
    }
    return layers;
};

const part1 = (imageData, width, height) => {
    const layers = parseImageLayers(imageData, width, height)
        .map(l => ({
            pixels: l,
            counts: {
                0: l.filter(p => p === 0).length,
                1: l.filter(p => p === 1).length,
                2: l.filter(p => p === 2).length,
                3: l.filter(p => p === 3).length,
                4: l.filter(p => p === 4).length,
                5: l.filter(p => p === 5).length,
                6: l.filter(p => p === 6).length,
                7: l.filter(p => p === 7).length,
                8: l.filter(p => p === 8).length,
                9: l.filter(p => p === 9).length,
            }
        }));
    layers.sort((a, b) => {
        if (a.counts[0] > b.counts[0]) {
            return 1;
        }

        if (a.counts[0] < b.counts[0]) {
            return -1;
        }

        if (a.counts[0] === b.counts[0]) {
            return 0;
        }
    });
    const fewest0DigitsLayer = layers[0];
    return fewest0DigitsLayer.counts[1] * fewest0DigitsLayer.counts[2];
};

const getPixelFromLayer = (layer, x, y, width) => {
    return layer[(y * width) + x];
};

const getDerivedPixel = (layers, x, y, width, height) => {
    for (let i = 0; i < layers.length; i++) {
        const layer = layers[i];
        const pixel = getPixelFromLayer(layer, x, y, width, height);

        switch (pixel) {
            case 0:
                // Black
                return 0;
                break;
            case 1:
                // White
                return 1;
                break;
            case 2:
                // Transparent, do nothing
                break;
            default:
                throw new Error(`Invalid pixel detected: ${pixel}`);
                break;
        }
    }

    // Default to transparent?
    return 2;
};

const part2 = (imageData, width, height) => {
    const layers = parseImageLayers(imageData, width, height);

    for(let y = 0; y < height; y++) {
        let rasteredRow = '';
        for (let x = 0; x < width; x++) {
            const pixel = getDerivedPixel(layers, x, y, width, height);
            switch (pixel) {
                case 0:
                    rasteredRow += '■';
                    break;
                case 1:
                    rasteredRow += '□';
                    break;
                case 2:
                    rasteredRow += ' ';
                    break;
                default:
                    break;
            }
        }
        console.log(rasteredRow);
    }
};

module.exports = {
    parseImageLayers,
    getPixelFromLayer,
    getDerivedPixel,
    part1,
    part2,
};

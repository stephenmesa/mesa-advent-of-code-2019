const fs = require('fs');

fs.readFile('input.txt', "utf8", (err, data) => {
    if (err) {
        console.error('Error reading input.txt file', err);
        process.exit(1);
    }
    const inputValues = data.split('\n').filter(d => d && d.length > 0);
    console.log({ inputValues });
});

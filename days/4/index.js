const {
    getPasswordSpace,
} = require('./utils');

console.log('Part 1:', getPasswordSpace('236491-713787', false).length);
console.log('Part 2:', getPasswordSpace('236491-713787', true).length);

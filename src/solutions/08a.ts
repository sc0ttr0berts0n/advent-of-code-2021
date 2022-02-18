import InputParser from '../utils/input-parser';

// const parser = new InputParser('04');
const parser = new InputParser('08');
const output = parser.toArray();

// to get the digits
const digits =
    // then, grab the length of such an array
    output
        // we grab the second part of the output line after the pipe
        .map((line) => line.split(' | ')[1])
        // and chunk it into each token
        .map((chunk) => {
            return chunk.split(' ');
        })
        // at this point, the array is 2d, flatten it to a simple list
        .flat()
        // only keep digits of the target lengths
        .filter((digit) => {
            const len = digit.length;
            return len === 7 || len === 4 || len === 3 || len === 2;
        }).length;

debugger;

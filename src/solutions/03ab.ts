import InputParser from '../utils/input-parser';

const parser = new InputParser('03');
const report = parser.toArray();

// takes a number, converts to binary, flips all the fits
const invertBinary = (num: number) => {
    var binaryString = num.toString(2);
    var strlen = binaryString.length;
    var mask = Math.pow(2, strlen) - 1; // calculate mask
    return ~num & mask;
};

// gets a vertical slice of an array at a specified index
const getVerticalSlice = (arr: string[], charIndex: number) => {
    return arr.map((line) => line.charAt(charIndex));
};

const getMajorityCharacter = (
    _arr: string[],
    reverse = false,
    tieBreaker = false
): string | boolean => {
    // this halfway point character when sorted is the majority
    const arr = !reverse ? _arr.sort() : _arr.sort().reverse();
    const index = Math.floor(arr.length / 2);
    const isEvenLength = arr.length % 2 === 0;
    const noMajority = isEvenLength && arr[index] !== arr[index - 1];
    return noMajority && tieBreaker ? false : arr[index];
};

// get most common bit of each vertical slice
const gammaString = report[0]
    .split('')
    .map((el, index) => {
        // get the vertical slice as an array
        const vSlice = getVerticalSlice(report, index);

        // grab the majority character out of the array and return it.
        return getMajorityCharacter(vSlice);
    })
    .join('');

const performBitReduction = (report: string[], keepMajority: boolean) => {
    let arr = [...report];
    const lineBitLength = arr[0].length;
    for (let i = 0; arr.length >= 1 || i < lineBitLength; i++) {
        if (arr.length === 1) break;
        const vSlice = getVerticalSlice(arr, i);
        const tieBreaker = keepMajority ? '1' : '0';
        const majorChar = getMajorityCharacter(vSlice, keepMajority, true);
        arr = arr.filter((el) => {
            const char = el.charAt(i);
            if (majorChar) {
                const isMajor = char === majorChar;
                return keepMajority ? isMajor : !isMajor;
            }
            return char === tieBreaker;
        });
    }
    return arr[0];
};

const gamma = parseInt(gammaString, 2);
const epsilon = invertBinary(gamma);
const oxygen = parseInt(performBitReduction(report, true), 2);
const scrubber = parseInt(performBitReduction(report, false), 2);

const powerConsumption = gamma * epsilon;
const lifeSupportRating = oxygen * scrubber;

console.log({
    gamma,
    epsilon,
    oxygen,
    scrubber,
});
console.log({
    powerConsumption,
    lifeSupportRating,
});

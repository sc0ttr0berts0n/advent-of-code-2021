import InputParser from '../utils/input-parser';

const parser = new InputParser('01');
const depths = parser.toArray().map((str) => parseInt(str));

console.log(depths);

const elevationGains = depths.map((depth: number, index: number) => {
    if (index === 0) return false;
    const curr = depth;
    const prev = depths[index - 1];
    return curr > prev;
});

const gainsOnly = elevationGains.filter((el) => el);

console.log(gainsOnly.length);

debugger;

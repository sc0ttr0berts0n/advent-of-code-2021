import InputParser from '../utils/input-parser';

const parser = new InputParser('01');
const depths = parser.toArray().map((str) => parseInt(str));

const elevationGains = depths.map((depth: number, index: number) => {
    if (index < 3) return false;

    const back3 = depths[index - 3];
    const back2 = depths[index - 2];
    const back1 = depths[index - 1];
    const back0 = depths[index - 0];

    const windowCurr = back2 + back1 + back0;
    const windowPrev = back3 + back2 + back1;

    return windowCurr > windowPrev;
});

const gainsOnly = elevationGains.filter((el) => el);

console.log(gainsOnly.length);

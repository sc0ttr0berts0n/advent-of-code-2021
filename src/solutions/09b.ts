import InputParser from '../utils/input-parser';

// const parser = new InputParser('04');
const parser = new InputParser('09-test');
const raw = parser.toArray();
const size = raw[0].length;
const heightMap = raw
    .map((el) => {
        return el.split('').map(Number);
    })
    .flat();

const areNeighborsUphill = (x: number, y: number) => {
    const up = lines?.[y - 1]?.[x] ?? Infinity;
    const down = lines?.[y + 1]?.[x] ?? Infinity;
    const left = lines?.[y]?.[x - 1] ?? Infinity;
    const right = lines?.[y]?.[x + 1] ?? Infinity;

    return {
        up: up > num,
        down: down > num,
        left: left > num,
        right: right > num,
    };
};

// const riskLevelSum = heightMap
//     .map((line, y, lines) => {
//         return line.filter(
//     })
//     .flat()
//     .map((el) => el + 1)
//     .reduce((a, b) => a + b, 0);

debugger;

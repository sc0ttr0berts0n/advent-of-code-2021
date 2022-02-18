import InputParser from '../utils/input-parser';

// const parser = new InputParser('04');
const parser = new InputParser('09');
const heightMap = parser.toArray().map((el) => {
    return el.split('').map(Number);
});

const riskLevelSum = heightMap
    .map((line, y, lines) => {
        return line.filter((num, x, arr) => {
            const up = lines?.[y - 1]?.[x] ?? Infinity;
            const down = lines?.[y + 1]?.[x] ?? Infinity;
            const left = lines?.[y]?.[x - 1] ?? Infinity;
            const right = lines?.[y]?.[x + 1] ?? Infinity;

            return up > num && down > num && left > num && right > num;
        });
    })
    .flat()
    .map((el) => el + 1)
    .reduce((a, b) => a + b, 0);

debugger;

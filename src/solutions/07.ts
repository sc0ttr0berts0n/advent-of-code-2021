import InputParser from '../utils/input-parser';

// const parser = new InputParser('04');
const parser = new InputParser('07', { separator: ',' });
const crabPos = parser.toArray().map(Number);

const minX = Math.min(...crabPos);
const maxX = Math.max(...crabPos);

const linearFuel = (dist: number, index: number) => {
    return crabPos.reduce((acc, crab) => {
        const dist = Math.abs(crab - index);
        return acc + dist;
    }, 0);
};

const bigFuel = (dist: number, index: number) => {
    return crabPos.reduce((acc, crab) => {
        const dist = Math.abs(crab - index);
        const fuel = (dist * (dist - 1)) / 2 + dist;
        return acc + fuel;
    }, 0);
};

const fuelAtDistances = new Array(maxX - minX + 1).fill(0).map(linearFuel);
const fuelAtDistancesBig = new Array(maxX - minX + 1).fill(0).map(bigFuel);

const result = Math.min(...fuelAtDistancesBig);

console.log(result);

debugger;

import InputParser from '../utils/input-parser';

// const parser = new InputParser('04');
const parser = new InputParser('10');
const lines = parser.toArray();

const validateLine = (line: string): string => {
    const len = line.length;
    const curly = '{}';
    const square = '[]';
    const parenthesis = '()';
    const angles = '<>';

    line = line.split(curly).join('');
    line = line.split(square).join('');
    line = line.split(parenthesis).join('');
    line = line.split(angles).join('');

    if (line.length === len) {
        const match = line.match(/[\}\]\)\>]/);
        return match?.[0];
    }
    return validateLine(line);
};

const results = lines
    .map((el) => {
        const val = validateLine(el);
        return val;
    })
    .filter((el) => el !== undefined)
    .reduce((acc, el): number => {
        const map = new Map();

        map.set(')', 3);
        map.set(']', 57);
        map.set('}', 1197);
        map.set('>', 25137);

        return acc + map.get(el);
    }, 0);

debugger;

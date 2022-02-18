import InputParser from '../utils/input-parser';

// const parser = new InputParser('04');
const parser = new InputParser('08');
const reports = parser.toArray();

// this function returns the input strings, and the mutual letters
// between the two strings as the "results" key
const mutualLetters = (a: string, b: string) => {
    const results = a.split('').filter((char) => b.split('').includes(char));
    return { a, b, results };
};

// convert each line into the four digit output it portrays
const outputs = reports.map((report) => {
    // capture the 10 digit signal and the 4 digit output
    // from the report line
    const [signal, output] = report.split(' | ');

    // split the signal, and arrange by char length
    // this puts them in this order: 1, 7, 4, (2|3|5), (0|6|9), 8
    const orderedSignal = signal
        .split(' ')
        .sort((a: string, b: string) => {
            return a.length - b.length;
        })
        .map((el) => {
            return el.split('').sort().join('');
        });

    // pluck each set into a var off the array
    // $ means is a single digits (helps me read it)
    const $one = orderedSignal.shift();
    const $seven = orderedSignal.shift();
    const $four = orderedSignal.shift();
    const twoOrThreeOrFive = orderedSignal.splice(0, 3);
    const zeroOrSixOrNine = orderedSignal.splice(0, 3);
    const $eight = orderedSignal.shift();

    // for each of the following, I use the above "mutualLetters"
    // function to deduce which digit is found. find if a single
    // digit, filter if the digits are still plural.
    const $three = twoOrThreeOrFive.find((el) => {
        const comp = mutualLetters(el, $one);
        return comp.results.length === 2;
    });

    const twoOrFive = twoOrThreeOrFive.filter((el) => {
        const comp = mutualLetters(el, $one);
        return comp.results.length === 1;
    });

    const $six = zeroOrSixOrNine.find((el) => {
        const comp = mutualLetters(el, $one);
        return comp.results.length === 1;
    });

    const zeroOrNine = zeroOrSixOrNine.filter((el) => {
        const comp = mutualLetters(el, $one);
        return comp.results.length === 2;
    });

    const $five = twoOrFive.find((el) => {
        const comp = mutualLetters(el, $six);
        return comp.results.length === 5;
    });

    const $two = twoOrFive.find((el) => {
        const comp = mutualLetters(el, $six);
        return comp.results.length === 4;
    });

    const $nine = zeroOrNine.find((el) => {
        const comp = mutualLetters(el, $four);
        return comp.results.length === 4;
    });

    const $zero = zeroOrNine.find((el) => {
        const comp = mutualLetters(el, $four);
        return comp.results.length === 3;
    });

    // with all of the digits solved, its time to prep
    // the results to figure out which digits they are.
    // this array puts them in order
    const orderedDigits = [
        $zero,
        $one,
        $two,
        $three,
        $four,
        $five,
        $six,
        $seven,
        $eight,
        $nine,
    ];

    // now to prep and return the output
    return (
        output
            // the output is four char strings split by spaces
            .split(' ')
            // this function alphabetizes the chars in the strings
            .map((el) => {
                return el.split('').sort().join('');
            })
            // now they should match our $one $two etc in the ordered
            // digits array, in this array the vars values match their index
            .map((el) => {
                return orderedDigits.indexOf(el);
            })
            // join the four length number array into a single four digit number
            .join('')
    );
});

// sum up the results
const result = outputs.map(Number).reduce((a, b) => a + b, 0);

console.log(result);

debugger;

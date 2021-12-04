import InputParser from '../utils/input-parser';

// const parser = new InputParser('04');
const parser = new InputParser('04-test');
const bingoData = parser.toArray();

interface IBoardCell {
    num: number;
    x: number;
    y: number;
    marked: boolean;
}

class BingoGame {
    public numbers: number[];
    private boardNumbers: number[][];
    public boards: IBoardCell[][];
    public boardSize = { x: 0, y: 0 };

    constructor(bingoData: string[]) {
        this.parseRawInput(bingoData);
        this.initBoards(this.boardNumbers);
    }

    parseRawInput(bingoData: string[]) {
        this.numbers = bingoData
            .splice(0, 1)[0]
            .split(',')
            .map((el) => parseInt(el));
        this.boardNumbers = bingoData.map((el, index, arr) => {
            const _lineToNumberArr = (line: string) => {
                return arr[1]
                    .trim()
                    .split(/\s{1,}/)
                    .map((el) => parseInt(el));
            };
            const l1 = _lineToNumberArr(arr[1]);
            const l2 = _lineToNumberArr(arr[1]);
            const l3 = _lineToNumberArr(arr[3]);
            const l4 = _lineToNumberArr(arr[4]);
            const l5 = _lineToNumberArr(arr[5]);
            arr.splice(0, 6);
            return [...l1, ...l2, ...l3, ...l4, ...l5];
        });
        this.boardSize = {
            x: Math.sqrt(this.boardNumbers[0].length),
            y: Math.sqrt(this.boardNumbers[0].length),
        };
    }

    initBoards(board: number[]) {
        this.boards = this.boardNumbers.map((numbers) => {
            return numbers.map((num, index) => {
                return {
                    num,
                    x: index % this.boardSize.x,
                    y: Math.floor(index / this.boardSize.y),
                    marked: false,
                };
            });
        });
    }
}

const bingoGame = new BingoGame(bingoData);

console.log(bingoGame.numbers, bingoGame.boards, bingoGame.boardSize);

debugger;

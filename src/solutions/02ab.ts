import InputParser from '../utils/input-parser';

enum Direction {
    FORWARD,
    DOWN,
    UP,
    UNKNOWN,
}

interface IMove {
    direction: Direction;
    distance: number;
}

interface Vector2 {
    x: number;
    y: number;
}

const parser = new InputParser('02');
const movements = parser.toArray();

class Submarine {
    public pos: Vector2 = { x: 0, y: 0 };
    public aim = 0;
    private moves: IMove[];

    constructor(rawMovements: string[]) {
        this.moves = rawMovements.map(this.processMove);
    }

    processMove(movement: string): IMove {
        const [directionString, distance] = movement.split(' ');
        const _getDirection = (dir: string) => {
            if (dir === 'forward') return Direction.FORWARD;
            if (dir === 'down') return Direction.DOWN;
            if (dir === 'up') return Direction.UP;
            // throw Error(`Direction Unknown: ${movement}`);
        };
        return {
            direction: _getDirection(directionString),
            distance: parseInt(distance),
        };
    }

    moveSub(move: IMove, useAim = false) {
        if (move.direction === Direction.FORWARD) {
            this.pos.x += move.distance;
            this.pos.y += move.distance * this.aim;
            return;
        }
        if (move.direction === Direction.DOWN) {
            if (useAim) return (this.aim += move.distance);
            return (this.pos.y += move.distance);
        }
        if (move.direction === Direction.UP) {
            if (useAim) return (this.aim += -move.distance);
            return (this.pos.y += -move.distance);
        }
    }

    travel(useAim = false) {
        this.moves.forEach((move) => this.moveSub(move, useAim));
    }
}

const sub = new Submarine(movements);
sub.travel(true);
console.log(sub.pos.x * sub.pos.y);

import {movesAllowedBySnake, movesAllowedByWalls} from '../../src/moves';
import {createBattlesnake} from '../utils';

describe('movesAllowedBySnake function', () => {
    it('Should prevent from moving on itself', () => {
        const me = createBattlesnake('me', [
            {x: 1, y: 1},
            {x: 1, y: 2},
            {x: 0, y: 2},
            {x: 0, y: 1},
            {x: 0, y: 0}
        ]);

        const possibleMoves = movesAllowedBySnake(me, me);
        expect(possibleMoves).toMatchObject({up: false, down: true, right: true, left: false});
    });
    it('Should prevent from moving right on another snake', () => {
        const me = createBattlesnake('me', [
            {x: 3, y: 4},
            {x: 2, y: 4},
            {x: 1, y: 4}
        ]);
        const other = createBattlesnake('me', [
            {x: 4, y: 3},
            {x: 4, y: 4},
            {x: 4, y: 5}
        ]);

        const possibleMoves = movesAllowedBySnake(me, other);
        expect(possibleMoves).toMatchObject({up: true, down: true, right: false, left: true});
    });
    it('Should prevent from moving left on another snake', () => {
        const me = createBattlesnake('me', [
            {x: 1, y: 4},
            {x: 2, y: 4},
            {x: 3, y: 4}
        ]);
        const other = createBattlesnake('other', [
            {x: 0, y: 3},
            {x: 0, y: 4},
            {x: 0, y: 5}
        ]);

        const possibleMoves = movesAllowedBySnake(me, other);
        expect(possibleMoves).toMatchObject({up: true, down: true, right: true, left: false});
    });
    it('Should prevent from moving up on another snake', () => {
        const me = createBattlesnake('me', [
            {x: 3, y: 4},
            {x: 2, y: 4},
            {x: 1, y: 4}
        ]);
        const other = createBattlesnake('other', [
            {x: 3, y: 5},
            {x: 2, y: 5},
            {x: 1, y: 5}
        ]);

        const possibleMoves = movesAllowedBySnake(me, other);
        expect(possibleMoves).toMatchObject({up: false, down: true, right: true, left: true});
    });
    it('Should prevent from moving down on another snake', () => {
        const me = createBattlesnake('me', [
            {x: 3, y: 4},
            {x: 2, y: 4},
            {x: 1, y: 4}
        ]);
        const other = createBattlesnake('other', [
            {x: 3, y: 3},
            {x: 2, y: 3},
            {x: 1, y: 3}
        ]);

        const possibleMoves = movesAllowedBySnake(me, other);
        expect(possibleMoves).toMatchObject({up: true, down: false, right: true, left: true});
    });
});

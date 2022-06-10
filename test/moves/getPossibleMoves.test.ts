import {getPossibleMoves} from '../../src/moves';
import {createBattlesnake, createGameState} from '../utils';

describe('getPossibleMoves function', () => {
    it('Should not do dumb stuff (temporary test)', () => {
        const me = createBattlesnake('me', [
            {x: 2, y: 18},
            {x: 1, y: 18},
            {x: 1, y: 17}
        ]);
        const gameState = createGameState({me, dimensions: {w: 19, h: 19}});
        const possibleMoves = getPossibleMoves(gameState);
        expect(possibleMoves).toMatchObject({
            up: false,
            down: true,
            right: true,
            left: false
        });
    });
    it('Should not do dumb stuff 2 (temporary test)', () => {
        const me = createBattlesnake('me', [
            {x: 2, y: 17},
            {x: 2, y: 18},
            {x: 1, y: 18}
        ]);
        const gameState = createGameState({me, dimensions: {w: 19, h: 19}});
        const possibleMoves = getPossibleMoves(gameState);
        expect(possibleMoves).toMatchObject({
            up: false,
            down: true,
            right: true,
            left: true
        });
    });
});

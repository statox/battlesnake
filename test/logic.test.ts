import {info, move} from '../src/logic';
import {Battlesnake, Coord, GameState, MoveResponse} from '../src/types';
import {createBattlesnake, createGameState} from './utils';

describe('Battlesnake API Version', () => {
    it('should be api version 1', () => {
        const result = info();
        expect(result.apiversion).toBe('1');
    });
});

describe('Battlesnake Moves', () => {
    it('should never move into its own neck', () => {
        // Arrange
        const me = createBattlesnake('me', [
            {x: 2, y: 0},
            {x: 1, y: 0},
            {x: 0, y: 0}
        ]);
        const gameState = createGameState({me});

        // Act 1,000x (this isn't a great way to test, but it's okay for starting out)
        for (let i = 0; i < 1000; i++) {
            const moveResponse: MoveResponse = move(gameState);
            // In this state, we should NEVER move left.
            const allowedMoves = ['up', 'down', 'right'];
            expect(allowedMoves).toContain(moveResponse.move);
        }
    });
});

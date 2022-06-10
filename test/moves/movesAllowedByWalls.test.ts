import {movesAllowedByWalls} from '../../src/moves';
import {createBattlesnake, createGameState} from '../utils';

describe('movesAllowedByWalls function', () => {
    it('Should allow every moves from the middle', () => {
        const me = createBattlesnake('me', [{x: 5, y: 5}]);
        const gameState = createGameState({me, dimensions: {w: 10, h: 10}});

        const possibleMoves = movesAllowedByWalls(gameState);
        expect(possibleMoves).toMatchObject({up: true, down: true, right: true, left: true});
    });
    it('Should check for right border', () => {
        const me = createBattlesnake('me', [{x: 9, y: 5}]);
        const gameState = createGameState({me, dimensions: {w: 10, h: 10}});

        const possibleMoves = movesAllowedByWalls(gameState);
        expect(possibleMoves).toMatchObject({up: true, down: true, right: false, left: true});
    });
    it('Should check for left border', () => {
        const me = createBattlesnake('me', [{x: 0, y: 5}]);
        const gameState = createGameState({me, dimensions: {w: 10, h: 10}});

        const possibleMoves = movesAllowedByWalls(gameState);
        expect(possibleMoves).toMatchObject({up: true, down: true, right: true, left: false});
    });
    it('Should check for bottom border', () => {
        const me = createBattlesnake('me', [{x: 5, y: 0}]);
        const gameState = createGameState({me, dimensions: {w: 10, h: 10}});

        const possibleMoves = movesAllowedByWalls(gameState);
        expect(possibleMoves).toMatchObject({up: true, down: false, right: true, left: true});
    });
    it('Should check for up border', () => {
        const me = createBattlesnake('me', [{x: 5, y: 9}]);
        const gameState = createGameState({me, dimensions: {w: 10, h: 10}});

        const possibleMoves = movesAllowedByWalls(gameState);
        expect(possibleMoves).toMatchObject({up: false, down: true, right: true, left: true});
    });
    it('Should check for corners', () => {
        const me = createBattlesnake('me', [{x: 0, y: 0}]);
        const gameState = createGameState({me, dimensions: {w: 10, h: 10}});

        const possibleMoves = movesAllowedByWalls(gameState);
        expect(possibleMoves).toMatchObject({up: true, down: false, right: true, left: false});
    });
});

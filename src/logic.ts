import {movesAllowedBySnake, movesAllowedByWalls, filterPossibleMoves} from './moves';
import {InfoResponse, GameState, MoveResponse, Game, Coord, PossibleMoves, Move} from './types';

export function info(): InfoResponse {
    console.log('INFO');
    const response: InfoResponse = {
        apiversion: '1',
        author: '',
        color: '#a7efb1',
        head: 'default',
        tail: 'default'
    };
    return response;
}

export function start(gameState: GameState): void {
    console.log(`${gameState.game.id} START for snake ${gameState.you.id}`);
}

export function end(gameState: GameState): void {
    console.log(`${gameState.game.id} END\n`);
}

export function move(gameState: GameState): MoveResponse {
    // Don't hit walls.
    const allowedByWalls = movesAllowedByWalls(gameState);

    // Don't hit yourself or another snake.
    const allowedBySnakes = gameState.board.snakes.map((snake) => movesAllowedBySnake(gameState.you, snake));

    // TODO: Find food.

    // Finally, choose a move from the available safe moves.
    const possibleMoves = filterPossibleMoves([allowedByWalls, ...allowedBySnakes]);
    const safeMoves = Object.keys(possibleMoves).filter((key) => possibleMoves[key]);
    const response: MoveResponse = {
        move: safeMoves[Math.floor(Math.random() * safeMoves.length)]
    };

    console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`);
    return response;
}

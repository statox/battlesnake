import {selectBestMove} from './ai';
import {movesAllowedBySnake, movesAllowedByWalls, filterPossibleMoves, getPossibleMoves} from './moves';
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
    const move = selectBestMove(gameState);
    const response: MoveResponse = {move};

    console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`);
    return response;
}

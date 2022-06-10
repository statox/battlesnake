import {Battlesnake, Coord, GameState} from '../src/types';

export function createBattlesnake(id: string, body: Coord[]): Battlesnake {
    return {
        id: id,
        name: id,
        health: 0,
        body: body,
        latency: '',
        head: body[0],
        length: body.length,
        shout: '',
        squad: '',
        customizations: {
            color: '#c306c3',
            head: 'default',
            tail: 'default'
        }
    };
}

export function createGameState(params: {
    me: Battlesnake;
    otherSnake?: Battlesnake;
    dimensions?: {w: number; h: number};
}): GameState {
    const {me, otherSnake} = params;
    const snakes = [me];
    if (otherSnake) {
        snakes.push(otherSnake);
    }
    return {
        game: {
            id: '',
            source: '',
            ruleset: {
                name: '',
                version: '',
                settings: {
                    foodSpawnChance: 0,
                    minimumFood: 0,
                    hazardDamagePerTurn: 0,
                    hazardMap: '',
                    hazardMapAuthor: '',
                    royale: {shrinkEveryNTurns: 0},
                    squad: {
                        allowBodyCollisions: false,
                        sharedElimination: false,
                        sharedLength: false,
                        sharedHealth: false
                    }
                }
            },
            timeout: 0
        },
        turn: 0,
        board: {
            height: params?.dimensions?.h || 0,
            width: params?.dimensions?.w || 0,
            food: [],
            snakes,
            hazards: []
        },
        you: me
    };
}

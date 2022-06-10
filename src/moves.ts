import {Battlesnake, GameState, Coord, PossibleMoves} from './types';

export function movesAllowedByWalls(gameState: GameState): PossibleMoves {
    let possibleMoves = {
        up: true,
        down: true,
        left: true,
        right: true
    };

    const boardWidth = gameState.board.width;
    const boardHeight = gameState.board.height;
    const myHead = gameState.you.head;

    if (myHead.x >= boardWidth - 1) {
        possibleMoves.right = false;
    } else if (myHead.x <= 1) {
        possibleMoves.left = false;
    }
    if (myHead.y >= boardHeight - 1) {
        possibleMoves.up = false;
    } else if (myHead.y <= 1) {
        possibleMoves.down = false;
    }

    return possibleMoves;
}

export function movesAllowedBySnake(me: Battlesnake, other: Battlesnake) {
    let possibleMoves: {[key: string]: boolean} = {
        up: true,
        down: true,
        left: true,
        right: true
    };

    const myHead = me.head;
    for (const bodyPart of other.body) {
        if (bodyPart.x === myHead.x - 1 && bodyPart.y === myHead.y) {
            possibleMoves.left = false;
        } else if (bodyPart.x === myHead.x + 1 && bodyPart.y === myHead.y) {
            possibleMoves.right = false;
        } else if (bodyPart.x === myHead.x && bodyPart.y === myHead.y - 1) {
            possibleMoves.down = false;
        } else if (bodyPart.x === myHead.x && bodyPart.y === myHead.y + 1) {
            possibleMoves.up = false;
        }
    }

    return possibleMoves;
}

export const distance = (a: Coord, b: Coord) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);

export function findClosestFood(reference: Coord, food: Coord[]) {
    if (!food || !food.length) {
        return null;
    }

    const closestFood = food.reduce((closest, f) => {
        const d = distance(reference, f);
        if (d < distance(reference, closest)) {
            return f;
        }
        return closest;
    }, food[0]);

    return closestFood;
}

export function filterPossibleMoves(moves: PossibleMoves[]) {
    return moves.reduce(
        (result, current) => {
            return {
                up: result.up && current.up,
                down: result.down && current.down,
                right: result.right && current.right,
                left: result.left && current.left
            };
        },
        {up: true, down: true, right: true, left: true}
    );
}

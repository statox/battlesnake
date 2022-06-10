import {InfoResponse, GameState, MoveResponse, Game, Coord} from './types';

export function info(): InfoResponse {
    console.log('INFO');
    const response: InfoResponse = {
        apiversion: '1',
        author: '',
        color: '#bc7554',
        head: 'default',
        tail: 'default'
    };
    return response;
}

const distance = (a: Coord, b: Coord) => Math.sqrt((b.x - a.x) ** 2 + (b.y - a.y) ** 2);

export function start(gameState: GameState): void {
    console.log(`${gameState.game.id} START for snake ${gameState.you.id}`);
}

export function end(gameState: GameState): void {
    console.log(`${gameState.game.id} END\n`);
}

export function move(gameState: GameState): MoveResponse {
    let possibleMoves: {[key: string]: boolean} = {
        up: true,
        down: true,
        left: true,
        right: true
    };

    // Step 0: Don't let your Battlesnake move back on it's own neck
    const myHead = gameState.you.head;
    const myNeck = gameState.you.body[1];
    if (myNeck.x < myHead.x) {
        possibleMoves.left = false;
    } else if (myNeck.x > myHead.x) {
        possibleMoves.right = false;
    } else if (myNeck.y < myHead.y) {
        possibleMoves.down = false;
    } else if (myNeck.y > myHead.y) {
        possibleMoves.up = false;
    }

    // TODO: Step 1 - Don't hit walls.
    // Use information in gameState to prevent your Battlesnake from moving beyond the boundaries of the board.
    const boardWidth = gameState.board.width;
    const boardHeight = gameState.board.height;

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

    // TODO: Step 2 - Don't hit yourself.
    // Use information in gameState to prevent your Battlesnake from colliding with itself.
    /*
    for (const bodyPart of gameState.you.body) {
      if (bodyPart.x === myHead.x-1 && bodyPart.y === myHead.y) {
        possibleMoves.left=false;
      } else if (bodyPart.x === myHead.x+1 && bodyPart.y === myHead.y) {
        possibleMoves.right = false;
      } else if (bodyPart.x === myHead.x && bodyPart.y === myHead.y - 1) {
        possibleMoves.down = false;
      } else if (bodyPart.x === myHead.x && bodyPart.y === myHead.y + 1) {
        possibleMoves.up = false;
      }
    }
    */

    // TODO: Step 3 - Don't collide with others.
    // Use information in gameState to prevent your Battlesnake from colliding with others.
    for (const other of gameState.board.snakes) {
        //console.log(gameState.you.id, 'avoiding snake', other.id)
        for (const bodyPart of other.body) {
            if (bodyPart.x === myHead.x - 1 && bodyPart.y === myHead.y) {
                //console.log('cant go left');
                possibleMoves.left = false;
            } else if (bodyPart.x === myHead.x + 1 && bodyPart.y === myHead.y) {
                possibleMoves.right = false;
                //console.log('cant go right');
            } else if (bodyPart.x === myHead.x && bodyPart.y === myHead.y - 1) {
                possibleMoves.down = false;
                //console.log('cant go down');
            } else if (bodyPart.x === myHead.x && bodyPart.y === myHead.y + 1) {
                possibleMoves.up = false;
                //console.log('cant go up');
            }
        }
    }

    // TODO: Step 4 - Find food.
    // Use information in gameState to seek out and find food.
    const closestFood = gameState.board.food.reduce(
        (closest: Coord, f: Coord) => {
            const d = distance(f, myHead);
            if (closest.x === -1) {
                return f;
            }
            if (d < distance(closest, myHead)) {
                return f;
            }
            return closest;
        },
        {x: -1, y: -1}
    );
    console.log({closestFood, myHead});

    // Finally, choose a move from the available safe moves.
    // TODO: Step 5 - Select a move to make based on strategy, rather than random.
    const safeMoves = Object.keys(possibleMoves).filter((key) => possibleMoves[key]);
    const response: MoveResponse = {
        move: safeMoves[Math.floor(Math.random() * safeMoves.length)]
    };

    console.log(`${gameState.game.id} MOVE ${gameState.turn}: ${response.move}`, {
        myHead,
        board: {w: boardWidth, h: boardHeight}
    });
    return response;
}

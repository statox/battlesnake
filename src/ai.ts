import {distance, findClosestFood, getDestination, getPossibleMoves} from './moves';
import {Coord, Battlesnake, PossibleMoves, GameState} from './types';

export function selectBestMove(gameState: GameState) {
    const {food} = gameState.board;
    const me = gameState.you;

    const possibleMoves = getPossibleMoves(gameState);
    const closestFood = findClosestFood(me.head, food);
    const safeMoves = Object.keys(possibleMoves).filter((key) => possibleMoves[key]);

    console.log({me: {head: me.head, body: JSON.stringify(me.body)}});
    // console.log({possibleMoves});
    console.log({safeMoves});
    console.log({closestFood});

    // Without food move randomly
    if (!closestFood) {
        const move = safeMoves[Math.floor(Math.random() * safeMoves.length)];
        console.log('no food moving randomly');
        return move;
    }

    // With food move closer to the food
    const orderedMoves = Object.keys(possibleMoves)
        .filter((key) => possibleMoves[key])
        .map((key) => {
            const destination = getDestination(me.head, key);
            const d = distance(destination, closestFood);
            return {move: key, destination, d};
        })
        .sort((a, b) => a.d - b.d);

    console.log('food, moving from orderedMoves');
    orderedMoves.forEach((m) => console.log(JSON.stringify(m)));
    return orderedMoves[0].move;
}

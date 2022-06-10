import {findClosestFood} from '../../src/moves';
import {Coord} from '../../src/types';
import {createBattlesnake} from '../utils';

describe('findClosestFood function', () => {
    it('Should return null when there is no food', () => {
        const me = {x: 3, y: 4};
        const food: Coord[] = [];

        const closest = findClosestFood(me, food);
        expect(closest).toBeNull();
    });

    it('Should return the only food when there is only one', () => {
        const me = {x: 3, y: 4};
        const food: Coord[] = [{x: 1, y: 1}];

        const closest = findClosestFood(me, food);
        expect(closest).toMatchObject(food[0]);
    });

    it('Should return the closest food when there are several ones', () => {
        const me = {x: 3, y: 4};
        const food: Coord[] = [
            {x: 1, y: 1},
            {x: 2, y: 2}
        ];

        const closest = findClosestFood(me, food);
        expect(closest).toMatchObject(food[1]);
    });
});

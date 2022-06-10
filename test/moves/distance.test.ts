import {distance} from '../../src/moves';

describe('distance function', () => {
    it('Should compute the right distances', () => {
        expect(distance({x: 1, y: 1}, {x: 4, y: 5})).toBe(7);
        expect(distance({x: 4, y: 5}, {x: 1, y: 1})).toBe(7);
        expect(distance({x: 2, y: 2}, {x: 9, y: 9})).toBe(14);
    });
});

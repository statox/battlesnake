import {getDestination} from '../../src/moves';

describe('getDestination function', () => {
    it('Should return the correct values', () => {
        expect(getDestination({x: 5, y: 5}, 'up')).toMatchObject({x: 5, y: 6});
        expect(getDestination({x: 5, y: 5}, 'down')).toMatchObject({x: 5, y: 4});
        expect(getDestination({x: 5, y: 5}, 'right')).toMatchObject({x: 6, y: 5});
        expect(getDestination({x: 5, y: 5}, 'left')).toMatchObject({x: 4, y: 5});
    });
    test('Should throw error on invalid direction on octopus', () => {
        expect(() => {
            getDestination({x: 5, y: 5}, 'toto');
        }).toThrow();
    });
});

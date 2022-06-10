import {filterPossibleMoves} from '../../src/moves';

describe('filterPossibleMoves function', () => {
    it('Should select properties properly', () => {
        const noUp = {up: false, down: true, right: true, left: true};
        const noDown = {up: true, down: false, right: true, left: true};
        const noRight = {up: true, down: true, right: false, left: true};
        const noLeft = {up: true, down: true, right: true, left: false};

        const noHorizontal = {up: true, down: true, right: false, left: false};
        const noVertical = {up: false, down: false, right: true, left: true};

        const noMove = {up: false, down: false, right: false, left: false};
        const allMoves = {up: true, down: true, right: true, left: true};

        expect(filterPossibleMoves([noUp, noDown])).toMatchObject(noVertical);
        expect(filterPossibleMoves([noRight, noLeft])).toMatchObject(noHorizontal);
        expect(filterPossibleMoves([noHorizontal, noVertical])).toMatchObject(noMove);
        expect(filterPossibleMoves([])).toMatchObject(allMoves);
    });
});

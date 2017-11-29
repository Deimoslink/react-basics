import {getSortedResults} from '../src/js/selectors';

//jest.dontMock(selectors);


let resultsMock = [
    {
        id: 1,
        vote_average: 3.3,
        release_date: "2017-01-15"
    }, {
        id: 2,
        vote_average: 6.6,
        release_date: "2007-12-01"
    }, {
        id: 3,
        vote_average: 5.5,
        release_date: "1990-04-04"
    }, {
        id: 4,
        vote_average: 9.3,
        release_date: "2016-03-30"
    },
];

let testMock = {
    3: {id: 3, vote_average: 5.5, release_date: "1990-04-04"},
    2: {id: 2, vote_average: 6.6, release_date: "2007-12-01"},
    4: {id: 4, vote_average: 9.3, release_date: "2016-03-30"},
    1: {id: 1, vote_average: 3.3, release_date: "2017-01-15"}
};


let sortedByRating = {
    1: {id: 1, vote_average: 3.3, release_date: "2017-01-15"},
    3: {id: 3, vote_average: 5.5, release_date: "1990-04-04"},
    2: {id: 2, vote_average: 6.6, release_date: "2007-12-01"},
    4: {id: 4, vote_average: 9.3, release_date: "2016-03-30"}
};
let sortedByDate = {
    3: {id: 3, vote_average: 5.5, release_date: "1990-04-04"},
    2: {id: 2, vote_average: 6.6, release_date: "2007-12-01"},
    4: {id: 4, vote_average: 9.3, release_date: "2016-03-30"},
    1: {id: 1, vote_average: 3.3, release_date: "2017-01-15"}
};

describe('sorting', function(){
    it('should sort', function () {
        expect(getSortedResults([1,2,3], 'vote_average')).toEqual([1,2,3]);
    })
});
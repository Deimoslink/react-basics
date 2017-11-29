import {getSortedResults} from '../src/js/selectors';

let resultsMock = {
    3: {id: 3, vote_average: 5.5, release_date: "1990-04-04"},
    2: {id: 2, vote_average: 6.6, release_date: "2007-12-01"},
    4: {id: 4, vote_average: 9.3, release_date: "2016-03-30"},
    1: {id: 1, vote_average: 3.3, release_date: "2017-01-15"}
};

let sortedByRating = [
    {id: 1, vote_average: 3.3, release_date: "2017-01-15"},
    {id: 3, vote_average: 5.5, release_date: "1990-04-04"},
    {id: 2, vote_average: 6.6, release_date: "2007-12-01"},
    {id: 4, vote_average: 9.3, release_date: "2016-03-30"}
];
let sortedByDate = [
    {id: 3, vote_average: 5.5, release_date: "1990-04-04"},
    {id: 2, vote_average: 6.6, release_date: "2007-12-01"},
    {id: 4, vote_average: 9.3, release_date: "2016-03-30"},
    {id: 1, vote_average: 3.3, release_date: "2017-01-15"}
];
let mockState = {
    results: resultsMock,
    sortBy: 'vote_average'
};

describe('sorting', function() {
    it('should sort by rating', function () {
        expect(getSortedResults(mockState)).toEqual(sortedByRating);
    });
    it('should sort by date', function () {
        expect(getSortedResults({...mockState, sortBy: 'release_date'})).toEqual(sortedByDate);
    });
});
import {createSelector} from 'reselect';


export const getResults = state => state.results;
export const getSortBy = state => state.sortBy;

export const getSortedResults = createSelector(
    getResults,
    getSortBy,
    (results, sortBy) => {
        return [...results.sort((a, b) => {
            if (a[sortBy] < b[sortBy]) return -1;
            if (a[sortBy] > b[sortBy]) return 1;
            return 0;
        })]
    }
);

import {createSelector} from 'reselect';

export const getResults = state => state.results || {};
export const getKnownForResults = state => state.knownFor || {};
export const getSortBy = state => state.sortBy;
export const getMovieId = state => state.movie;

export const getResultsToDisplay = createSelector(
    getResults,
    getKnownForResults,
    getMovieId,
    (results, knowForResults, movieId) => movieId ? knowForResults : results
)

export const getSortedResults = createSelector(
    getResultsToDisplay,
    getSortBy,
    (results, sortBy) => {
        return Object.keys(results)
            .map((id) => results[id])
            .sort((a, b) => {
                if (a[sortBy] < b[sortBy]) return -1;
                if (a[sortBy] > b[sortBy]) return 1;
                return 0;
            })
    }
);

export const getMovie = createSelector(
    getMovieId,
    getResults,
    getKnownForResults,
    (movieId, results, knownFor) => {
        return results[movieId] || knownFor[movieId] || {}
    }
)

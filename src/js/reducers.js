import {combineReducers} from 'redux';

const sortByReducer = function(state = 'vote_average', action) {
    if (action.type === 'SET_SORTING') {
        return action.payload
    }
    return state;
};
const searchStateReducer = function(state = 'title', action) {
    if (action.type === 'SET_SEARCH_STATE') {
        return action.payload
    }
    return state;
};
const searchQueryReducer = function(state = '', action) {
    if (action.type === 'SET_SEARCH_QUERY') {
        return action.payload
    }
    return state;
};
const directorReducer = function(state='', action) {
    if (action.type === 'SET_DIRECTOR') {
        console.log('director reducer');
        return action.payload
    }
    return state;
};
const movieReducer = function(state={}, action) {
    if (action.type === 'SET_MOVIE') {
        return action.payload
    }
    return state;
};
const resultsReducer = function(state=[], action) {
    if (action.type === 'SET_RESULTS') {
        return action.payload
    }
    return state;
};

const reducer = combineReducers({
    sortBy: sortByReducer,
    searchState: searchStateReducer,
    searchQuery: searchQueryReducer,
    director: directorReducer,
    movie: movieReducer,
    results: resultsReducer
});

export default reducer;

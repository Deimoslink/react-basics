const sortByReducer = function(state = 'vote_average', action) {
    if (action.type === 'SET_SORTING') {
        return action.payload;
    }
    return state;
};
const searchStateReducer = function(state = 'title', action) {
    if (action.type === 'SET_SEARCH_STATE') {
        return action.payload;
    } else if (action.type === 'ROUTER:SEARCH') {
        return action.payload.type;
    } else if (action.type === 'ROUTER:HOME') {
        return 'title';
    }
    return state;
};
const searchQueryReducer = function(state = '', action) {
    if (action.type === 'SET_SEARCH_QUERY') {
        return action.payload;
    } else if (action.type === 'ROUTER:SEARCH') {
        return action.payload.query;
    } else if (action.type === 'ROUTER:HOME') {
        return '';
    }
    return state;
};

const directorReducer = function(state='', action) {
    if (action.type === 'SET_DIRECTOR') {
        return action.payload;
    }
    return state;
};

const movieReducer = function(state = null, action) {
    if (action.type === 'SET_MOVIE') {
        return action.payload;
    } else if (action.type === 'ROUTER:FILM') {
        return action.payload.id;
    } else if (action.type === 'ROUTER:HOME') {
        return null;
    }
    return state;
};

const resultsReducer = function(state = null, action) {
    if (action.type === 'SET_RESULTS') {
        return action.payload;
    }
    return state;
};

const knownForReducer = function(state = null, action) {
    if (action.type === 'SET_KNOWNFOR_RESULTS') {
        return action.payload;
    }
    return state;
};

const reducer = {
    sortBy: sortByReducer,
    searchState: searchStateReducer,
    searchQuery: searchQueryReducer,
    movie: movieReducer,
    director: directorReducer,
    results: resultsReducer,
    knownFor: knownForReducer
};

export default reducer;

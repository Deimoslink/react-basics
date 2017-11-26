import axios from 'axios';

function replaceSpaces(str) {
    return str.replace(/ /g, '+');
}

export const setNewResults = (results, knownFor = false) => ({
    type: knownFor ? 'SET_KNOWNFOR_RESULTS' : 'SET_RESULTS',
    payload: results.reduce((movies, movie) => {
        return {
            ...movies,
            [movie.id]: movie
        }
    }, {})
});

export const setNewMovie = (movie) => ({
    type: 'SET_MOVIE',
    payload: movie
});

export const setDirector = (director) => ({
    type: 'SET_DIRECTOR',
    payload: director
});

export const setNewSearchState = (searchState) => ({
    type: 'SET_SEARCH_STATE',
    payload: searchState
});

export const setNewSearchQuery = (searchQuery) => ({
    type: 'SET_SEARCH_QUERY',
    payload: searchQuery
});

export const setSorting = (sorting) => ({
    type: 'SET_SORTING',
    payload: sorting
});

export const performSearch = (searchState, searchQuery) => {
    return (dispatch) => {
        const queryPlusSeparated = replaceSpaces(searchQuery);
        const queryUrl = searchState === 'director'
            ? 'https://api.themoviedb.org/3/search/person?api_key=f3444ae7a15965784cb64735f4647f14&query=' + queryPlusSeparated
            : 'https://api.themoviedb.org/3/search/movie?api_key=f3444ae7a15965784cb64735f4647f14&query=' + queryPlusSeparated;

        axios.get(queryUrl)
            .then(res => {
                dispatch(
                    setNewResults(searchState === 'director'
                        ? res.data.results[0].known_for
                        : res.data.results)
                )
            })
            .catch(err => {
                console.log(err);
                dispatch(
                    setNewResults([])
                )

            });
    }
};

export const setMovieAndGetDetails = (movieId) => {
    return (dispatch) => {
        dispatch(setNewMovie(movieId));

        let query = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=f3444ae7a15965784cb64735f4647f14&append_to_response=credits';
        axios.get(query)
            .then(res => {
                let director;
                res.data.credits.crew.forEach(person => {
                    if (person.job === 'Director') {
                        director = person;
                    }
                });
                if (director) {
                    dispatch (
                        setDirector(director)
                    );
                    dispatch (
                        performSearchByDirector(director.id)
                    );
                }
            })
        
    }
}

export const performSearchByDirector = (directorId) => {
    console.log('performSearchByDirector');
    return (dispatch) => {
        let queryUrl = `https://api.themoviedb.org/3/person/${directorId}/movie_credits?api_key=f3444ae7a15965784cb64735f4647f14&append_to_response=known_for`;
        axios.get(queryUrl)
            .then(res => {
                console.log('other movies by this director', res.data.crew.filter(({job}) => job === 'Director'));
                dispatch(
                    setNewResults(res.data.crew.filter(({job}) => job === 'Director'), true)
                )
            })
            .catch(err => {
                dispatch(
                    setNewResults([], true)
                )
            });
    }
};

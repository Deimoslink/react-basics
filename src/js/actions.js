import axios from 'axios';

function replaceSpaces(str) {
    return str.replace(/ /g, '+');
}

function jsonToQueryString(json) {
    return '' +
        Object.keys(json).map(function (key) {
            return encodeURIComponent(key) + '=' +
                encodeURIComponent(json[key]);
        }).join('&');
}

export const setNewResults = (results) => ({
    type: 'SET_RESULTS',
    payload: results
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

export const performSearch = () => {
    return (dispatch, getState) => {
        const {searchState, searchQuery} = getState();
        let queryObj = {[searchState]: searchQuery};
        let queryStr = jsonToQueryString(queryObj);
        let queryPlusSeparated = replaceSpaces(searchQuery);
        let queryUrl;
        if (searchState === 'director') {
            queryUrl = 'https://api.themoviedb.org/3/search/person?api_key=f3444ae7a15965784cb64735f4647f14&query=' + queryPlusSeparated;
            if (queryStr) {
                // history.push('/search/' + queryStr);
            }
            axios.get(queryUrl)
                .then(res => {
                    console.log('other movies by this director', res.data.results[0].known_for);
                    dispatch(
                        setNewResults(res.data.results[0].known_for)
                    )
                })
                .catch(err => {
                    console.log(err);
                    dispatch(
                        setNewResults([])
                    )

                });
        }
        if (searchState === 'title') {
            queryUrl = 'https://api.themoviedb.org/3/search/movie?api_key=f3444ae7a15965784cb64735f4647f14&query=' + queryPlusSeparated;
            console.log('perform search', queryUrl, queryStr);
            if (queryStr) {
                // history.push('/search/' + queryStr);
            }
            axios.get(queryUrl)
                .then(res => {
                    let result = res.data.results;
                    dispatch(
                        setNewResults(result)
                    )
                })
                .catch(err => {
                    console.log(err);
                    dispatch(
                        setNewResults([])
                    )
                });
        }

    }
};

export const performSearchByDirector = (director) => {
    console.log('performSearchByDirector');
    return (dispatch) => {
        let queryPlusSeparated = replaceSpaces(director.name);
        let queryUrl = 'https://api.themoviedb.org/3/search/person?api_key=f3444ae7a15965784cb64735f4647f14&query=' + queryPlusSeparated;
        axios.get(queryUrl)
            .then(res => {
                console.log('other movies by this director', res.data.results[0].known_for);
                dispatch(
                    setNewResults(res.data.results[0].known_for)
                )
            })
            .catch(err => {
                dispatch(
                    setNewResults([])
                )

            });
    }
};

export const getDirector = (movieId) => {
    console.log('get director');
    return (dispatch) => {
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
                        performSearchByDirector(director)
                    )
                }
            })
            .catch(err => {

            });
    }
};

export const performSearchForAMovie = (search, title) => {
    console.log('perform search for a movie');
    return (dispatch) => {
        let queryUrl = 'https://api.themoviedb.org/3/search/movie?api_key=f3444ae7a15965784cb64735f4647f14&query=' + title;
        axios.get(queryUrl)
            .then(res => {
                dispatch(
                    setNewMovie(res.data.results[0])
                );
                dispatch(
                    getDirector(res.data.results[0].id)
                );
                dispatch(
                    performSearchByDirector()
                );
            })
            .catch(err => {
                console.log(err);
            });
    }
};
import '../css/main.scss';
import React from 'react';
import {render} from 'react-dom';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux';

import Search from "./components/Search.jsx";
import {Film} from "./components/Film.jsx";

class App extends React.Component {

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/search/:query" component={Search} exact={false}/>
                    <Route path="/film/:title" component={Film} />
                    <Route path="*" component={Search}/>
                </Switch>
            </Router>
        );
    }
}

const INITIAL_STATE = {
    sortBy: 'vote_average',
    searchState: {
        mode: 'title',
        query: ''
    },
    director: '',
    movie: {},
    results: []
};

const sortByReducer = function(state = 'vote_average', action) {
    if (action.type === 'SET_SORTING') {
        return action.payload
    }
    return state;
};
const searchStateReducer = function(state = {mode: 'title', query: ''}, action) {
    if (action.type === 'SET_SEARCH_STATE') {
        return action.payload
    }
    return state;
};
const directorReducer = function(state='', action) {
    return state;
};
const movieReducer = function(state={}, action) {
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
    director: directorReducer,
    movie: movieReducer,
    results: resultsReducer
});

const logger = (store) => (next) => (action) => {
    console.log('action fired', action);
    next(action);
};

const middleware = applyMiddleware(logger);

const store = createStore(reducer, middleware);

render(
    <Provider store={store}>
        <App/>
    </Provider>,
    window.document.getElementById('app')
);

if (PRODUCTION) {
    console.log('Production mode is on');
}

store.subscribe(() => {
    console.log('store changed', store.getState());
});

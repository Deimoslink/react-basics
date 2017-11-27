import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createHistory from 'history/createMemoryHistory';
import { connectRoutes } from 'redux-first-router';
import {setMovieAndGetDetails, performSearch} from '../src/js/actions';

export default async function configureStore(req) {
    const history = createHistory({ initialEntries: [req.path] });

    const routesMap = {
        'ROUTER:HOME': {path: '/search'},
        'ROUTER:SEARCH': {path: '/search/:type/:query', thunk: (dispatch, getState) => {
            const {location} = getState();
            dispatch(performSearch(location.payload.type, location.payload.query));
        }},
        'ROUTER:FILM': {path: '/film/:id', thunk: (dispatch, getState) => {
            const {location} = getState();
            dispatch(setMovieAndGetDetails(location.payload.id));
        }}
    };

    const { reducer, middleware, enhancer, thunk } = connectRoutes(history, routesMap);
    const rootReducer = combineReducers({ location: reducer });
    const store = createStore(rootReducer, compose(enhancer, applyMiddleware(middleware)));


    await thunk(store);

    return store;
}
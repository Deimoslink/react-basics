import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createHistory from 'history/createMemoryHistory';
import { connectRoutes } from 'redux-first-router';
import {setMovieAndGetDetails, performSearch} from '../src/js/actions';
import reducer from '../src/js/reducers';
import reduxThunk from 'redux-thunk';

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

    const { reducer: locationReducer, middleware: locationMiddleware, enhancer, thunk } = connectRoutes(history, routesMap);
    const middleWares = applyMiddleware(reduxThunk, locationMiddleware);
    const rootReducer = combineReducers({ location: locationReducer, ...reducer });
    const store = createStore(rootReducer, compose(enhancer, middleWares));


    await thunk(store);

    return store;
}
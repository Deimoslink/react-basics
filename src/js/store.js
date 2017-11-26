import {connectRoutes} from 'redux-first-router';
import {applyMiddleware, createStore, combineReducers, compose} from 'redux';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';
import reducer from './reducers'
import routesMap from './routes';

const history = createHistory();

const { reducer: locationReducer, middleware: locationMiddleware, enhancer } = connectRoutes(history, routesMap) // yes, 3 redux aspects

const middlewares = applyMiddleware(thunk, createLogger({collapsed: false}), locationMiddleware);
const store = createStore(combineReducers({ location: locationReducer, ...reducer }), compose(enhancer, middlewares));

export default store;

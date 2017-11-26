import {setMovieAndGetDetails, performSearch} from './actions';

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
}

export default routesMap;

import { combineReducers } from 'redux';
import { SET_FILTER, SET_MOVIES } from '../actions/actions';

//get atributes realated to a movie (genre, director, etc.)
function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}


//initialize movies property with list of movies
function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies
});


export default moviesApp;
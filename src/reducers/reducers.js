import { combineReducers } from 'redux';
import { SET_FILTER, SET_MOVIES, SET_USER, TOGGLE_REGISTER } from '../actions/actions';


function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}


function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function user(state = '', action) {
  switch (action.type) {
    case SET_USER:
      return action.value;
    default:
      return state;
  }
}

function shouldDisplayRegister(state = false, action) {
  switch (action.type) {
    case TOGGLE_REGISTER:
      return !state;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
  shouldDisplayRegister
});


export default moviesApp;
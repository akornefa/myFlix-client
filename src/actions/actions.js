export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER = 'SET_USER';
export const TOGGLE_REGISTER = 'TOGGLE_REGISTER';

export function setMovies(value) {
  return {
    type: SET_MOVIES,
    value
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value
  };
}

export function setUser(value) {
  return {
    type: SET_USER,
    value
  }
}

export function toggleRegister(value) {
  return {
    type: TOGGLE_REGISTER,
    value
  }
}
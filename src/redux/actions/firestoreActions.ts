import * as types from './types';

export const fetchTodos = () => {
  return {
    type: types.FETCH_TODOS,
  };
};
export const succesTodos = todos => {
  return {
    type: types.SUCCES_TODOS,
    payload: todos,
  };
};

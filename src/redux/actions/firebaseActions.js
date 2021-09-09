import * as types from './types';

export const fetchTodos = userId => {
  return {
    type: types.FETCH_TODOS,
    payload: userId,
  };
};

export const succesTodos = (todos, userId) => {
  return {
    type: types.SUCCES_TODOS,
    payload: {todos, userId},
  };
};

export const addTodoSucess = (text, userId) => {
  return {
    type: types.ADD_TODO_SUCCES,
    payload: {text, userId},
  };
};

export const deleteTodoAction = id => {
  return {
    type: types.DELETE_TODO,
    payload: id,
  };
};

export const updateTodoAction = (text, id) => {
  return {
    type: types.UPDATE_TODO,
    payload: {text, id},
  };
};

export const updateCompletedAction = (id, complete) => {
  return {
    type: types.UPDATE_COMPLETED,
    payload: {id, complete},
  };
};

export const fetchSignInAction = () => {
  return {
    type: types.SIGN_IN_FETCH,
  };
};

export const succesSignInAction = userId => {
  return {
    type: types.SIGN_IN_SUCCES,
    payload: userId,
  };
};

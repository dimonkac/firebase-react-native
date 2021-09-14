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

export const addTodoSucess = (text, userId, data) => {
  return {
    type: types.ADD_TODO_SUCCES,
    payload: {text, userId, data},
  };
};

export const deleteTodoAction = id => {
  return {
    type: types.DELETE_TODO,
    payload: id,
  };
};

export const updateTodoAction = (text, id, data) => {
  return {
    type: types.UPDATE_TODO,
    payload: {text, id, data},
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

export const fetchSignOutAction = () => {
  return {
    type: types.SIGN_OUT_FETCH,
  };
};

export const succesSignOutAction = () => {
  return {
    type: types.SIGN_OUT_SUCCES,
  };
};

export const fetchSignInPasswordAction = (email, password) => {
  return {
    type: types.SIGN_IN_FETCH_PASSWORD,
    payload: {email, password},
  };
};

export const succesSignInPasswordAction = userId => {
  return {
    type: types.SIGN_IN_SUCCES_PASSWORD,
    payload: userId,
  };
};

export const fetchAuthorizationAction = (email, password) => {
  return {
    type: types.SIGN_IN_FETCH_AUTHORIZATION,
    payload: {email, password},
  };
};

export const succesSignInAuthorizationAction = userId => {
  return {
    type: types.SIGN_IN_SUCCES_AUTHORIZATION,
    payload: userId,
  };
};

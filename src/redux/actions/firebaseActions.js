import * as types from './types';

export const fetchTodosAction = userId => ({
  type: types.FETCH_TODOS,
  payload: userId,
});

export const successTodosAction = (todos, userId) => ({
  type: types.SUCCES_TODOS,
  payload: {todos, userId},
});

export const addTodoSuccessAction = (text, userId, date) => ({
  type: types.ADD_TODO_SUCCES,
  payload: {text, userId, date},
});

export const deleteTodoAction = id => ({
  type: types.DELETE_TODO,
  payload: id,
});

export const updateTodoAction = (text, id, date, complete, docID) => ({
  type: types.UPDATE_TODO,
  payload: {text, id, date, complete, docID},
});

export const fetchSignInAction = () => ({type: types.SIGN_IN_FETCH});

export const successSignInAction = userId => ({
  type: types.SIGN_IN_SUCCES,
  payload: userId,
});

export const fetchSignOutAction = () => ({type: types.SIGN_OUT_FETCH});

export const successSignOutAction = () => ({type: types.SIGN_OUT_SUCCES});

export const fetchSignInPasswordAction = (email, password) => ({
  type: types.SIGN_IN_FETCH_PASSWORD,
  payload: {email, password},
});

export const successSignInPasswordAction = userId => ({
  type: types.SIGN_IN_SUCCES_PASSWORD,
  payload: userId,
});

export const fetchAuthorizationAction = (email, password) => ({
  type: types.SIGN_IN_FETCH_AUTHORIZATION,
  payload: {email, password},
});

export const successSignInAuthorizationAction = userId => ({
  type: types.SIGN_IN_SUCCES_AUTHORIZATION,
  payload: userId,
});

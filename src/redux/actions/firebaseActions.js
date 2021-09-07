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

export const addTodoSucess = text => {
  return {
    type: types.ADD_TODO_SUCCES,
    payload: text,
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

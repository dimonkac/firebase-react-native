import * as types from './types';

export const fetchTodos = userId => {
  return {
    type: types.FETCH_TODOS,
    payload: userId,
  };
};

export const successTodos = (todos, userId) => {
  return {
    type: types.SUCCES_TODOS,
    payload: {todos, userId},
  };
};

export const addTodoSuccess = (text, userId, date) => {
  return {
    type: types.ADD_TODO_SUCCES,
    payload: {text, userId, date},
  };
};

export const deleteTodoAction = id => {
  return {
    type: types.DELETE_TODO,
    payload: id,
  };
};

export const updateTodoAction = (text, id, date, complete, docID) => {
  return {
    type: types.UPDATE_TODO,
    payload: {text, id, date, complete, docID},
  };
};

// export const updateCompletedAction = (id, complete) => {
//   return {
//     type: types.UPDATE_COMPLETED,
//     payload: {id, complete},
//   };
// };

export const fetchSignInAction = () => ({type: types.SIGN_IN_FETCH});

export const successSignInAction = userId => {
  return {
    type: types.SIGN_IN_SUCCES,
    payload: userId,
  };
};

export const fetchSignOutAction = () => ({type: types.SIGN_OUT_FETCH});

export const successSignOutAction = () => ({type: types.SIGN_OUT_SUCCES});

export const fetchSignInPasswordAction = (email, password) => {
  return {
    type: types.SIGN_IN_FETCH_PASSWORD,
    payload: {email, password},
  };
};

export const successSignInPasswordAction = userId => {
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

export const successSignInAuthorizationAction = userId => {
  return {
    type: types.SIGN_IN_SUCCES_AUTHORIZATION,
    payload: userId,
  };
};

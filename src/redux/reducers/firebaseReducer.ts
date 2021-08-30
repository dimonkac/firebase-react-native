import * as types from '../actions/types';

const initialState = {
  isloading: false,
};

const todosReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_TODOS:
      return {
        ...state,
        isloading: true,
      };
    case types.SUCCES_TODOS:
      return {
      ...state,
        todos: action.payload,
        isloading: false,
      };
      default:
      return state;
  };

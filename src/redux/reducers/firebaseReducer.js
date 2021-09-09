import * as types from '../actions/types';

const initialState = {
  todos: [],
  isloading: false,
  userID: '',
};

export const todosReducer = (state = initialState, action) => {
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
    case types.ADD_TODO_SUCCES:
      // const newTodo = {
      //   title: action.payload,
      //   completed: false,
      // };
      return {
        ...state,
        // todos: [...state.todos, newTodo],
      };
    case types.DELETE_TODO:
      return {...state};

    case types.UPDATE_TODO:
      return {...state};

    case types.SIGN_IN_FETCH:
      return {
        ...state,
        isloading: true,
      };

    case types.SIGN_IN_SUCCES:
      return {
        ...state,
        isloading: false,
        userID: action.payload,
      };

    case types.SIGN_OUT_FETCH:
      return {
        ...state,
        isloading: true,
      };

    case types.SIGN_OUT_SUCCES:
      return {
        ...state,
        isloading: false,
        userID: action.payload,
      };

    default:
      return state;
  }
};

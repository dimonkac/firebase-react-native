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
        todos: action.payload.todos,
        isloading: false,
      };
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
    case types.SIGN_IN_FETCH_PASSWORD:
      return {
        ...state,
        isloading: true,
      };
    case types.SIGN_IN_SUCCES_PASSWORD:
      return {
        ...state,
        isloading: false,
        userID: action.payload,
      };
    case types.SIGN_IN_FETCH_AUTHORIZATION:
      return {
        ...state,
        isloading: true,
      };
    case types.SIGN_IN_SUCCES_AUTHORIZATION:
      return {
        ...state,
        isloading: false,
        userID: action.payload,
      };
    default:
      return state;
  }
};

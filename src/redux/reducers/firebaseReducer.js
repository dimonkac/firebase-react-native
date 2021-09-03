import * as types from '../actions/types';

const initialState = {
  todos: [],
  isloading: false,
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
      const newTodo = {
        title: action.payload,
        completed: false,
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    default:
      return state;
  }
};

// const addTodo = async () => {
//   let title = textTodo;
//   firestore().collection('todos').add({
//     title,
//     completed: false,
//   });
//   setTextTodo('');
// };

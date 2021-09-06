import {put, takeEvery, all, call, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import {addTodoSucess, succesTodos} from '../actions/firebaseActions';
import {addTodo, getTodos, deleteTodo} from '../firebase/firestore';

export function* fetchTodos() {
  try {
    const todos = yield call(getTodos);
    const normalizedTodos = todos.docs.map(todo => ({
      docID: todo.id,
      ...todo.data(),
    }));
    // todos.onSnapshot(docs => {
    //   docs.forEach(doc => {
    //     normalizedTodos.push({docID: doc.id, ...doc.data()});
    //   });
    //   console.log(normalizedTodos);
    // }),
    yield put(succesTodos(normalizedTodos));
  } catch (error) {
    console.log(error);
  }
}

export function* addTodos(action) {
  try {
    const todos = yield call(addTodo, action.payload);
    todos.add({
      title: action.payload,
      completed: false,
    });
    //yield put(addTodoSucess(todos));
  } catch (e) {
    console.log(e);
  }
}

export function* deleteTodoSaga(action) {
  try {
    console.log(action.payload);
    const todos = yield call(deleteTodo, action.payload);
  } catch (e) {
    console.log(e);
  }
}

export function* watchSagaTodos() {
  yield all([
    takeLatest(types.FETCH_TODOS, fetchTodos),
    takeLatest(types.ADD_TODO_SUCCES, addTodos),
    takeLatest(types.DELETE_TODO, deleteTodoSaga),
  ]);
}

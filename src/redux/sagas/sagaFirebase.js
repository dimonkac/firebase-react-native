import {put, takeEvery, all, call, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import {addTodoSucess, succesTodos} from '../actions/firebaseActions';
import {addTodo, getTodos} from '../firebase/firebase';

export function* fetchTodos() {
  const arr = [];
  try {
    const todos = yield call(getTodos);
    const normalizedTodos = arr => {
      todos.onSnapshot(docs => {
        docs.forEach(doc => {
          arr.push({docID: doc.id, ...doc.data()});
        });
        console.log(arr);
      });
      return console.log(arr);
    };
    normalizedTodos(arr);
    console.log(arr);
    // const normalizedTodoszedTodos = todos.get();
    // todos.onSnapshot(docs => {
    //   docs.forEach(doc => {
    //     normalizedTodos.push({docID: doc.id, ...doc.data()});
    //   });
    //   console.log(normalizedTodos);
    // }),
    // yield put(succesTodos(normalizedTodos));
  } catch (error) {
    console.log(error);
  }
}

export function* addTodos(action) {
  try {
    const todos = yield call(addTodo, action.payload);
    yield put(addTodoSucess(todos));
  } catch (e) {
    console.log(e);
  }
}

export function* watchSagaTodos() {
  yield all([
    takeLatest(types.FETCH_TODOS, fetchTodos),
    takeLatest(types.ADD_TODO_SUCCES, addTodos),
  ]);
}

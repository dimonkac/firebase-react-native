import {put, all, call, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import {
  succesSignInAction,
  succesSignOutAction,
  succesTodos,
} from '../actions/firebaseActions';
import {
  addTodo,
  getTodos,
  deleteTodo,
  updateTodo,
  changeCompleted,
  signUser,
  sigOutUser,
} from '../firebase/firestore';
import {Alert} from 'react-native';

export function* fetchTodos(action) {
  try {
    const todos = yield call(getTodos, action.payload);
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
      title: action.payload.text,
      userId: action.payload.userId,
      completed: false,
    });
  } catch (e) {
    console.log(e);
  }
}

export function* deleteTodoSaga(action) {
  try {
    yield call(deleteTodo, action.payload);
    Alert.alert('success');
  } catch (e) {
    Alert.alert('failed');
    console.log(e);
  }
}

export function* updateTodoSaga(action) {
  try {
    yield call(updateTodo, action.payload);
  } catch (e) {
    console.log(e);
  }
}

export function* updateCompleted(action) {
  try {
    yield call(changeCompleted, action.payload);
  } catch (e) {
    console.log(e);
  }
}

export function* signInSaga() {
  try {
    const user = yield call(signUser);
    yield put(succesSignInAction(user));
  } catch (e) {
    console.log(e);
  }
}

export function* signOutSaga() {
  try {
    const user = yield call(sigOutUser);
    yield put(succesSignOutAction(user));
  } catch (e) {
    console.log(e);
  }
}

export function* watchSagaTodos() {
  yield all([
    takeLatest(types.FETCH_TODOS, fetchTodos),
    takeLatest(types.ADD_TODO_SUCCES, addTodos),
    takeLatest(types.DELETE_TODO, deleteTodoSaga),
    takeLatest(types.UPDATE_TODO, updateTodoSaga),
    takeLatest(types.UPDATE_COMPLETED, updateCompleted),
    takeLatest(types.SIGN_IN_FETCH, signInSaga),
    takeLatest(types.SIGN_OUT_FETCH, signOutSaga),
  ]);
}

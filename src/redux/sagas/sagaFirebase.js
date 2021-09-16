import {put, all, call, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import moment from 'moment';
import {Alert} from 'react-native';
import {
  deleteTodoExpiredAction,
  succesSignInAction,
  succesSignInAuthorizationAction,
  succesSignInPasswordAction,
  succesSignOutAction,
  succesTodos,
} from '../actions/firebaseActions';
import {
  addTodo,
  // getTodos,
  deleteTodo,
  updateTodo,
  changeCompleted,
  signUser,
  sigOutUser,
  signPasswordUser,
  signAuthorizationUser,
  deleteTodoExpired,
} from '../firebase/firestore';

export function* fetchTodos(action) {
  try {
    const todoList = action.payload.filter(
      t => t.data >= moment().format('YYYY-MM-DD'),
    );
    const expiredTodos = action.payload.filter(
      t => t.data < moment().format('YYYY-MM-DD'),
    );
    yield put(succesTodos(todoList));
    if (expiredTodos.length > 0) {
      yield put(deleteTodoExpiredAction(expiredTodos));
    }
  } catch (error) {
    console.log(error);
  }
}
export function* deleteExpiredTodos(action) {
  try {
    // for (let i = 0; i <= action.payload.length; i++) {
    //   yield call(deleteTodoExpired(action.payload[i].docID));
    // }
    console.log(action.payload);
    action.payload.forEach(async elem => {
      try {
        await deleteTodoExpired(elem.docID);
      } catch (e) {
        console.log(e);
      }
    });
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
      data: action.payload.data,
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

export function* signInPasswordSaga(action) {
  try {
    const user = yield call(signPasswordUser, action.payload);
    yield put(succesSignInPasswordAction(user));
  } catch (e) {
    console.log(e);
  }
}

export function* signInAuthorizationSaga(action) {
  try {
    const user = yield call(signAuthorizationUser, action.payload);
    yield put(succesSignInAuthorizationAction(user));
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
    takeLatest(types.SIGN_IN_FETCH_PASSWORD, signInPasswordSaga),
    takeLatest(types.SIGN_IN_FETCH_AUTHORIZATION, signInAuthorizationSaga),
    takeLatest(types.DELETE_EXPIRED_TODO, deleteExpiredTodos),
  ]);
}

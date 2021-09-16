import {put, all, call, takeLatest} from 'redux-saga/effects';
import * as types from '../actions/types';
import moment from 'moment';
import {Alert} from 'react-native';
import {
  successSignInAction,
  successSignInAuthorizationAction,
  successSignInPasswordAction,
  successSignOutAction,
  successTodos,
} from '../actions/firebaseActions';
import {
  addTodo,
  deleteTodo,
  updateTodo,
  changeCompleted,
  signUser,
  sigOutUser,
  signPasswordUser,
  signAuthorizationUser,
} from '../firebase/firestore';

export function* fetchTodos(action) {
  try {
    const todoList = action.payload.filter(
      t => t.date >= moment().format('YYYY-MM-DD'),
    );
    const expiredTodos = action.payload.filter(
      t => t.date < moment().format('YYYY-MM-DD'),
    );
    yield put(successTodos(todoList));
    if (expiredTodos.length > 0) {
      try {
        expiredTodos.forEach(async elem => {
          try {
            await deleteTodo(elem.docID);
          } catch (e) {
            console.log(e);
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
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

export function* addTodos(action) {
  try {
    const newTodo = {
      title: action.payload.text,
      userId: action.payload.userId,
      date: action.payload.date,
      completed: false,
    };
    yield call(addTodo, newTodo);
  } catch (e) {
    console.log(e);
  }
}

export function* updateTodoSaga(action) {
  console.log(action.payload);
  try {
    const newTodo = {
      title: action.payload.text,
      userId: action.payload.id,
      date: action.payload.date,
      completed: action.payload.complete,
    };
    yield updateTodo(action.payload.docID, newTodo);
  } catch (e) {
    console.log(e);
  }
}

// export function* updateCompleted(action) {
//   try {
//     yield call(changeCompleted, action.payload);
//   } catch (e) {
//     console.log(e);
//   }
// }

export function* signInSaga() {
  try {
    const user = yield call(signUser);
    yield put(successSignInAction(user));
  } catch (e) {
    console.log(e);
  }
}

export function* signOutSaga() {
  try {
    const user = yield call(sigOutUser);
    yield put(successSignOutAction(user));
  } catch (e) {
    console.log(e);
  }
}

export function* signInPasswordSaga(action) {
  try {
    const user = yield call(signPasswordUser, action.payload);
    yield put(successSignInPasswordAction(user));
  } catch (e) {
    console.log(e);
  }
}

export function* signInAuthorizationSaga(action) {
  try {
    const user = yield call(signAuthorizationUser, action.payload);
    yield put(successSignInAuthorizationAction(user));
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
    // takeLatest(types.UPDATE_COMPLETED, updateCompleted),
    takeLatest(types.SIGN_IN_FETCH, signInSaga),
    takeLatest(types.SIGN_OUT_FETCH, signOutSaga),
    takeLatest(types.SIGN_IN_FETCH_PASSWORD, signInPasswordSaga),
    takeLatest(types.SIGN_IN_FETCH_AUTHORIZATION, signInAuthorizationSaga),
  ]);
}

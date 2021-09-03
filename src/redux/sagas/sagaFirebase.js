import {put, takeEvery, all, call, takeLatest} from 'redux-saga/effects';

import * as types from '../actions/types';
import firestore from '@react-native-firebase/firestore';
import {succesTodos} from '../actions/firestoreActions';

export function* fetchTodos() {
  try {
    const todos = yield call();
    yield put(succesTodos(todos));
  } catch (e) {
    console.log(error);
  }
}

export function* watchSagaTodos() {
  yield takeLatest(types.FETCH_TODOS, fetchTodos);
}

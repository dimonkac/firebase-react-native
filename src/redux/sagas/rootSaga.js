import {all} from 'redux-saga/effects';
import {watchSagaTodos} from './sagaFirebase';

export default function* rootSaga() {
  yield all([watchSagaTodos()]);
}

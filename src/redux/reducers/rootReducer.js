import {combineReducers} from 'redux';
import {counterReducer} from './counterReducer';
import {todosReducer} from './firebaseReducer';

export interface IRootReducer {
  counterReducer: number;
}

const rootReducer = combineReducers<IRootReducer>({
  counterReducer,
  todosReducer,
});

export default rootReducer;

import {combineReducers} from 'redux';
import {counterReducer} from './counterReducer';

export interface IRootReducer {
  counterReducer: number;
}

const rootReducer = combineReducers<IRootReducer>({
  counterReducer,
});

export default rootReducer;

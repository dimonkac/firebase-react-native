import {combineReducers} from 'redux';
import {counterReducer} from './counterReducer';
import {todosReducer} from './firebaseReducer';

const rootReducer = combineReducers({
  counterReducer,
  todosReducer,
});

export default rootReducer;

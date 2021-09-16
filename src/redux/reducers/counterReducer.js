import * as types from '../actions/types';

export interface ActionI {
  type: string;
  payload?: number;
}

const initState: number = 0;

export const counterReducer = (state = initState, action: ActionI) => {
  switch (action.type) {
    case types.INCREMENT:
      return state + 1;
    case types.DECREMENT:
      return state - 1;
    default:
      return state;
  }
};

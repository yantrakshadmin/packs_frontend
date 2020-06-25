import {CHANGE_PAGE} from '../actions/index';

const INITIAL_STATE = {
  currentPage: 1,
};

export const Page = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_PAGE:
      return {...state, currentPage: action.payload};
    default:
      return state;
  }
};

import {FETCH_PRODUCTS} from '../actions/index';

const initialState = {
  products: [],
};

export const fetchData = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      console.log('reducer');
      return {
        ...state,
        products: action.payload,
      };
    }
    default:
      return state;
  }
};

import {
  ADD_PFEP_BASIC_DATA,
  ADD_PFEP_DATA,
  CLEAN_PFEP_DATA,
  FETCH_PRODUCTS, START_STEP_LOADING, STOP_STEP_LOADING,
} from '../actions/index';

const initialState = {
  products: [],
  pfepData:{},
  stepLoading:false,
};

export const fetchData = (state = initialState, action) => {
  console.log(state,action,'data reducer')
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return {
        ...state,
        products: action.payload,
      };
    }
    case ADD_PFEP_DATA:{
      return{
        ...state,
        pfepData:{ ...state.pfepData,...action.data, }
      }
    }
    case ADD_PFEP_BASIC_DATA:{
      return{
        ...state,
        pfepData:action.data
      }
    }
    case CLEAN_PFEP_DATA:{
      return{
        ...state,
        pfepData:{}
      }
    }
    case START_STEP_LOADING:return {
      ...state,stepLoading: true
    }
    case STOP_STEP_LOADING:return {
      ...state,stepLoading: false
    }
    default:
      return state;
  }
};

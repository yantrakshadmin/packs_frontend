import {
  ADD_CREATE_CP_BASIC_DATA,
  ADD_CREATE_CP_DATA,
  ADD_PFEP_BASIC_DATA,
  ADD_PFEP_DATA, CLEAN_CREATE_CP_DATA,
  CLEAN_PFEP_DATA,
  FETCH_PRODUCTS, START_STEP_LOADING, STOP_STEP_LOADING,
} from '../actions/index';

const initialState = {
  products: [],
  pfepData:{
    np_ef:'New Part',
  },
  createCPData:{

  },
  stepLoading:false,
};

export const fetchData = (state = initialState, action) => {
  // console.log(action,'Actions',state)
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
        pfepData:{
        }
      }
    }
    case ADD_CREATE_CP_DATA:{
      console.log({
        ...state,
        createCPData:{ ...state.createCPData,...action.data, }
      },ADD_CREATE_CP_DATA)
      return{
        ...state,
        createCPData:{ ...state.createCPData,...action.data, }
      }
    }
    case ADD_CREATE_CP_BASIC_DATA:{
      return{
        ...state,
        createCPData:action.data
      }
    }
    case CLEAN_CREATE_CP_DATA:{
      return{
        ...state,
        createCPData:{
        }
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

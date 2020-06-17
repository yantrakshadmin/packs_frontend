import {SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAILURE} from '../actions';

const initialState = {
  loading: false,
  usermeta: null,
  error: '',
};

export const signUpEmployee = (state = initialState, action) => {
  const $ = (newState) => ({...state, ...newState});

  switch (action.type) {
    case SIGN_UP_START:
      return $({loading: true});
    case SIGN_UP_FAILURE:
      return $({loading: false, usermeta: null, error: action.payload});
    case SIGN_UP_SUCCESS:
      return $({loading: false, error: '', usermeta: action.payload});
    default:
      return $();
  }
};

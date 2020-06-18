import {SIGN_UP_START, SIGN_UP_SUCCESS, SIGN_UP_FAILURE} from '../actions';

const initialState = {
  loading: false,
  userMeta: null,
  error: '',
};

export const signUp = (state = initialState, action) => {
  const $ = (newState) => ({...state, ...newState});

  switch (action.type) {
    case SIGN_UP_START:
      return $({loading: true});
    case SIGN_UP_FAILURE:
      return $({loading: false, userMeta: null, error: action.payload});
    case SIGN_UP_SUCCESS:
      return $({loading: false, error: '', userMeta: action.payload});
    default:
      return $();
  }
};

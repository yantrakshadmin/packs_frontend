import {
  SIGN_UP_START,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAILURE,
  USER_AUTHENTICATED,
  SIGN_OUT_USER,
} from '../actions';

const initialState = {
  loading: false,
  userMeta: {type: 'public'},
  error: '',
};

export const auth = (state = initialState, action) => {
  const $ = (newState) => ({...state, ...newState});

  switch (action.type) {
    case SIGN_UP_START:
      return $({loading: true});
    case SIGN_UP_FAILURE:
      return $({loading: false, userMeta: null, error: action.payload});
    case SIGN_UP_SUCCESS:
      return $({loading: false, error: '', userMeta: action.payload});
    case USER_AUTHENTICATED:
      return $({loading: false, userMeta: action.payload, error: ''});
    case SIGN_OUT_USER:
      return initialState;
    default:
      return state;
  }
};

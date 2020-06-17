import {SIGN_UP_START, SIGN_UP_FAILURE, SIGN_UP_SUCCESS} from './index';
import {createEmployee} from '../api/auth';

export const signUpStart = () => ({
  type: SIGN_UP_START,
});

export const signUpFailure = () => ({
  type: SIGN_UP_FAILURE,
});

export const signUpSuccess = (user) => ({
  type: SIGN_UP_SUCCESS,
  payload: user,
});

export const signUpStartAsync = ({username, email, password, first_name, last_name}) => async (
  dispatch,
) => {
  dispatch(signUpStart());
  console.log({username, email, password, first_name, last_name});
  const {data = null, status, error, loading} = createEmployee({
    username,
    email,
    password,
    first_name,
    last_name,
  });
  if (data) {
    console.log(data);
    return dispatch(signUpSuccess(data));
  }
  console.log(error);
  dispatch(signUpFailure(error));
};

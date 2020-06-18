import {SIGN_UP_START, SIGN_UP_FAILURE, SIGN_UP_SUCCESS} from './index';
import {createEmployee, createClient} from '../api/auth';

export const signUpStart = () => ({
  type: SIGN_UP_START,
});

export const signUpFailure = () => ({
  type: SIGN_UP_FAILURE,
});

export const signUpSuccess = (user) => ({
  type: SIGN_UP_SUCCESS,
  payload: {...user, type: 'public'},
});

export const signUpEmployeeStartAsync = ({
  username,
  email,
  password,
  first_name,
  last_name,
}) => async (dispatch) => {
  dispatch(signUpStart());
  console.log({username, email, password, first_name, last_name});
  const res = await createEmployee({
    username,
    email,
    password,
    first_name,
    last_name,
  });
  const {data, error, loading} = res;
  if (data) {
    console.log(data);
    return dispatch(signUpSuccess(data));
  }

  console.log(error);
  dispatch(signUpFailure(error));
};

export const signUpClientStartAsync = ({
  username,
  email,
  password,
  first_name,
  last_name,
}) => async (dispatch) => {
  dispatch(signUpStart());
  console.log({username, email, password, first_name, last_name});
  const res = await createClient({
    username,
    email,
    password,
    first_name,
    last_name,
  });
  const {data, error, loading} = res;
  if (data) {
    console.log(data);
    return dispatch(signUpSuccess(data));
  }
  console.log(error);
  dispatch(signUpFailure(error));
};

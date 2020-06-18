import {USER_AUTHENTICATED, SIGN_OUT_USER} from './index';

export const userAuthenticated = (currentUser) => ({
  type: USER_AUTHENTICATED,
  payload: currentUser,
});

export const signOutUser = () => ({
  type: SIGN_OUT_USER,
});

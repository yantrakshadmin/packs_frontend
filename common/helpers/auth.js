import {userAuthenticated} from '../actions/signIn';
import {ACCESS_TOKEN, REFRESH_TOKEN} from '../constants/storage';

import {getStorage} from './shared';

import {getUserMeta as getUserMetaAPI} from '../api/auth';

export const getUserMeta = async (dispatch) => {
  const storage = getStorage();
  if (!(await storage.get(ACCESS_TOKEN, null))) return false;

  try {
    const {data: meta} = await getUserMetaAPI();

    if (meta) {
      const {category: type, name, email, username, id, dp} = meta;
      dispatch(userAuthenticated({name, type, email, username, id, dp}));
      return false;
    }

    await storage.delete(ACCESS_TOKEN);
    await storage.delete(REFRESH_TOKEN);
  } catch (e) {
    // ignore error
  }

  return true;
};

import * as jwtDecode from 'jwt-decode';
import axios from 'axios';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants/storage';
import { DEFAULT_BASE_URL } from '../constants/enviroment';

import { getStorage } from './shared';

axios.defaults.baseURL = DEFAULT_BASE_URL;

const getAccessToken = async () => {
  const storage = getStorage();

  const accessToken = await storage.get(ACCESS_TOKEN, null);
  const refreshToken = await storage.get(REFRESH_TOKEN, null);
  if (!(accessToken && refreshToken)) throw Error('No user found');

  const accessPayload = jwtDecode(accessToken);
  if (new Date(parseInt(accessPayload.exp, 10) * 1000) > new Date()) return accessToken;

  const {
    data: { access: newAccessToken },
  } = await axios.post('/api/token/refresh/', {
    refresh: refreshToken,
  });

  await storage.set(ACCESS_TOKEN, newAccessToken);

  return newAccessToken;
};

export const loadAPI = async (url, opts = {}) => {
  const {
    onSuccess = (data) => data,
    onFailure = (error) => error,
    secure = true,
    defaultData,
    headers,
    ...options
  } = opts;

  try {
    const res = await axios(url, {
      headers: {
        ...(secure ? { Authorization: `Bearer ${await getAccessToken()}` } : {}),
        ...headers,
      },
      ...options,
    });

    const { data, status } = res;
    await onSuccess(data);
    return { data, status, error: undefined, loading: false };
  } catch (error) {
    if (error.response) {
      const { data, status } = error.response;
      await onFailure(data);
      return { data: undefined, status, error: data, loading: false };
    }

    if (error.request) {
      const e = { message: 'error in request setup' };
      // noinspection JSCheckFunctionSignatures
      return { data: undefined, status: 0, error: e, loading: false };
    }

    throw Error(error);
  }
};

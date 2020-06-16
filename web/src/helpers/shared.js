import { reactLocalStorage } from 'reactjs-localstorage';

const storage = {
  get: async (key, d) => reactLocalStorage.getObject(key, d),
  set: async (key, value) => reactLocalStorage.setObject(key, value),
  delete: async (key) => reactLocalStorage.remove(key),
};

window.storage = storage;

import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { auth } from './auth';
import { fetchData } from './data';
import { Page } from './page';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: 'root',
  storage,
  blacklist:['fetchData']
};

const reducers = combineReducers({
  user: auth,
  data: fetchData,
  page: Page,
});

const newReducer = persistReducer(persistConfig, reducers);

export const store = createStore(newReducer, composeEnhancers(applyMiddleware(thunk)));

export const persistor = persistStore(store);

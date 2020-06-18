import {combineReducers, createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';

import {signUp} from './signUp';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  user: signUp,
});

export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

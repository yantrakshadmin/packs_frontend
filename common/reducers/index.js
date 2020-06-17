import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import {signUpEmployee} from './signUp';

const reducers = combineReducers({
  user: signUpEmployee,
});

export const store = createStore(reducers, applyMiddleware(thunk));

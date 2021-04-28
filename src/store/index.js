import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import app from './reducers';
import api from '../utils/api';
import {createPromise} from 'redux-promise-middleware';

const PromiseStatus = {
  START: 'START',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
};

const reduxPromise = createPromise({
  promiseTypeSuffixes: [
    PromiseStatus.START,
    PromiseStatus.SUCCESS,
    PromiseStatus.ERROR,
  ],
});
const reducers = combineReducers({app});
const store = createStore(
  reducers,
  applyMiddleware(thunk.withExtraArgument({api: {...api}}), reduxPromise),
);

export default store;

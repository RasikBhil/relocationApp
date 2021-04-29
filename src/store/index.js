import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {persistStore} from 'redux-persist';
import rootReducers from './reducers';
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
export const store = createStore(
  rootReducers,
  applyMiddleware(
    thunk.withExtraArgument({api: {...api}}),
    logger,
    reduxPromise,
  ),
);

export const persistor = persistStore(store);
export default {store, persistor};

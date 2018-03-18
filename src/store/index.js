// @flow

import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';
import logger from 'redux-logger';

import planetStore, { watchGetPlanetList } from '../planets/planets-store';

const sagaMiddleware = createSagaMiddleware();

const appReducer = combineReducers({
  planetStore,
});

let middlewares = [];

if (process.env.NODE_ENV !== 'test') {
  // skip logger middleware if we are running tests
  middlewares.push(logger);
}

middlewares.push(sagaMiddleware);

const store = createStore(appReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(function* () {
  return yield all([watchGetPlanetList()]);
});

export * from '../planets/planets-store';

export default store;

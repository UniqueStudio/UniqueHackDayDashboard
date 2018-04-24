import { createStore, applyMiddleware, compose, Store } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import createHistory from 'history/createHashHistory';
import { History } from 'history';

import reducer, { RootState } from '../reducers';
import SagaManager from '../sagas';

export const history: History = createHistory();
export const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  ((process.env.NODE_ENV === 'development' ||
    window.location.host.includes('console.fredliang.cn')) &&
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)) ||
  compose;

const store: Store<RootState> = createStore(
  reducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

SagaManager.startSagas(sagaMiddleware);

document.addEventListener('unload', () => {
  SagaManager.cancelSagas(store);
});

export default store;

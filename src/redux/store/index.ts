import { createStore, applyMiddleware, compose, Store } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import createHistory from 'history/createHashHistory';
import { History } from 'history';

import reducer, { RootState } from '../reducers';
// import SagaManager from '../sagas';
import sideEffect from '../middleware/io';
import { SYNC_TOKEN } from '../actions/index';

export const history: History = createHistory();
export const sagaMiddleware = createSagaMiddleware();
const composeEnhancers =
  ((process.env.NODE_ENV === 'development' ||
    window.location.host.includes('console.fredliang.cn')) &&
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)) ||
  compose;

const store: Store<RootState> = createStore((state, action) => {
  if (action.type === 'RESTORE') {
    return action.payload;
  }
  return reducer(state, action);
}, composeEnhancers(applyMiddleware(routerMiddleware(history), sideEffect)));

if (localStorage.getItem('token')) {
  store.dispatch({ type: SYNC_TOKEN, payload: localStorage.getItem('token') });
}
window.addEventListener('unload', () => {
  const token = store.getState().auth.token;
  if (token) {
    localStorage.setItem('token', token);
  }
});
export default store;

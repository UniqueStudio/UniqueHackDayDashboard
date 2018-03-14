import { createStore, applyMiddleware, compose, Action, Store } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import createHistory from 'history/createHashHistory';
import { History } from 'history';

import reducer, { RootState } from '../reducers';
// import sagas from '../sagas';
const history: History = createHistory();

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    window &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store: Store<RootState> = createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      // createSagaMiddleware(sagas),
    ),
  ),
);

export { history, store };
export default store;

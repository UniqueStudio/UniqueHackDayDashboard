import { createStore, applyMiddleware, compose, Store } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import createHistory from 'history/createHashHistory';
import { History } from 'history';

import reducer, { RootState } from '../reducers';
import * as sagas from '../sagas';

const history: History = createHistory();

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  // process.env.NODE_ENV === 'development' &&
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const store: Store<RootState> = createStore(
  reducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagaMiddleware.run(sagas.watchUserEntryData);
sagaMiddleware.run(sagas.loginRegisterSaga);

export { history, store };
export default store;

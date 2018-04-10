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
  (process.env.NODE_ENV === 'development' &&
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)) ||
  compose;

const store: Store<RootState> = createStore(
  reducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

SagaManager.startSagas(sagaMiddleware);

export default store;

if ((module as any).hot) {
  (module as any).hot.accept('../reducers', () => {
    const nextRootReducer = require('../reducers').default;
    store.replaceReducer(nextRootReducer);
  });

  (module as any).hot.accept('../sagas', () => {
    SagaManager.cancelSagas(store);
    require('../sagas').default.startSagas(sagaMiddleware);
  });
}

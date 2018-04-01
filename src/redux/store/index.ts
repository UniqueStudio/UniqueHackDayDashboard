import { createStore, applyMiddleware, compose, Store } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import createHistory from 'history/createHashHistory';
import { History } from 'history';

import reducer, { RootState } from '../reducers';
import * as sagas from '../sagas';
import * as applySagas from '../sagas/apply';
// import errorTipSaga from '../sagas/error-tip';

const history: History = createHistory();

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (process.env.NODE_ENV === 'development' &&
    (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)) ||
  compose;

const store: Store<RootState> = createStore(
  reducer,
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagaMiddleware.run(sagas.loginSaga);
sagaMiddleware.run(sagas.registerSaga);

sagaMiddleware.run(sagas.registerSMSSaga);
sagaMiddleware.run(sagas.resetPwdSMSSaga);

sagaMiddleware.run(sagas.detailSaga);

sagaMiddleware.run(sagas.loginStatusSaga);
sagaMiddleware.run(sagas.loginStatusLoopSaga);

sagaMiddleware.run(applySagas.newTeamSaga);

// sagaMiddleware.run(errorTipSaga);

export { history, store };
export default store;

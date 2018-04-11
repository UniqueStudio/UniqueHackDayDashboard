import { take, fork, cancel, all } from 'redux-saga/effects';

import { SagaMiddleware } from 'redux-saga';
import { Store } from 'redux';
import { RootState } from '../reducers';

import requestsSaga from '../sagas/requests';
import entryFlow from '../sagas/entry-flow';
import applyFlow from '../sagas/apply-flow';

import {
  loginSaga,
  registerSaga,
  userInfoSaga,
  // userInfoLoopSaga,
  resetPwdSaga,
  logoutSaga,
} from './user';
import { registerSMSSaga, resetPwdSMSSaga } from './sms-send';
import {
  joinTeamSaga,
  newTeamSaga,
  detailSaga,
  applyConfirmSaga,
  applyProcessSaga,
  teamStatusSaga,
} from './apply';
import { msgPollSaga, showMsg, setReadAllSaga, deleteAllSaga } from './msg';

export function* entrySaga() {
  yield all([
    // about user
    loginSaga(),
    registerSaga(),
    userInfoSaga(),
    resetPwdSaga(),

    // something about sms
    registerSMSSaga(),
    resetPwdSMSSaga(),
  ]);
}

export function* appSaga() {
  yield take('SET_LOGGED_IN');
  // below are sagas only run after logged in
  yield all([
    // userInfoLoopSaga(),
    logoutSaga(),

    // about apply
    detailSaga(),
    joinTeamSaga(),
    newTeamSaga(),

    // msg
    msgPollSaga(),
    showMsg(),
    setReadAllSaga(),
    deleteAllSaga(),
    applyProcessSaga(),
    applyConfirmSaga(),
    teamStatusSaga(),
  ]);
}

// for scaleable
const sagas = [/* entrySaga, appSaga,*/ entryFlow, applyFlow, requestsSaga];

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function createAbortableSaga(saga: any) {
  if (process.env.NODE_ENV === 'development') {
    return function*() {
      const sagaTask = yield fork(saga);
      yield take(CANCEL_SAGAS_HMR);
      yield cancel(sagaTask);
    };
  } else {
    return saga;
  }
}

const SagaManager = {
  startSagas(sagaMiddleware: SagaMiddleware<{}>) {
    sagas.map(createAbortableSaga).forEach(saga => sagaMiddleware.run(saga));
  },
  cancelSagas(store: Store<RootState>) {
    store.dispatch({
      type: CANCEL_SAGAS_HMR,
    });
  },
};

export default SagaManager;

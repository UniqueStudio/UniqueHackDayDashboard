import { take, fork, cancel, all } from 'redux-saga/effects';

import { SagaMiddleware } from 'redux-saga';
import { Store } from 'redux';
import {
  ForkEffect,
  PutEffect,
  SelectEffect,
  AllEffect,
  TakeEffect,
  CallEffect,
} from 'redux-saga/effects';
export { ForkEffect, PutEffect, SelectEffect, AllEffect, TakeEffect, CallEffect };
import { RootState } from '../reducers';

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
    resetPwdSaga(),
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
const sagas = [entrySaga, appSaga];

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function createAbortableSaga(saga: typeof appSaga) {
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

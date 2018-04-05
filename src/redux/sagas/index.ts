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

import { loginSaga, registerSaga, userInfoSaga, resetPwdSaga, logoutSaga } from './user';
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

export function* mainSaga() {
  yield all([
    // about user
    loginSaga(),
    registerSaga(),
    userInfoSaga(),
    resetPwdSaga(),
    logoutSaga(),

    // something about sms
    registerSMSSaga(),
    resetPwdSMSSaga(),

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
const sagas = [mainSaga];

export const CANCEL_SAGAS_HMR = 'CANCEL_SAGAS_HMR';

function createAbortableSaga(saga: typeof mainSaga) {
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

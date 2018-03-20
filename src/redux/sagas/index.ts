import { takeLatest, takeEvery, all } from 'redux-saga/effects';

import { ForkEffect, PutEffect, SelectEffect, AllEffect } from 'redux-saga/effects';
export { ForkEffect, PutEffect, SelectEffect, AllEffect };

import validate, { refreshSMSButton } from './validate';
import loginRegisterSaga from './login-register';
import sendSMSSaga from './sms-send';

export function* watchUserEntryData() {
  yield all([
    takeLatest('REGISTER_FORM_CHANGE', validate('register')),
    takeLatest('REGISTER_FORM_CHANGE', refreshSMSButton),
    takeLatest('LOGIN_FORM_CHANGE', validate('login')),
    takeEvery('REQUEST_SMS', sendSMSSaga),
  ]);
}

export { loginRegisterSaga };

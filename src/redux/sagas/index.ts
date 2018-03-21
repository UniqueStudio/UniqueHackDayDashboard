import { takeLatest, takeEvery, all } from 'redux-saga/effects';

import { ForkEffect, PutEffect, SelectEffect, AllEffect } from 'redux-saga/effects';
export { ForkEffect, PutEffect, SelectEffect, AllEffect };

import validate, { hasError, delay } from './validate';
import loginRegisterSaga from './login-register';
import sendSMSSaga from './sms-send';

export function* watchUserEntryData() {
  yield takeLatest('REGISTER_FORM_CHANGE', validate('register'));
  yield takeLatest('LOGIN_FORM_CHANGE', validate('login'));
  yield takeEvery('REQUEST_SMS', sendSMSSaga);
  yield takeEvery('LOGIN_FORM_TIP_CHANGE', hasError('login'));
  yield takeEvery('REGISTER_FORM_TIP_CHANGE', hasError('register'));
  yield delay(100);
  yield hasError('login')();
  yield hasError('register')();
}

export { loginRegisterSaga };

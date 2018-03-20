import { takeLatest, all } from 'redux-saga/effects';

import { ForkEffect, PutEffect, SelectEffect, AllEffect } from 'redux-saga/effects';
export { ForkEffect, PutEffect, SelectEffect, AllEffect };

import validate from './validate';
import loginRegisterSaga from './login-register';

export function* watchUserEntryData() {
  yield all([
    takeLatest('REGISTER_FORM_CHANGE', validate('register')),
    takeLatest('LOGIN_FORM_CHANGE', validate('login')),
  ]);
}

export { loginRegisterSaga };

import { take, select, call } from 'redux-saga/effects';

import {
  ForkEffect,
  PutEffect,
  SelectEffect,
  AllEffect,
  TakeEffect,
  CallEffect,
} from 'redux-saga/effects';
export { ForkEffect, PutEffect, SelectEffect, AllEffect, TakeEffect, CallEffect };

import { loginRequest, registerRequest, detailRequest } from './login-register';
import sendSMS from './sms-send';

export function* loginSaga() {
  while (true) {
    const { payload: token } = yield take('LOGIN_FORM_SUBMIT');
    const { login: { username, password, autoLogin } } = yield select();
    yield call(loginRequest, username.value, password.value, autoLogin.value, token);

    yield take('LOGOUT_CLICKED');
  }
}

export function* registerSaga() {
  while (true) {
    const { payload: token } = yield take('REGISTER_FORM_SUBMIT');
    const { register: { username, password, phone, code } } = yield select();
    yield call(registerRequest, username.value, password.value, phone.value, code.value, token);
  }
}

export function* smsSaga() {
  while (true) {
    const { payload: token } = yield take('REGISTER_FORM_SMS_SUBMIT');
    const { register } = yield select();
    yield call(sendSMS, register.phone.value, token);
  }
}

export function* detailSaga() {
  while (true) {
    yield take('DETAIL_FORM_SUBMIT');
    const { detail } = yield select();
    yield call(detailRequest, Object.keys(detail).reduce(
      (p, key) => ({
        ...p,
        [key]: detail[key].value,
      }),
      {},
    ) as any);
  }
}

import { take, select, call, put } from 'redux-saga/effects';

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
import { replace } from 'react-router-redux';

export function* loginSaga() {
  while (true) {
    const { payload: token } = yield take('LOGIN_FORM_SUBMIT');
    yield put({ type: 'LOGIN_LOADING_START' });
    const { login: { username, password, autoLogin } } = yield select();
    const { success, message } = yield call(
      loginRequest,
      username.value,
      password.value,
      autoLogin.value,
      token,
    );
    yield put({ type: 'LOGIN_LOADING_END' });
    if (success) {
      yield put(replace('/console'));
      yield take('LOGOUT_CLICKED');
    } else {
      yield put({ type: 'LOGIN_FAILED', payload: message });
    }
  }
}

export function* registerSaga() {
  while (true) {
    const { payload: token } = yield take('REGISTER_FORM_SUBMIT');
    yield put({ type: 'REGISTER_LOADING_START' });
    const { register: { username, password, phone, code } } = yield select();
    const { success, message } = yield call(
      registerRequest,
      username.value,
      password.value,
      phone.value,
      code.value,
      token,
    );
    yield put({ type: 'REGISTER_LOADING_END' });
    if (success) {
      yield put(replace('/console'));
      yield take('LOGOUT_CLICKED');
    } else {
      yield put({ type: 'REGISTER_FAILED', payload: message });
    }
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

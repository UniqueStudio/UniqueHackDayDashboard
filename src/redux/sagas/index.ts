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

import {
  loginRequest,
  registerRequest,
  detailRequest,
  // checkLoginStatus,
  userInfoRequest,
} from './login-register';
import { sendSMSRegister, sendSMSResetPwd } from './sms-send';
import { replace } from 'react-router-redux';
import delay from '../../lib/delay';
// import { UserData } from '../reducers/user';
// import { AnyAction } from 'redux';
// import Message from 'antd/es/message';

export function* loginSaga() {
  while (true) {
    const { payload: token } = yield take('LOGIN_FORM_SUBMIT');
    yield put({ type: 'LOGIN_SUBMIT_START' });
    const { login: { username, password, autoLogin } } = yield select();
    const { successful, message } = yield call(
      loginRequest,
      username.value,
      password.value,
      autoLogin.value,
      token,
    );
    yield put({ type: 'LOGIN_SUBMIT_END' });
    if (!successful) {
      yield put({ type: 'LOGIN_FAILED', payload: message });
      continue;
    }
    yield put({ type: 'CLEAR_LOGIN' });
    yield put({ type: 'LOAD_USER_INFO' });

    yield take('LOGOUT_CLICKED');
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    yield put({ type: 'SET_NOT_LOGGED_IN' });
    yield put(replace('/user_entry'));
  }
}

export function* registerSaga() {
  while (true) {
    const { payload: token } = yield take('REGISTER_FORM_SUBMIT');
    yield put({ type: 'REGISTER_SUBMIT_START' });
    const { register: { username, password, phone, code } } = yield select();
    const { successful, message } = yield call(
      registerRequest,
      username.value,
      password.value,
      phone.value,
      code.value,
      token,
    );
    yield put({ type: 'REGISTER_SUBMIT_END' });
    if (!successful) {
      yield put({ type: 'REGISTER_FAILED', payload: message });
      continue;
    }
    yield put({ type: 'CLEAR_REGISTER' });
    yield put({ type: 'LOAD_USER_INFO' });

    yield take('LOGOUT_CLICKED');
  }
}

export function* registerSMSSaga() {
  while (true) {
    const { payload: token } = yield take('REGISTER_FORM_SMS_SUBMIT');
    yield put({ type: 'REGISTER_SMS_SUBMIT_START' });
    const { register } = yield select();
    const { successful, message } = yield call(sendSMSRegister, register.phone.value, token);
    yield put({ type: 'REGISTER_SMS_SUBMIT_END' });
    if (!successful) {
      yield put({ type: 'REGISTER_SMS_FAILED', payload: message });
    }
  }
}

export function* resetPwdSMSSaga() {
  while (true) {
    const { payload: token } = yield take('RESET_PWD_FORM_SMS_SUBMIT');
    yield put({ type: 'RESET_PWD_SMS_SUBMIT_START' });
    const { resetPwd } = yield select();
    const { successful, message } = yield call(sendSMSResetPwd, resetPwd.phone.value, token);
    yield put({ type: 'RESET_PWD_SMS_SUBMIT_END' });
    if (!successful) {
      yield put({ type: 'RESET_PWD_SMS_FAILED', payload: message });
    }
  }
}

export function* detailSaga() {
  while (true) {
    yield take('DETAIL_FORM_SUBMIT');
    yield put({ type: 'DETAIL_FORM_SUBMIT_START' });
    const { detail } = yield select();
    const { successful, message } = yield call(detailRequest, Object.keys(detail).reduce(
      (p, key) => ({
        ...p,
        [key]: detail[key].value,
      }),
      {},
    ) as any);
    yield put({ type: 'DETAIL_FORM_SUBMIT_END' });
    if (!successful) {
      yield put({ type: 'DETAIL_FORM_SUBMIT_FAILED', payload: message });
    }
  }
}

export function* userInfoSaga() {
  while (true) {
    yield take('LOAD_USER_INFO');
    yield put({ type: 'USER_INFO_LOAD_START' });
    const res = yield call(userInfoRequest);
    yield put({ type: 'USER_INFO_LOAD_END' });
    if (!res) {
      yield put({ type: 'SET_NOT_LOGGED_IN' });
      yield put(replace('/user_entry'));
      // Message.error('需要重新登录！');
    } else {
      yield put({ type: 'SET_LOGGED_IN' });
      yield put({ type: 'SET_USER_INFO', payload: res });
    }
  }
}

export function* userInfoLoopSaga() {
  while (true) {
    yield delay(60 * 1000);
    const { auth } = yield select();
    if (!auth.loggedIn) {
      break;
    }
    yield put({ type: 'USER_INFO_LOAD_START' });
    const res = yield call(userInfoRequest);
    yield put({ type: 'USER_INFO_LOAD_END' });
    if (!res) {
      yield put({ type: 'SET_NOT_LOGGED_IN' });
      yield put(replace('/user_entry'));
      // Message.error('需要重新登录！');
    } else {
      yield put({ type: 'SET_LOGGED_IN' });
      yield put({ type: 'SET_USER_INFO', payload: res });
    }
  }
}

export function* userInfoSetSaga() {
  while (true) {
    const res = yield take('SET_USER_INFO');
    // console.log(res);
    if (res) {
      // yield put({ type: 'SET_LOGGED_IN' });
    }
  }
}

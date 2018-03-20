import { take, all, select, put } from 'redux-saga/effects';

import request, { getToken } from '../../lib/API';
import messageMap from './messages-map';
import { RootState } from '../reducers';

import {
  SelectEffect,
  AllEffect,
  GenericAllEffect,
  TakeEffect,
  PutEffect,
} from 'redux-saga/effects';
export { SelectEffect, AllEffect, GenericAllEffect, TakeEffect, PutEffect };

import { loginValidateAll, registerValidateAll } from './validate';
import { replace } from 'react-router-redux';

const loginRequest = async (usernameOrPhone: string, password: string) => {
  const res = await request({
    endpoint: '/v1/user/login',
    method: 'POST',
    body: {
      usernameOrPhone,
      password,
    },
  });
  if (res.httpStatusCode === 200) {
    return { successful: true, message: '登录成功' };
  } else {
    return { successful: false, message: `登录失败，${messageMap(res.message)}` };
  }
};

const registerRequest = async (username: string, password: string, phone: string, code: string) => {
  const res = await request({
    endpoint: '/v1/user/reg',
    method: 'POST',
    body: {
      username,
      password,
      phone,
      code,
    },
  });
  if (res.httpStatusCode === 200) {
    const loginRes = await request({
      endpoint: '/v1/user/login',
      method: 'POST',
      body: {
        usernameOrPhone: username,
        password,
      },
    });
    if (loginRes.httpStatusCode === 200) {
      return { successful: true, message: '注册成功' };
    }
  }
  return { successful: true, message: `注册失败，${messageMap(res.message)}` };
};

function* loginSaga() {
  while (true) {
    yield take('USER_ENTRY_LOGIN_SUBMIT');

    yield loginValidateAll();

    const { login: { username, password, autoLogin } } = yield select(
      (store: RootState) => store.userEntry,
    );

    if (username.value && password.value) {
      if (username.validateStatus !== 'error' && password.validateStatus !== 'error') {
        const { successful, message } = yield loginRequest(username.value, password.value);
        if (successful) {
          if (autoLogin.value === false) {
            // request 会自动存储 token，
            const token = localStorage.getItem('token');
            localStorage.removeItem('token');
            sessionStorage.setItem('token', token!);
          }
          yield put(replace('/console'));
        } else {
          // console.log(message);
        }
      }
    }
    // console.log(login);
  }
}

function* registerSaga() {
  while (true) {
    yield take('USER_ENTRY_REGISTER_SUBMIT');
    // if (store.route!.location.pathname.indexOf('/user_entry/') !== 0) {
    //   continue;
    // }
    yield registerValidateAll();

    const { register: { username, password, phone, code } } = yield select(
      (store: RootState) => store.userEntry,
    );

    if (username.value && password.value && phone.value && code.value) {
      if (username.validateStatus !== 'error' && password.validateStatus !== 'error') {
        registerRequest(username.value, password.value, phone.value, code.value);
      }
    }
  }
}

export default function* loginRegisterSaga() {
  yield all([loginSaga(), registerSaga()]);
}

export async function checkLoginStatus() {
  const result = await request({
    endpoint: '/v1/user/login_status',
    method: 'GET',
  });
}

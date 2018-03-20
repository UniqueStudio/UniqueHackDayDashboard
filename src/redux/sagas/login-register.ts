import { take, all, select } from 'redux-saga/effects';

import request from '../../lib/API';
import messageMap from './messages-map';
import { RootState } from '../reducers';

import { SelectEffect, AllEffect, GenericAllEffect, TakeEffect } from 'redux-saga/effects';
export { SelectEffect, AllEffect, GenericAllEffect, TakeEffect };

const login = async (usernameOrEmail: string, password: string) => {
  const res = await request({
    endpoint: '/v1/user/login',
    method: 'POST',
    body: {
      usernameOrEmail,
      password,
    },
  });
  if (res.httpStatusCode === 200) {
    return { successful: true, message: '登陆成功' };
  } else {
    return { successful: true, message: `登录失败，${messageMap(res.message)}` };
  }
};

const register = async (username: string, password: string, email: string) => {
  const res = await request({
    endpoint: '/v1/user/reg',
    method: 'POST',
    body: {
      username,
      password,
      email,
    },
  });
  if (res.httpStatusCode === 200) {
    return { successful: true, message: '注册成功' };
  } else {
    return { successful: true, message: `注册失败，${messageMap(res.message)}` };
  }
};

function* loginSaga() {
  while (true) {
    const action = yield take('USER_ENTRY_LOGIN_SUBMIT');
  }
}

function* registerSaga() {
  while (true) {
    const action = yield take('USER_ENTRY_REGISTER_SUBMIT');
    const store: RootState = yield select();
    if (store.route!.location.pathname.indexOf('/user_entry/') !== 0) {
      continue;
    }
  }
}

export default function* loginRegisterSaga() {
  yield all([loginSaga(), registerSaga()]);
}

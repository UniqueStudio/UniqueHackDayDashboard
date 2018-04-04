import request from '../../lib/API';
import { take, select, call, put } from 'redux-saga/effects';
import { replace } from 'react-router-redux';
import Message from 'antd/es/message';

import {
  ForkEffect,
  PutEffect,
  SelectEffect,
  AllEffect,
  TakeEffect,
  CallEffect,
} from 'redux-saga/effects';
export { ForkEffect, PutEffect, SelectEffect, AllEffect, TakeEffect, CallEffect };

import { authorizationToken } from '../../lib/API';
import delay from '../../lib/delay';

import { UserData } from '../reducers/user';

export async function loginRequest(
  usernameOrPhone: string,
  password: string,
  autoLogin: boolean,
  antiRobotToken: string,
) {
  const res = await request({
    endpoint: '/v1/user/login',
    method: 'POST',
    body: {
      usernameOrPhone,
      password,
      antiRobotToken,
    },
  });
  const message = `登录失败：${res.message}`;
  if (res.httpStatusCode === 200) {
    if (autoLogin) {
      const token = sessionStorage.getItem('token');
      sessionStorage.removeItem('token');
      if (token) {
        localStorage.setItem('token', token);
      }
    }
    return { successful: true, message };
  } else {
    return { successful: false, message };
  }
}

export async function registerRequest(
  username: string,
  password: string,
  phone: string,
  code: string,
  antiRobotToken: string,
) {
  const res = await request({
    endpoint: '/v1/user/reg',
    method: 'POST',
    body: {
      username,
      password,
      phone,
      code,
      antiRobotToken,
    },
  });
  const message = `注册失败：${res.message}`;
  if (res.httpStatusCode === 200) {
    return { successful: true, message };
  }
  return { successful: false, message };
}

export async function checkLoginStatus() {
  const res = await request({
    endpoint: '/v1/user/login_status',
    method: 'GET',
  });
  const message = `获取登录信息失败：${res.message}`;
  if (res.httpStatusCode === 200) {
    return { successful: true, message };
  }
  return { successful: false, message };
}

export async function userInfoRequest(): Promise<[UserData | null, number]> {
  const res = await request({
    endpoint: '/v1/user/info',
    method: 'GET',
  });

  if (res.httpStatusCode === 200) {
    return [res.data, res.httpStatusCode];
  }
  return [null, res.httpStatusCode];
}

export async function resetPwdRequest(
  phone: string,
  code: string,
  newPassword: string,
  antiRobotToken: string,
) {
  const res = await request({
    endpoint: '/v1/user/password?reset',
    method: 'POST',
    body: {
      phone,
      code,
      newPassword,
      antiRobotToken,
    },
  });
  const message = `重置密码失败：${res.message}`;
  if (res.httpStatusCode === 200) {
    return { successful: true, message };
  }
  return { successful: false, message };
}

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
    sessionStorage.removeItem('token');
    localStorage.removeItem('token');
    yield put({ type: 'SET_NOT_LOGGED_IN' });
    yield put(replace('/user_entry'));
  }
}

export function* resetPwdSaga() {
  while (true) {
    const { payload: token } = yield take('RESET_PWD_FORM_SUBMIT');
    yield put({ type: 'RESET_PWD_SUBMIT_START' });
    const { resetPwd: { phone, code, newPassword } } = yield select();
    const { successful, message } = yield call(
      resetPwdRequest,
      phone.value,
      code.value,
      newPassword.value,
      token,
    );
    yield put({ type: 'RESET_PWD_SUBMIT_END' });
    if (!successful) {
      yield put({ type: 'RESET_PWD_FAILED', payload: message });
    }
  }
}

export function* userInfoSaga() {
  while (true) {
    yield take('LOAD_USER_INFO');
    yield put({ type: 'USER_INFO_LOAD_START' });
    const [res, code] = yield call(userInfoRequest);
    if (!res) {
      yield put({ type: 'SET_NOT_LOGGED_IN' });
      const { route } = yield select();
      if (route && route.location && route.location.pathname !== '/user_entry/reset_pwd') {
        // avoid redirect when user just want to reset pwd
        yield put(replace('/user_entry'));
        if (authorizationToken()) {
          if (code === 403) {
            Message.error('需要重新登录！');
          } else if (code === 600) {
            Message.error('网络错误，暂时无法登录！');
          } else if (code === 500) {
            Message.error('服务端发生了异常，暂时无法登录！');
          }
        }
      }
    } else {
      yield put({ type: 'SET_LOGGED_IN' });
      yield put({ type: 'SET_USER_INFO', payload: res });
    }
    // put this at the end to
    yield put({ type: 'USER_INFO_LOAD_END' });
  }
}

export function* userInfoLoopSaga() {
  while (true) {
    yield delay(60 * 1000);
    const { auth } = yield select();
    if (!auth.loggedIn) {
      continue;
    }
    yield put({ type: 'LOAD_USER_INFO' });
    // yield put({ type: 'USER_INFO_LOAD_START' });
    // const [res, code] = yield call(userInfoRequest);
    // yield put({ type: 'USER_INFO_LOAD_END' });
    // if (!res) {
    //   yield put({ type: 'SET_NOT_LOGGED_IN' });
    //   yield put(replace('/user_entry'));
    //   if (code === 401) {
    //     Message.error('需要重新登录！');
    //   }
    // } else {
    //   yield put({ type: 'SET_LOGGED_IN' });
    //   yield put({ type: 'SET_USER_INFO', payload: res });
    // }
  }
}

export function* userInfoSetSaga() {
  while (true) {
    const { payload: res }: { payload: UserData } = yield take('SET_USER_INFO');
    if (res) {
      if (!res.isDetailFormSubmitted) {
        yield put(replace('/apply/detail'));
      }
    }
  }
}

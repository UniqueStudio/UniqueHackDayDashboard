import request from '../../lib/API';

import {
  SelectEffect,
  AllEffect,
  GenericAllEffect,
  TakeEffect,
  PutEffect,
} from 'redux-saga/effects';
import { UserData } from '../reducers/user';
export { SelectEffect, AllEffect, GenericAllEffect, TakeEffect, PutEffect };

export const loginRequest = async (
  usernameOrPhone: string,
  password: string,
  autoLogin: boolean,
  antiRobotToken: string,
) => {
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
};

export const registerRequest = async (
  username: string,
  password: string,
  phone: string,
  code: string,
  antiRobotToken: string,
) => {
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
};

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

export async function detailRequest(detail: API.User.UserDetailRequest) {
  const res = await request({
    endpoint: '/v1/user/detail',
    method: 'POST',
    body: detail,
  });
  const message = `提交详情失败：${res.message}`;
  if (res.httpStatusCode === 200) {
    return { successful: true, message };
  }
  return { successful: false, message };
}

export async function userInfoRequest(): Promise<UserData | null> {
  const res = await request({
    endpoint: '/v1/user/info',
    method: 'GET',
  });

  if (res.httpStatusCode === 200) {
    return res.data;
  }
  return null;
}

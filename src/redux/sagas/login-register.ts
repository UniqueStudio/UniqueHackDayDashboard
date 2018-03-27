import request from '../../lib/API';

import {
  SelectEffect,
  AllEffect,
  GenericAllEffect,
  TakeEffect,
  PutEffect,
} from 'redux-saga/effects';
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
  if (res.httpStatusCode === 200) {
    if (autoLogin) {
      const token = sessionStorage.getItem('token');
      sessionStorage.removeItem('token');
      if (token) {
        localStorage.setItem('token', token);
      }
    }
    return { successful: true, message: res.message };
  } else {
    return { successful: false, message: res.message };
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
  if (res.httpStatusCode === 200) {
    return { successful: true, message: res.message };
  }
  return { successful: false, message: res.message };
};

export async function checkLoginStatus() {
  const res = await request({
    endpoint: '/v1/user/login_status',
    method: 'GET',
  });
  if (res.httpStatusCode === 200) {
    return { successful: true, message: res.message };
  }
  return { successful: false, message: res.message };
}

export async function detailRequest(detail: API.User.UserDetailRequest) {
  const res = await request({
    endpoint: '/v1/user/detail',
    method: 'POST',
    body: detail,
  });
  if (res.httpStatusCode === 200) {
    return { successful: true, message: res.message };
  }
  return { successful: false, message: res.message };
}

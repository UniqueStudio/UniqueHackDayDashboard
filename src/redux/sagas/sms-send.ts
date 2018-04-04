import { take, select, call, put } from 'redux-saga/effects';

import request from '../../lib/API';

import { SelectEffect, PutEffect } from 'redux-saga/effects';
export { SelectEffect, PutEffect };

export async function sendSMSRegister(phone: string, antiRobotToken: string) {
  const res = await request({
    endpoint: '/v1/user/send_sms/register',
    method: 'POST',
    body: {
      phone,
      antiRobotToken,
    },
  });
  if (res.httpStatusCode === 200) {
    return { successful: true, message: res.message };
  } else {
    return { successful: false, message: res.message };
  }
}

export async function sendSMSResetPwd(phone: string, antiRobotToken: string) {
  const res = await request({
    endpoint: '/v1/user/send_sms/reset',
    method: 'POST',
    body: {
      phone,
      antiRobotToken,
    },
  });
  if (res.httpStatusCode === 200) {
    return { successful: true, message: res.message };
  } else {
    return { successful: false, message: res.message };
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

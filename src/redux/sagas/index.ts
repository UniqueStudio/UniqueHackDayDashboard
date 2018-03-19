import { takeLatest, select } from 'redux-saga/effects';

import { ForkEffect, PutEffect, SelectEffect } from 'redux-saga/effects';
export { ForkEffect, PutEffect, SelectEffect };

export function* watchFetchData() {
  yield takeLatest('CHANGE_USER_ENTRY_DATA', checkExistence);
}

import { put } from 'redux-saga/effects';
import { RootState, AnyAction } from '../reducers/index';
import request from '../../lib/API';
import { UserEntryData } from '../reducers/userEntry';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const getUserEntry = (state: RootState) => state.userEntry;

export function* checkExistence(action: AnyAction) {
  yield delay(500);

  const { regUsername, regEmail }: UserEntryData = yield select(getUserEntry);

  if (action.payload.fieldName === 'regUsername') {
    if (
      regUsername.validateStatus === 'error' &&
      regUsername.help &&
      regUsername.help.indexOf('已存在') <= 0
    ) {
      return;
    }
    const result = yield request({
      endpoint: '/v1/user/existence?type=username',
      method: 'GET',
      body: { valueToCheck: action.payload.changedTo },
    });
    if (result.data.existence) {
      yield put({
        type: 'CHANGE_USER_ENTRY_TIP',
        payload: {
          fieldName: action.payload.fieldName,
          validateStatus: 'error',
          help: '用户名已存在',
        },
      });
    }
  } else if (action.payload.fieldName === 'regEmail') {
    if (
      regEmail.validateStatus === 'error' &&
      regEmail.help &&
      regEmail.help.indexOf('已存在') <= 0
    ) {
      return;
    }
    const result = yield request({
      endpoint: '/v1/user/existence?type=email',
      method: 'GET',
      body: { valueToCheck: action.payload.changedTo },
    });
    if (result.data.existence) {
      yield put({
        type: 'CHANGE_USER_ENTRY_TIP',
        payload: {
          fieldName: action.payload.fieldName,
          validateStatus: 'error',
          help: '邮箱已存在',
        },
      });
    }
  }
}

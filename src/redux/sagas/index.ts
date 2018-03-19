import { takeLatest, select } from 'redux-saga/effects';

import { ForkEffect, PutEffect, SelectEffect } from 'redux-saga/effects';
export { ForkEffect, PutEffect, SelectEffect };

export function* watchFetchData() {
  yield takeLatest('CHANGE_USER_ENTRY_DATA', checkExistence);
}

import { put } from 'redux-saga/effects';
import { RootState, AnyAction } from '../reducers/index';
import request from '../../lib/API';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const getUserEntry = (state: RootState) => state.userEntry;
const map = {
  regUsername: ['username', '用户名'],
  regEmail: ['email', '邮箱'],
};

export function* checkExistence(action: AnyAction) {
  yield delay(500);

  const userEntry = yield select(getUserEntry);
  const { fieldName, changedTo } = action.payload;

  if (
    userEntry[fieldName].validateStatus === 'error' &&
    userEntry[fieldName].help &&
    userEntry[fieldName].help.indexOf('已存在') <= 0
  ) {
    return;
  }
  const result = yield request({
    endpoint: `/v1/user/existence?type=${(map as any)[fieldName][0]}`,
    method: 'GET',
    body: { valueToCheck: changedTo },
  } as any);
  if (result.data.existence) {
    yield put({
      type: 'CHANGE_USER_ENTRY_TIP',
      payload: {
        fieldName,
        validateStatus: 'error',
        help: `${(map as any)[fieldName][1]}已存在`,
      },
    });
  }
}

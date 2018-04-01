import request from '../../lib/API';
import {
  ForkEffect,
  PutEffect,
  SelectEffect,
  AllEffect,
  TakeEffect,
  CallEffect,
} from 'redux-saga/effects';
export { ForkEffect, PutEffect, SelectEffect, AllEffect, TakeEffect, CallEffect };
import { take, select, call, put } from 'redux-saga/effects';

export async function newTeamRequest(teamName: string) {
  const res = await request({
    endpoint: '/v1/team/teams',
    method: 'POST',
    body: { name: teamName },
  });
  const message = `新建队伍失败：${res.message}`;
  if (res.httpStatusCode === 200) {
    return { successful: true, message };
  }
  return { successful: false, message };
}

export function* newTeamSaga() {
  while (true) {
    yield take('NEW_TEAM_FORM_SUBMIT');
    yield put({ type: 'NEW_TEAM_SUBMIT_START' });
    const { teamForm: { teamName } } = yield select();
    const { successful, message } = yield call(newTeamRequest, teamName.value);
    yield put({ type: 'NEW_TEAM_SUBMIT_END' });
    if (!successful) {
      yield put({ type: 'NEW_TEAM_SUBMIT_FAILED', payload: message });
    }
  }
}

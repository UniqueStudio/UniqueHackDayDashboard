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
import { replace } from 'react-router-redux';

export async function newTeamRequest(teamName: string) {
  const res = await request({
    endpoint: '/v1/team/teams',
    method: 'POST',
    body: { name: teamName },
  });
  if (res.httpStatusCode === 200) {
    return { successful: true };
  }
  return { successful: false, message: `新建队伍失败：${res.message}` };
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
      continue;
    }

    yield put(replace('/apply/done'));
  }
}

export async function joinTeamRequest(teamLeaderName: string, teamLeaderPhone: string) {
  const getTeamIdRes = await request({
    endpoint: '/v1/team/id',
    method: 'GET',
    body: {
      teamLeaderName,
      teamLeaderPhone,
    },
  });

  if (getTeamIdRes.httpStatusCode === 200) {
    const joinTeamRes = await request({
      endpoint: '/v1/team/members',
      method: 'POST',
      body: {
        username: '',
        teamId: '',
      },
    });

    if (joinTeamRes.httpStatusCode === 200) {
      return { successful: true };
    }
    return { successful: false, message: `加入队伍失败：${joinTeamRes.message}` };
  }
  return { successful: false, message: `加入队伍失败：${getTeamIdRes.message}` };
}

export function* joinTeamSaga() {
  while (true) {
    yield take('JOIN_TEAM_FORM_SUBMIT');
    yield put({ type: 'JOIN_TEAM_SUBMIT_START' });
    const { teamForm: { teamLeaderName, teamLeaderPhone } } = yield select();
    const { successful, message } = yield call(
      newTeamRequest,
      teamLeaderName.value,
      teamLeaderPhone.value,
    );
    yield put({ type: 'JOIN_TEAM_SUBMIT_END' });
    if (!successful) {
      yield put({ type: 'JOIN_TEAM_SUBMIT_FAILED', payload: message });
      continue;
    }

    yield put(replace('/apply/done'));
  }
}

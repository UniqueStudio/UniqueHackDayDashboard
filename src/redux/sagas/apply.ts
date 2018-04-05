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
import { goBack } from 'react-router-redux';

import Message from 'antd/es/message';

export async function newTeamRequest(teamName: string) {
  const res = await request({
    endpoint: '/v1/team/teams',
    method: 'POST',
    body: { name: teamName },
  });
  if (res.httpStatusCode === 200) {
    return { successful: true, message: null, teamId: res.data.teamId };
  }
  return { successful: false, message: `新建队伍失败：${res.message}` };
}

export function* newTeamSaga() {
  while (true) {
    yield take('NEW_TEAM_FORM_SUBMIT');
    yield put({ type: 'NEW_TEAM_SUBMIT_START' });
    const { teamForm: { teamName } } = yield select();
    const { successful, message, teamId } = yield call(newTeamRequest, teamName.value);
    yield put({ type: 'NEW_TEAM_SUBMIT_END' });
    if (!successful) {
      yield put({ type: 'NEW_TEAM_SUBMIT_FAILED', payload: message });
      continue;
    }

    yield put({ type: 'SET_USER_INFO', payload: { teamId } });
  }
}

export async function joinTeamRequest(
  teamLeaderName: string,
  teamLeaderPhone: string,
  username: string,
) {
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
        username,
        teamId: getTeamIdRes.data.teamId,
      },
    });

    if (joinTeamRes.httpStatusCode === 200) {
      return { successful: true, message: null, teamId: getTeamIdRes.data.teamId };
    }
    return { successful: false, message: `加入队伍失败：${joinTeamRes.message}` };
  }
  return { successful: false, message: `加入队伍失败：${getTeamIdRes.message}` };
}

export function* joinTeamSaga() {
  while (true) {
    yield take('JOIN_TEAM_FORM_SUBMIT');
    yield put({ type: 'JOIN_TEAM_SUBMIT_START' });

    const { teamForm: { teamLeaderName, teamLeaderPhone }, user: { username } } = yield select();

    const { successful, message, teamId } = yield call(
      joinTeamRequest,
      teamLeaderName.value,
      teamLeaderPhone.value,
      username,
    );
    yield put({ type: 'JOIN_TEAM_SUBMIT_END' });
    if (!successful) {
      yield put({ type: 'JOIN_TEAM_SUBMIT_FAILED', payload: message });
      continue;
    }

    yield put({ type: 'SET_USER_INFO', payload: { teamId } });
  }
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

export async function getDetailRequest() {
  const res = await request({
    endpoint: '/v1/user/detail',
    method: 'GET',
  });

  console.log(res);
}

(window as any).getDetailRequest = getDetailRequest;

export function* detailSaga() {
  while (true) {
    yield take('DETAIL_FORM_SUBMIT');
    yield put({ type: 'DETAIL_FORM_SUBMIT_START' });
    const { detail, user: { isDetailFormSubmitted } } = yield select();
    const { successful, message } = yield call(detailRequest, Object.keys(detail).reduce(
      (p, key) => ({
        ...p,
        [key]: detail[key].value,
      }),
      {},
    ) as any);
    yield put({ type: 'DETAIL_FORM_SUBMIT_END' });

    if (!successful) {
      yield put({ type: 'DETAIL_FORM_SUBMIT_FAILED', payload: message });
      continue;
    }

    yield put({ type: 'SET_USER_INFO', payload: { isDetailFormSubmitted: true } });
    if (isDetailFormSubmitted) {
      // 这里是保存的逻辑
      Message.success('个人资料保存成功！');
      yield put(goBack());
    }
  }
}

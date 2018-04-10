import request from '../../lib/API';
import { take, select, call, put } from 'redux-saga/effects';

import Message from 'antd/es/message';
import { replace } from 'react-router-redux';

export async function changeTeamFormStatus(submitted: boolean) {
  await request({
    endpoint: '/v1/user/team_form_submit_status',
    method: 'POST',
    body: {
      submitted,
    },
  });
}

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
  yield take('APPLY_PROCESS_IS_D');
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

    yield call(changeTeamFormStatus, true);
    yield put({ type: 'SET_USER_INFO', payload: { teamId } });
    if (yield isAtApplyProcess()) {
      yield put({ type: 'APPLY_PROCESS_IS_T', payload: true });
    }
    const [teamInfo] = yield getTeamInfo(teamId);
    yield put({ type: 'SET_TEAM_INFO', payload: teamInfo });
  }
}

export async function getTeamInfo(teamId: number) {
  const res = await request({
    endpoint: '/v1/team/info',
    method: 'GET',
    body: {
      teamId,
    },
  });

  if (res.httpStatusCode === 200) {
    return [res.data, res.message];
  }
  return [null, res.message];
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
  yield take('APPLY_PROCESS_IS_D');
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

    yield call(changeTeamFormStatus, true);
    yield put({ type: 'SET_USER_INFO', payload: { teamId } });
    if (yield isAtApplyProcess()) {
      yield put({ type: 'APPLY_PROCESS_IS_T', payload: true });
    }
    const [teamInfo] = yield getTeamInfo(teamId);
    yield put({ type: 'SET_TEAM_INFO', payload: teamInfo });
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
    if (yield isAtApplyProcess()) {
      yield put({ type: 'APPLY_PROCESS_IS_D', payload: true });
    }
    if (isDetailFormSubmitted) {
      // 这里是保存的逻辑
      Message.success('个人资料保存成功！');
    }
  }
}

export function* applyProcessSaga() {
  const type = 'APPLY_PROCESS_SET_MAX_STEP';
  while (true) {
    yield take('APPLY_PROCESS_START');
    yield put({ type, payload: 0 });
    yield take('APPLY_PROCESS_IS_D');
    yield put({ type, payload: 1 });
    yield take('APPLY_PROCESS_IS_T');
    yield put({ type, payload: 2 });
    yield take('APPLY_PROCESS_IS_C');
    yield put({ type, payload: 3 });
    yield take('APPLY_PROCESS_END');
    yield put(replace('/'));
  }
}

export function* applyConfirmSaga() {
  yield take('APPLY_PROCESS_IS_T');
  while (true) {
    yield take('USER_APPLY_CONFIRM');
    yield put({ type: 'USER_APPLY_CONFIRM_SUBMIT_START' });
    const { httpStatusCode, message } = yield request({
      endpoint: '/v1/user/apply/confirmation',
      method: 'PUT',
      body: {
        confirmation: true,
      },
    });
    yield put({ type: 'USER_APPLY_CONFIRM_SUBMIT_END' });

    if (httpStatusCode !== 200) {
      yield put({ type: 'USER_APPLY_CONFIRM_FAILED', payload: message });
      continue;
    }
    yield put({ type: 'APPLY_PROCESS_IS_C' });
    yield put({ type: 'SET_USER_INFO', payload: { isApplyConfirmed: true } });
  }
}

export function* teamStatusSaga() {
  while (true) {
    yield take('CHANGE_TEAM_FORM_STATUS');

    yield call(changeTeamFormStatus, true);

    if (yield isAtApplyProcess()) {
      yield put({ type: 'APPLY_PROCESS_IS_T', payload: true });
    }
  }
}

function* isAtApplyProcess() {
  const { route: { location } } = yield select();
  return location && location.pathname === '/apply';
}

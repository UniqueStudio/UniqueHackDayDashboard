import * as React from 'react';
import request from '../../lib/API';
import { take, select, put, call, all } from 'redux-saga/effects';
import Message from 'antd/es/message';
import Notify from 'antd/es/notification';
import Icon from 'antd/es/icon';

import { RootState } from '../reducers';

export async function msgPoll() {
  const res = await request({
    endpoint: '/v1/message/messages/new',
    method: 'GET',
  });
  if (res.httpStatusCode === 200) {
    return [true, res.data.messages];
  }
  return [false, null];
}

export function* msgPollSaga() {
  let errorCount = 0;
  while (true) {
    // ensure that when user is no logged in, no poll will run
    const { auth: { loggedIn } } = yield select();
    if (!loggedIn) {
      yield take('SET_LOGGED_IN');
    }

    const [successful, msg]: [boolean, API.Message.SingleMessage[]] = yield call(msgPoll);

    if (!successful) {
      errorCount += 1;
      if (errorCount >= 3) {
        break;
      }
      continue;
    }

    if (msg.length > 0) {
      yield put({ type: 'ADD_MSG_FROM_UNREAD', payload: msg });
    }
    // here we get the message
  }

  Message.error('暂时无法同步消息，请刷新网页重试！');
}

export function* showMsg() {
  while (true) {
    // const msg = yield take('SHOW_MSG');
    yield take('SHOW_MSG');
    Notify.info({
      duration: 0,
      message: '亲爱的梁志博同学',
      description:
        '很抱歉的通知你你已经被我们 Unique Hackday 委员会拒绝参加比赛。欢迎下次再来报名！',
      icon: React.createElement(Icon, { type: 'close-circle-o', style: { color: 'red' } }),
    });
  }
}

export async function allUnreadMessage() {
  const res = await request({
    endpoint: '/v1/message/messages/all?filter=unread',
    method: 'GET',
  });
  if (res.httpStatusCode === 200) {
    return [true, res.data.messages];
  }

  return [false, null];
}

export async function allMessage() {
  const res = await request({
    endpoint: '/v1/message/messages/all',
    method: 'GET',
  });
  if (res.httpStatusCode === 200) {
    return [true, res.data.messages];
  }

  return [false, null];
}

export async function setRead(id: number) {
  const res = await request({
    endpoint: '/v1/message/read_status',
    method: 'PUT',
    body: {
      id,
      status: 'read',
    },
  });
  return res.httpStatusCode === 200;
}

export async function msgDelete(id: number) {
  const res = await request({
    endpoint: '/v1/message/messages',
    method: 'DELETE',
    body: {
      id,
    },
  });
  return res.httpStatusCode === 200;
}

export function* setReadAllSaga() {
  while (true) {
    yield take('MSG_SET_READ_ALL');
    const { msg }: RootState = yield select();
    let count = 0;
    const unreadMsgs = msg.filter(m => m.unread);
    yield all(
      unreadMsgs.map(function*(m) {
        yield put({ type: 'MSG_SET_READ', payload: m.id });
        if (!(yield call(setRead, m.id))) {
          yield put({ type: 'MSG_SET_UNREAD', payload: m.id });
        } else {
          count++;
        }
      }),
    );

    if (count === unreadMsgs.length) {
      Message.success(`成功将 ${count} 条消息设为已读`);
    } else if (count > 0) {
      Message.success(`成功将 ${count} 条消息设为已读`);
      Message.error(`${unreadMsgs.length - count} 条消息设为已读失败`);
    } else {
      Message.error(`${unreadMsgs.length - count} 条消息设为已读失败`);
    }
  }
}

export function* deleteAllSaga() {
  while (true) {
    yield take('MSG_DELETE_ALL');

    const { msg }: RootState = yield select();
    yield all(
      msg.map(function*(m) {
        yield put({ type: 'MSG_DELETE', payload: m.id });
        yield call(msgDelete, m.id);
      }),
    );

    // fetch msg
    const [, msgs] = yield call(allMessage);
    const [, unreadMsgs] = yield call(allUnreadMessage);
    yield put({ type: 'ADD_MSG_FROM_ALL', payload: msgs });
    yield put({ type: 'ADD_MSG_FROM_UNREAD', payload: unreadMsgs });

    if (msgs.length === 0) {
      Message.success(`共删除 ${msg.length} 条消息！`);
    } else {
      Message.error(`删除 ${msgs.length} 条消息时出错`);
    }
  }
}

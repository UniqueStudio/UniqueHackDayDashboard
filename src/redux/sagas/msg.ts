import * as React from 'react';
import request from '../../lib/API';
import { take, select } from 'redux-saga/effects';
import Message from 'antd/es/message';
import Notify from 'antd/es/notification';
import Icon from 'antd/es/icon';

import {
  ForkEffect,
  PutEffect,
  SelectEffect,
  AllEffect,
  TakeEffect,
  CallEffect,
} from 'redux-saga/effects';
export { ForkEffect, PutEffect, SelectEffect, AllEffect, TakeEffect, CallEffect };

export async function msgPoll() {
  const res = await request({
    endpoint: '/v1/message/messages/new',
    method: 'GET',
  });
  if (res.httpStatusCode === 200) {
    return [true, res.message];
  }
  return [false, null];
}

export function* msgPollSaga() {
  let errorCount = 0;
  yield take('SET_LOGGED_IN');
  while (true) {
    // ensure that when user is no logged in, no poll will run
    const { auth: { loggedIn } } = yield select();
    if (!loggedIn) {
      yield take('SET_LOGGED_IN');
    }

    const [successful, msgs]: [boolean, API.Message.SingleMessage[]] = yield msgPoll();

    if (!successful) {
      errorCount += 1;
      if (errorCount >= 3) {
        break;
      }
      continue;
    }
    // here we get the message
  }

  Message.error('暂时无法同步消息，请刷新网页重试！');
}

export function* showMsg() {
  yield take('SET_LOGGED_IN');
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

(window as any).allMessage = allMessage;

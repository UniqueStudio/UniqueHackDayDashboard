import { select, put, SelectEffect, PutEffect } from 'redux-saga/effects';
import request from '../../lib/API';
import { RootState, AnyAction } from '../reducers/index';

export { SelectEffect, PutEffect };

export default async function sendSMS(phone: string, antiRobotToken: string) {
  const result = await request({
    endpoint: '/v1/user/send_sms',
    method: 'POST',
    body: {
      phone,
      antiRobotToken,
    },
  });
  // if (result.httpStatusCode === 200) {
  // }
}

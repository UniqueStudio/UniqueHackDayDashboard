import { SelectEffect, PutEffect } from 'redux-saga/effects';
import request from '../../lib/API';

export { SelectEffect, PutEffect };

export default async function sendSMS(phone: string, antiRobotToken: string) {
  const res = await request({
    endpoint: '/v1/user/send_sms',
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

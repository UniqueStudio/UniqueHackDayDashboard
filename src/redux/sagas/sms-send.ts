import { select, put, SelectEffect, PutEffect } from 'redux-saga/effects';
import request from '../../lib/API';
import { RootState, AnyAction } from '../reducers/index';

export { SelectEffect, PutEffect };

export default function* sendSMSSaga(action: AnyAction) {
  const { register } = yield select((store: RootState) => store.userEntry);
  if (register.phone.value && register.phone.validateStatus !== 'error') {
    // action payload is an antiRobotToken
    sendSMS(register.phone.value, action.payload);
  }
}

async function sendSMS(phone: string, antiRobotToken: string) {
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

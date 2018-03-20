import { select, put, SelectEffect, PutEffect } from 'redux-saga/effects';
import request from '../../lib/API';
import { RootState } from '../reducers/index';

export { SelectEffect, PutEffect };

export default function* sendSMSSaga() {
  const { register } = yield select((store: RootState) => store.userEntry);
  if (register.phone.value && register.phone.validateStatus !== 'error') {
    sendSMS(register.phone.value);
  }
}

async function sendSMS(phone: string) {
  const result = await request({
    endpoint: '/v1/user/send_sms',
    method: 'POST',
    body: {
      phone,
    },
  });
  // if (result.httpStatusCode === 200) {
  // }
}

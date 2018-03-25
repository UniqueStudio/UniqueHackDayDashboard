import { takeEvery, ForkEffect, put } from 'redux-saga/effects';
import message from 'antd/es/message';
import { AnyAction } from 'redux';

export { ForkEffect };

export default function* errorTipSaga() {
  yield takeEvery('LOGIN_FAILED', (action: AnyAction) => {
    // yield put({ type: 'SET_LOGIN_ERROR', payload: action.payload });
    message.error(action.payload);
    // yield new Promise((resolve))
  });

  yield takeEvery('REGISTER_FAILED', (action: AnyAction) => {
    // message.error(action.payload);
  });

  yield takeEvery('SMS_FAILED', (action: AnyAction) => {
    // message.error(action.payload);
  });
}

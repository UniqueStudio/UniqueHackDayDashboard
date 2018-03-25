import { takeEvery, ForkEffect, put, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import delay from '../../lib/delay';

export { ForkEffect };

export default function* errorTipSaga() {
  yield takeLatest('LOGIN_FAILED', function*(action: AnyAction) {
    yield put({ type: 'SET_LOGIN_ERROR', payload: `登录失败：${action.payload}` });
    yield delay(10000);
    yield put({ type: 'CLEAR_LOGIN_ERROR' });
  });

  yield takeEvery('REGISTER_FAILED', function*(action: AnyAction) {
    yield put({ type: 'SET_REGISTER_ERROR', payload: `注册失败：${action.payload}` });
    yield delay(10000);
    yield put({ type: 'CLEAR_REGISTER_ERROR' });
  });

  yield takeEvery('SMS_FAILED', function*(action: AnyAction) {
    yield put({ type: 'SET_REGISTER_ERROR', payload: `发送短信失败：${action.payload}` });
    yield delay(10000);
    yield put({ type: 'CLEAR_REGISTER_ERROR' });
  });
}

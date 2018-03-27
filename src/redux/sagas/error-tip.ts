import { takeEvery, ForkEffect, put } from 'redux-saga/effects';
import { AnyAction } from 'redux';

export { ForkEffect };

export default function* errorTipSaga() {
  yield takeEvery('LOGIN_FAILED', function*(action: AnyAction) {
    yield put({ type: 'SET_LOGIN_ERROR', payload: `登录失败：${action.payload}` });
  });

  yield takeEvery('REGISTER_FAILED', function*(action: AnyAction) {
    yield put({ type: 'SET_REGISTER_ERROR', payload: `注册失败：${action.payload}` });
  });

  yield takeEvery('REGISTER_SMS_FAILED', function*(action: AnyAction) {
    yield put({ type: 'SET_REGISTER_ERROR', payload: `发送短信失败：${action.payload}` });
  });

  yield takeEvery('RESET_PWD_SMS_FAILED', function*(action: AnyAction) {
    yield put({ type: 'SET_RESET_PWD_ERROR', payload: `发送短信失败：${action.payload}` });
  });
}

import { takeLatest, put, call, select } from 'redux-saga/effects';
import { AnyAction } from 'redux';

import * as TYPE from '../actions';
import * as req from '../../lib/requests';
import { RootState } from '../reducers/index';
import { LoginData } from '../reducers/login';
import { RegisterData } from '../reducers/register';

export default function*() {
  // load user infomation
  yield takeLatest(TYPE.LOAD_USER_INFO._, function*() {
    yield put({ type: TYPE.LOAD_USER_INFO.START });
    const [userInfo] = yield call(req.getUserInfo);
    if (userInfo) {
      yield put({ type: TYPE.LOAD_USER_INFO.OK, payload: userInfo });
      return;
    }
    yield put({ type: TYPE.LOAD_USER_INFO.FAIL });
  });

  // submit login form
  type LoginReturnType = [string, undefined] | [null, string];
  yield takeLatest(TYPE.LOGIN_FORM_SUBMIT._, function*(action: AnyAction) {
    yield put({ type: TYPE.LOGIN_FORM_SUBMIT.START });
    const login: LoginData = yield select((state: RootState) => state.login);
    const [token, message]: LoginReturnType = yield call(
      req.login,
      login.username.value,
      login.password.value,
      action.payload,
    );
    if (token) {
      yield put({ type: TYPE.LOGIN_FORM_SUBMIT.OK, payload: token });
      return;
    }
    yield put({ type: TYPE.LOGIN_FORM_SUBMIT.FAIL, payload: message });
  });

  // submit register form
  type RegReturnType = [string, undefined] | [null, string];
  yield takeLatest(TYPE.REGISTER_FORM_SUBMIT._, function*(action: AnyAction) {
    yield put({ type: TYPE.REGISTER_FORM_SUBMIT.START });
    const login: RegisterData = yield select((state: RootState) => state.register);
    const [token, message]: RegReturnType = yield call(
      req.register,
      login.username.value,
      login.password.value,
      login.phone.value,
      login.code.value,
      action.payload, // antiRobotToken
    );
    if (token) {
      yield put({ type: TYPE.REGISTER_FORM_SUBMIT.OK, payload: token });
      return;
    }
    yield put({ type: TYPE.REGISTER_FORM_SUBMIT.FAIL, payload: message });
  });
}

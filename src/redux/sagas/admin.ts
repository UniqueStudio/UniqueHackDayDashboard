import Message from 'antd/es/message';
import { RootState } from './../reducers/index';
import { take, put, select, takeLatest, call, fork } from 'redux-saga/effects';
import * as TYPE from '../../redux/actions';
import * as req from '../../lib/requests';

export function* userStateChnage() {
  while (true) {
    const { username, state } = yield take(TYPE.ADMIN_USER_STATUS_CHANGE._);
    const userStatusList = yield select((root: RootState) => root.admin.userState.value);
    let flag = 1;
    const newList = userStatusList.map((user: { username: string; state: number }) => {
      if (user.username === username) {
        user.state = state;
        flag = 0;
      }
      return user;
    });
    if (flag) {
      newList.push({ username, state });
    }
    yield put({ type: TYPE.ADMIN_USER_STATUS_CHANGE.OK, payload: newList });
  }
}

export function* stateChangeSubmit() {
  yield takeLatest(TYPE.ADMIN_USER_SUBMIT._, function*() {
    const stateList = yield select((state: RootState) => state.admin.userState.value);
    yield put({ type: TYPE.ADMIN_USER_SUBMIT.START });
    const [ok, message] = yield call(req.adminUserStateChange, stateList);
    if (ok) {
      yield put({ type: TYPE.ADMIN_USER_SUBMIT.OK });
      Message.success('操作成功');
      yield put({ type: TYPE.ADMIN_TEAMS_INFO._ });
      // use fail to clear the arr
      yield put({ type: TYPE.ADMIN_USER_STATUS_CHANGE.FAIL });
    } else {
      yield put({ type: TYPE.ADMIN_USER_SUBMIT.FAIL, payload: message });
      Message.error(message);
    }
  });
}

export default function* admin() {
  yield fork(userStateChnage);
  yield fork(stateChangeSubmit);
}

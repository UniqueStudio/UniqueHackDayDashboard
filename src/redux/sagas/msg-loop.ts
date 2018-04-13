import { take, select, race, call, put } from 'redux-saga/effects';
import * as TYPE from '../actions';
import { RootState } from '../reducers/index';
import { msgPoll } from '../../lib/requests';

function* loop() {
  while (true) {
    const loggedIn = yield select((state: RootState) => state.auth.loggedIn);
    if (!loggedIn) {
      yield take(TYPE.SET_LOGGED_IN);
    }
    const [messages] = yield call(msgPoll);
    yield put({ type: TYPE.GET_UNREAD_MSG_ALL._, payload: messages });
  }
}
/**
 * This is a generator function / saga for
 * loop polling of message
 */
export default function* messageLoop() {
  yield take(TYPE.SET_LOGGED_IN);
  while (true) {
    yield take(TYPE.START_MSG_LOOP);
    yield race({
      stop: take([TYPE.STOP_MSG_LOOP, TYPE.SET_NOT_LOGGED_IN]),
      poll: call(loop),
    });
  }
}

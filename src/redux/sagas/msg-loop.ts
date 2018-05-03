import { take, select, race, call, put } from 'redux-saga/effects';
import * as TYPE from '../actions';
import { RootState } from '../reducers/index';
import { msgPoll } from '../../lib/requests';
import throttle from 'lodash-es/throttle';
import { delay } from 'redux-saga';

const throttledMsgPoll = throttle(msgPoll, 9 * 1000);

function* loop() {
  while (true) {
    const loggedIn = yield select((state: RootState) => state.auth.loggedIn);
    if (!loggedIn) {
      yield take(TYPE.SET_LOGGED_IN);
    }
    // force it runs in different call-stack
    yield delay(0);
    const [messages] = yield call(throttledMsgPoll);
    if (messages && messages.length > 0) {
      yield put({ type: TYPE.GET_UNREAD_MSG_ALL.OK, payload: messages });
      if (messages[0] && messages[0].type === 'Accepted') {
        yield put({ type: TYPE.MSG_USER_ACCEPTED });
      }
      if (messages[0] && messages[0].type === 'Rejected') {
        yield put({ type: TYPE.MSG_USER_REJECTED });
      }
      if (messages[0] && messages[0].type === 'OtherMessage') {
        window.location.reload();
      }
    }
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

import { take } from 'redux-saga/effects';
import * as TYPE from '../actions';
import Message from 'antd/es/message';

export default function* errorTip() {
  yield take(TYPE.SET_LOGGED_IN);
  while (true) {
    let types;
    const { payload: msg } = yield take(
      (types = [
        TYPE.DELETE_TEAM.FAIL,
        TYPE.DELETE_TEAM_MEMBER.FAIL,
        TYPE.EXIT_TEAM.FAIL,
        TYPE.CHANGE_TEAM_LEADER.FAIL,
      ]),
    );
    Message.error(msg);
  }
}

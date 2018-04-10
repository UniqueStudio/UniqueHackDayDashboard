import { take, select, call, put } from 'redux-saga/effects';
import delay from '../../lib/delay';
import * as USER from '../actions';

export default function* entryFlow() {
  while (true) {
    yield take(USER.LOAD_USER_INFO._);
    // yield put({ type: USER.LOAD_USER_INFO_START });
  }
}

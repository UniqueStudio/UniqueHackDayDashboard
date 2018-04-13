import { take, put } from 'redux-saga/effects';
import * as TYPE from '../actions';
import { replace } from 'react-router-redux';

/**
 * This is a generator function / saga for
 * auth route control flow.
 */
export default function* authRoute() {
  while (true) {
    yield take(TYPE.SET_LOGGED_IN);
    yield put(replace('/'));
    yield take(TYPE.SET_NOT_LOGGED_IN);
    yield put(replace('/user_entry'));
  }
}

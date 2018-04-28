import { take, put, fork, select, takeEvery, all } from 'redux-saga/effects';
import * as TYPE from '../actions';
import { delay } from 'redux-saga';
import { RootState } from '../reducers/index';
import { replace } from 'react-router-redux';
/**
 * This is a generator function / saga for user entry flow.
 */
export default function* entryFlow() {
  while (true) {
    yield take(TYPE.LOAD_USER_INFO._);
    yield take(TYPE.LOAD_USER_INFO.START);
    const { type: loadUserInfoType, payload: loadUserInfoPayload } = yield take([
      TYPE.LOAD_USER_INFO.OK,
      TYPE.LOAD_USER_INFO.FAIL,
    ]);

    if (loadUserInfoType === TYPE.LOAD_USER_INFO.OK) {
      yield put({ type: TYPE.SET_USER_INFO, payload: loadUserInfoPayload });
      /**
       * After load user info successfully, try to load team
       * info and load detail form and load message
       */
      yield fork(function*() {
        if ('number' === typeof (yield select((state: RootState) => state.user.teamId))) {
          yield put({ type: TYPE.LOAD_TEAM_INFO._ });
        }
        if (true === (yield select((state: RootState) => state.user.isDetailFormSubmitted))) {
          yield put({ type: TYPE.GET_USER_DETAIL._ });
        }
        if (true === (yield select((state: RootState) => state.user.permission !== 0))) {
          yield put({ type: TYPE.ADMIN_TEAMS_INFO._ });
        }
        yield put({ type: TYPE.GET_UNREAD_MSG_ALL._ });
        yield take(TYPE.GET_UNREAD_MSG_ALL.START);
        yield take([TYPE.GET_UNREAD_MSG_ALL.OK, TYPE.GET_UNREAD_MSG_ALL.FAIL]);
        yield put({ type: TYPE.GET_MSG_ALL._ });
      });
    } else {
      /**
       * Failed to load user info, assuming it is because of
       * login/register process is not fulfilled.
       * Show App view for user to do login/register operations.
       */
      yield put({ type: TYPE.SHOW_APP_VIEW });
      while (true) {
        /**
         * It will continue when user click login or register on UI.
         * We start login/register process and wait it to resolve.
         */
        const LOGIN_OR_REG = [TYPE.LOGIN_FORM_SUBMIT._, TYPE.REGISTER_FORM_SUBMIT._];
        if ((yield take(LOGIN_OR_REG)).type === LOGIN_OR_REG[0 /* 0 is login */]) {
          yield take(TYPE.LOGIN_FORM_SUBMIT.START);
          /**
           * Waiting for resolve.
           */
          const { type: loginSubmitType } = yield take([
            TYPE.LOGIN_FORM_SUBMIT.OK,
            TYPE.LOGIN_FORM_SUBMIT.FAIL,
          ]);
          if (loginSubmitType === TYPE.LOGIN_FORM_SUBMIT.OK) {
            /**
             * Success. Save token in sessionStorage by default.
             * Break for putting SET_LOGGED_IN.
             */
            break;
          }
        } else {
          yield take(TYPE.REGISTER_FORM_SUBMIT.START);
          const { type: registerSubmitType } = yield take([
            TYPE.REGISTER_FORM_SUBMIT.OK,
            TYPE.REGISTER_FORM_SUBMIT.FAIL,
          ]);
          if (registerSubmitType === TYPE.REGISTER_FORM_SUBMIT.OK) {
            break;
          }
        }
      }
      /**
       * Only successfully pass login/register process
       * can user jump out the loop.
       */
      yield fork(function*() {
        yield delay(0);
        /**
         * Put this action in next event loop to be taken
         * by this `while(true) {...}`
         */
        yield put({ type: TYPE.LOAD_USER_INFO._ });
      });
      continue;
    }
    yield put({ type: 'SET_LOGGED_IN' });
    yield put({ type: TYPE.SHOW_APP_VIEW });

    /**
     * Watch user operations like clear msg
     */
    yield takeEvery(TYPE.SET_MSG_READ_ALL, function*() {
      const { msgData: { unreadMessages } } = yield select();
      yield all(
        unreadMessages.map((msg: API.Message.SingleMessage) =>
          put({ type: TYPE.SET_MSG_READ._, payload: msg.id }),
        ),
      );
    });
    yield takeEvery(TYPE.DELETE_MSG_ALL, function*() {
      const { msgData: { unreadMessages, readMessages } } = yield select();
      yield all(
        [...unreadMessages, ...readMessages].map((msg: API.Message.SingleMessage) =>
          put({ type: TYPE.DELETE_MSG._, payload: msg.id }),
        ),
      );
    });
    yield takeEvery([TYPE.JOIN_TEAM_FORM_SUBMIT.OK, TYPE.NEW_TEAM_FORM_SUBMIT.OK], function*() {
      /**
       * This takeEvery can not be replaced by reducers.
       * Keep it for better-readable code.
       */
      yield put({ type: TYPE.LOAD_TEAM_INFO._ });
    });

    /**
     * TODO: more operations handler
     */

    yield put({ type: TYPE.START_MSG_LOOP });

    /**
     * User now fully get into Console view.
     * We wait user to click logout to do clear job.
     */
    yield take('LOGOUT_CLICKED');

    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    yield put({ type: TYPE.SET_NOT_LOGGED_IN });
    yield put(replace('/user_entry'));
    window.location.reload();
  }
}

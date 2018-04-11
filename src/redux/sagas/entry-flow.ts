import { take, put } from 'redux-saga/effects';
import * as TYPE from '../actions';

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
          if (registerSubmitType === TYPE.LOGIN_FORM_SUBMIT.OK) {
            break;
          }
        }
      }
      /**
       * Only successfully pass login/register process
       * can user jump out the loop.
       */
    }
    yield put({ type: 'SET_LOGGED_IN' });
    yield put({ type: TYPE.SHOW_APP_VIEW });

    /**
     * User now fully get into Console view.
     * We wait user to click logout to do clear job.
     */
    yield take('LOGOUT_CLICK');
    // TODO: do clear job
  }
}

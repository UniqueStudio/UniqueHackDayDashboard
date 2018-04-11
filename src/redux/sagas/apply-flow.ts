import { take, put, fork, select, takeEvery } from 'redux-saga/effects';
import * as TYPE from '../actions';
import { RootState } from '../reducers/index';
import { replace } from 'react-router-redux';
import { AnyAction } from 'redux';
/**
 * This is a generator function / saga for user entry flow.
 */
export default function* applyFlow() {
  yield take(TYPE.SET_LOGGED_IN);
  while (true) {
    /**
     * Only when ApplyView is mounted can this
     * action be dispatched.
     */
    yield take(TYPE.APPLY_PROCESS_START);
    /**
     * This forked saga mainly used to set
     * max-step state.
     */
    yield fork(function*() {
      const type = TYPE.APPLY_PROCESS_SET_MAX_STEP;
      yield put({ type, payload: 0 });
      yield take(TYPE.APPLY_PROCESS_IS_D);
      yield put({ type, payload: 1 });
      yield take(TYPE.APPLY_PROCESS_IS_T);
      yield put({ type, payload: 2 });
      yield take(TYPE.APPLY_PROCESS_IS_C);
      yield put({ type, payload: 3 });
      yield take(TYPE.APPLY_PROCESS_END);
    });

    // prettier-ignore
    yield fork(function*() {
      const type = TYPE.APPLY_PROCESS_SET_CURRENT;

      yield takeEvery(TYPE.DETAIL_FORM_SUBMIT.OK, function*() {
        yield put({ type, payload: 1 });
      });
      yield takeEvery([TYPE.NEW_TEAM_FORM_SUBMIT.OK, TYPE.JOIN_TEAM_FORM_SUBMIT.OK, TYPE.CHANGE_IS_T_SUBMIT.OK], function*() {
        yield put({ type, payload: 2 });
      });
      yield takeEvery(TYPE.APPLY_CONFIRM_SUBMIT.OK, function*() {
        yield put({ type, payload: 3 });
      });
    });

    /**
     * Everytime teamForm submitted, try
     * to load team info.
     */
    yield takeEvery([TYPE.NEW_TEAM_FORM_SUBMIT.OK, TYPE.JOIN_TEAM_FORM_SUBMIT.OK], function*({
      payload,
    }: AnyAction) {
      yield put({ type: TYPE.SET_USER_INFO, payload: { teamId: payload } });
      yield put({ type: TYPE.LOAD_TEAM_INFO._ });
    });

    /**
     * This is a fork effect that run async with
     * main `while(true) {...}` . But it will put
     * APPLY_PROCESS_END action once apply ends.
     * This will directly resolve this while loop
     * and make this flow ready for next `START`.
     */
    yield fork(function*() {
      let action;

      action = yield take([TYPE.DETAIL_FORM_SUBMIT.OK, TYPE.APPLY_PROCESS_IS_D]);
      if (action.type === TYPE.DETAIL_FORM_SUBMIT.OK) {
        yield put({ type: TYPE.APPLY_PROCESS_IS_D });
      }

      /**
       * Three types of form submit will change the process,
       * we watch them and do something after them.
       */
      action = yield take([
        TYPE.NEW_TEAM_FORM_SUBMIT.OK,
        TYPE.JOIN_TEAM_FORM_SUBMIT.OK,
        TYPE.CHANGE_IS_T_SUBMIT.OK,
        TYPE.APPLY_PROCESS_IS_T,
      ]);
      if (action.type !== TYPE.APPLY_PROCESS_IS_T) {
        if (action.type !== TYPE.CHANGE_IS_T_SUBMIT.OK) {
          /**
           * Loop until `isTeamFormSubmitted` is set to `true`.
           */
          while (true) {
            yield put({ type: TYPE.CHANGE_IS_T_SUBMIT._ });
            yield take(TYPE.CHANGE_IS_T_SUBMIT.START);
            const { type } = yield take([TYPE.CHANGE_IS_T_SUBMIT.OK, TYPE.CHANGE_IS_T_SUBMIT.FAIL]);
            if (type === TYPE.CHANGE_IS_T_SUBMIT.OK) {
              break;
            }
          }
        }
        yield put({ type: TYPE.SET_USER_INFO, payload: { isTeamFormSubmitted: true } });
        yield put({ type: TYPE.APPLY_PROCESS_IS_T });
      }

      action = yield take([TYPE.APPLY_CONFIRM_SUBMIT.OK, TYPE.APPLY_PROCESS_IS_C]);
      if (action.type === TYPE.APPLY_CONFIRM_SUBMIT.OK) {
        yield put({ type: TYPE.APPLY_PROCESS_IS_C });
      }
    });

    const user: API.User.UserInfo = yield select((state: RootState) => state.user);
    const { isDetailFormSubmitted, isTeamFormSubmitted, isApplyConfirmed } = user;
    if (isDetailFormSubmitted) {
      yield put({ type: TYPE.APPLY_PROCESS_IS_D });
    }
    if (isTeamFormSubmitted) {
      yield put({ type: TYPE.APPLY_PROCESS_IS_T });
    }
    if (isApplyConfirmed) {
      yield put({ type: TYPE.APPLY_PROCESS_IS_C });
    }

    /**
     * Waiting for fork effect to put APPLY_PROCESS_END.
     */
    yield take(TYPE.APPLY_PROCESS_END);
    yield put(replace('/'));
  }
}

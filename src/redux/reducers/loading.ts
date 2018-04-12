import { AnyAction } from 'redux';
import * as TYPE from '../actions';

export default function loadingCount(state: number = 0, action: AnyAction) {
  switch (action.type) {
    case TYPE.LOAD_USER_INFO.START:
      return ++state;
    case TYPE.LOAD_USER_INFO.OK:
      return --state;
    case TYPE.LOAD_USER_INFO.FAIL:
      return --state;

    case TYPE.LOAD_TEAM_INFO.START:
      return ++state;
    case TYPE.LOAD_TEAM_INFO.OK:
      return --state;
    case TYPE.LOAD_TEAM_INFO.FAIL:
      return --state;

    case TYPE.GET_USER_DETAIL.START:
      return ++state;
    case TYPE.GET_USER_DETAIL.OK:
      return --state;
    case TYPE.GET_USER_DETAIL.FAIL:
      return --state;

    default:
      return state;
  }
}

import * as TYPE from '../actions';

export type PartialUserInfo = Partial<API.User.UserInfo>;
export default function auth(
  state: PartialUserInfo = {},
  action: { type: string; payload?: PartialUserInfo },
) {
  switch (action.type) {
    case TYPE.SET_USER_INFO:
      return {
        ...state,
        ...(action.payload || {}),
      };
    // case TYPE.LOAD:

    case TYPE.JOIN_TEAM_FORM_SUBMIT.OK:
    case TYPE.NEW_TEAM_FORM_SUBMIT.OK:
      return {
        ...state,
        teamId: action.payload,
      };

    case TYPE.EXIT_TEAM.OK:
    case TYPE.DELETE_TEAM.OK:
      return {
        ...state,
        teamId: null,
      };
    default:
      return state;
  }
}

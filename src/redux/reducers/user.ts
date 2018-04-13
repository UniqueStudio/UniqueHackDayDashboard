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
    default:
      return state;
  }
}

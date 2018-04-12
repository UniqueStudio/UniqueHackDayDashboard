export type PartialUserInfo = Partial<API.User.UserInfo>;
export default function auth(
  state: PartialUserInfo = {},
  action: { type: string; payload?: PartialUserInfo },
) {
  switch (action.type) {
    case 'SET_USER_INFO':
      return {
        ...state,
        ...(action.payload || {}),
      };
    default:
      return state;
  }
}

export type UserData = Partial<API.User.UserData>;

export default function auth(state: UserData = {}, action: { type: string; payload?: UserData }) {
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

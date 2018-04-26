import { AnyAction } from 'redux';

export interface AuthData {
  loggedIn: boolean;
  token: string | null;
}

export default function auth(
  state: AuthData = {
    loggedIn: false,
    token: null,
  },
  action: AnyAction,
) {
  switch (action.type) {
    case 'SET_LOGGED_IN':
      return {
        loggedIn: true,
      };
    case 'SET_NOT_LOGGED_IN':
      return {
        loggedIn: false,
      };

    case 'SET_TOKEN':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
}

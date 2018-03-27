import { AnyAction } from 'redux';

export interface AuthData {
  loggedIn: boolean;
}

export default function auth(
  state: AuthData = {
    loggedIn: false,
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
    default:
      return state;
  }
}

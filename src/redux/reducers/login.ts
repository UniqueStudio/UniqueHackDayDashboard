import { AnyAction } from 'redux';

export interface LoginData {
  username: any;
  password: any;
  autoLogin: any;
}

export default function login(
  state: LoginData = {
    username: {},
    password: {},
    autoLogin: { value: true },
  },
  action: AnyAction,
) {
  switch (action.type) {
    case 'LOGIN_FORM_CHANGE':
      return {
        ...state,
        ...action.payload,
      };
    case 'CLEAR_LOGIN':
      return {
        username: {},
        password: {},
        autoLogin: { value: true },
      };
    default:
      return state;
  }
}

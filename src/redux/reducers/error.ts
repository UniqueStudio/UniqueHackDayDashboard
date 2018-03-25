import { AnyAction } from 'redux';

export interface ErrorStatus {
  loginError: boolean;
  registerError: boolean;
  smsError: boolean;
}

export default function loadingStatus(
  state: ErrorStatus = {
    loginError: false,
    registerError: false,
    smsError: false,
  },
  action: AnyAction,
) {
  switch (action.type) {
    case 'SET_LOGIN_ERROR':
      return {
        ...state,
        loginError: action.payload,
      };
    case 'CLEAR_LOGIN_ERROR':
      return {
        ...state,
        loginError: '',
      };
    default:
      return state;
  }
}

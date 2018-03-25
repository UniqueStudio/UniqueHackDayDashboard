import { AnyAction } from 'redux';

export interface LoadingStatus {
  loginLoading: boolean;
  registerLoading: boolean;
  smsLoading: boolean;
}

export default function loadingStatus(
  state: LoadingStatus = {
    loginLoading: false,
    registerLoading: false,
    smsLoading: false,
  },
  action: AnyAction,
) {
  switch (action.type) {
    case 'LOGIN_LOADING_START':
      return {
        ...state,
        loginLoading: true,
      };
    case 'LOGIN_LOADING_END':
      return {
        ...state,
        loginLoading: false,
      };
    case 'REGISTER_LOADING_START':
      return {
        ...state,
        registerLoading: true,
      };
    case 'REGISTER_LOADING_END':
      return {
        ...state,
        registerLoading: false,
      };
    default:
      return state;
  }
}

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
  const [_, type, op] = action.type.match(/^([A-Z]+)_LOADING_(START|END)$/) || new Array(3);

  if (op && type) {
    return {
      ...state,
      [`${type.toLowerCase()}Loading`]: op === 'START',
    };
  }
  return state;
}

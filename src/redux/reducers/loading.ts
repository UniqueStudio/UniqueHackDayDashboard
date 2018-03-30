import { AnyAction } from 'redux';

export interface LoadingStatus {
  loginLoading: boolean;
  registerLoading: boolean;
  resetPwdSMSLoading: boolean;
  registerSMSLoading: boolean;

  loginStatusLoading: boolean;
}

export default function loadingStatus(
  state: LoadingStatus = {
    loginLoading: false,
    registerLoading: false,
    resetPwdSMSLoading: false,
    registerSMSLoading: false,

    loginStatusLoading: false,
  },
  action: AnyAction,
) {
  const regexp = /^([A-Z_]+?)_(SMS_)?(LOAD|SUBMIT)_(START|END)$/;
  const [, type, isSMS, tag, op] = action.type.match(regexp) || new Array(5);

  if (op && type) {
    return {
      ...state,
      [`${type.toLowerCase().replace(/_[a-z]/g, (e: string) => e[1].toUpperCase())}${
        isSMS ? 'SMS' : ''
      }${tag === 'LOAD' ? 'Loading' : 'Submitting'}`]:
        op === 'START',
    };
  }
  return state;
}

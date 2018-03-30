import { AnyAction } from 'redux';

export interface LoadingStatus {
  loginSubmitting: boolean;
  registerSubmitting: boolean;
  resetPwdSMSSubmitting: boolean;
  registerSMSSubmitting: boolean;

  loginStatusLoading: boolean;
}

export default function loadingStatus(
  state: LoadingStatus = {
    loginSubmitting: false,
    registerSubmitting: false,
    resetPwdSMSSubmitting: false,
    registerSMSSubmitting: false,

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

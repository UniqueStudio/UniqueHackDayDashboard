import { AnyAction } from 'redux';

export interface ResetPwdData {
  phone: any;
  code: any;
  password: any;
}

export default function resetPwd(
  state: ResetPwdData = {
    password: {},
    code: {},
    phone: {},
  },
  action: AnyAction,
) {
  switch (action.type) {
    case 'RESET_PWD_FORM_CHANGE':
      return {
        ...state,
        ...action.payload,
      };
    case 'CLEAR_RESET_PWD':
      return {
        password: {},
        code: {},
        phone: {},
      };
    default:
      return state;
  }
}

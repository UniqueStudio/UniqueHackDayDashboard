import { AnyAction } from 'redux';

export interface RegisterData {
  username: any;
  password: any;
  phone: any;
  code: any;
}

export default function register(
  state: RegisterData = {
    username: {},
    password: {},
    phone: {},
    code: {},
  },
  action: AnyAction,
) {
  switch (action.type) {
    case 'REGISTER_FORM_CHANGE':
      return {
        ...state,
        ...action.payload,
      };
    case 'CLEAR_REGISTER':
      return {
        username: {},
        password: {},
        phone: {},
        code: {},
      };
    default:
      return state;
  }
}

import { AnyAction } from 'redux';

export interface RegisterData {
  username: string;
  password: string;
  phone: string;
  code: string;
}

export default function register(
  state: RegisterData = {
    username: '',
    password: '',
    phone: '',
    code: '',
  },
  action: AnyAction,
) {
  switch (action.type) {
    case 'REGISTER_FORM_CHANGE':
      return {
        ...state,
        ...action,
      };
    default:
      return state;
  }
}

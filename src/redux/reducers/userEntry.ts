import { AnyAction } from 'redux';

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;
export interface UserEntrySingleData<T = string> {
  value?: T;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  help?: string;
}

export interface UserEntryData {
  login: {
    username: UserEntrySingleData;
    password: UserEntrySingleData;
    autoLogin: { value: boolean };
  };

  register: {
    username: UserEntrySingleData;
    // email: UserEntrySingleData;
    phone: UserEntrySingleData;
    password: UserEntrySingleData;
    code: UserEntrySingleData;
    // rePassword: UserEntrySingleData;
  };

  tab: { value: 'login' | 'register' };

  status: {
    smsButtonEnabled: boolean;
  };
}

export default function userEntry(
  state: UserEntryData = {
    login: {
      username: {},
      password: {},
      autoLogin: { value: true },
    },

    register: {
      username: {},
      phone: {},
      // email: {},
      password: {},
      code: {},
      // rePassword: {},
    },

    tab: { value: 'login' },

    status: {
      smsButtonEnabled: false,
    },
  },
  action: AnyAction,
): UserEntryData {
  if (action.type === 'LOGIN_FORM_CHANGE') {
    const { fieldName, changedTo } = action.payload;
    return {
      ...state,
      login: {
        ...state.login,
        [fieldName]: {
          value: changedTo,
        },
      },
    };
  }

  if (action.type === 'REGISTER_FORM_CHANGE') {
    const { fieldName, changedTo } = action.payload;
    return {
      ...state,
      register: {
        ...state.register,
        [fieldName]: {
          value: changedTo,
        },
      },
    };
  }

  if (action.type === 'CHANGE_USER_ENTRY_TAB') {
    return {
      ...state,
      tab: { value: action.payload },
    };
  }

  if (action.type === 'LOGIN_FORM_TIP_CHANGE') {
    const { fieldName, validateStatus, help } = action.payload;
    return {
      ...state,
      login: {
        ...state.login,
        [fieldName]: {
          ...(state.login as any)[fieldName],
          validateStatus,
          help,
        },
      },
    };
  }

  if (action.type === 'REGISTER_FORM_TIP_CHANGE') {
    const { fieldName, validateStatus, help } = action.payload;
    return {
      ...state,
      register: {
        ...state.register,
        [fieldName]: {
          ...(state.register as any)[fieldName],
          validateStatus,
          help,
        },
      },
    };
  }

  if (action.type === 'SMS_BUTTON_ENABLE') {
    return {
      ...state,
      status: {
        ...state.status,
        smsButtonEnabled: true,
      },
    };
  }

  if (action.type === 'SMS_BUTTON_DISABLE') {
    return {
      ...state,
      status: {
        ...state.status,
        smsButtonEnabled: false,
      },
    };
  }

  // if (action.type === 'USER_ENTRY_VALIDATE_ALL_LOGIN') {

  // }

  // if (action.type === 'LOGIN_VALIDATE_ALL') {

  // }
  return state;
}

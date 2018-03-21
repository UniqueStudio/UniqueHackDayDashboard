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
    loginButtonEnabled: boolean;
    registerButtonEnabled: boolean;

    loginButtonLoading: boolean;
    registerButtonLoading: boolean;
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
      loginButtonEnabled: false,
      registerButtonEnabled: false,

      loginButtonLoading: false,
      registerButtonLoading: false,
    },
  },
  action: AnyAction,
): UserEntryData {
  if (action.type === 'LOGIN_FORM_CHANGE') {
    const { fieldName, changedTo } = action.payload;
    if (changedTo === undefined) {
      return state;
    }
    return {
      ...state,
      login: {
        ...state.login,
        [fieldName]: {
          ...(state.login as any)[fieldName],
          value: changedTo,
        },
      },
    };
  }

  if (action.type === 'REGISTER_FORM_CHANGE') {
    const { fieldName, changedTo } = action.payload;
    if (changedTo === undefined) {
      return state;
    }
    return {
      ...state,
      register: {
        ...state.register,
        [fieldName]: {
          ...(state.register as any)[fieldName],
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
    if (!fieldName) {
      return state;
    }
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
    if (!fieldName) {
      return state;
    }
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

  if (action.type === 'LOGIN_AUTO_LOGIN_CHANGE') {
    return {
      ...state,
      login: {
        ...state.login,
        autoLogin: { value: action.payload },
      },
    };
  }

  if (action.type === 'LOGIN_BUTTON_ENABLE') {
    return {
      ...state,
      status: {
        ...state.status,
        loginButtonEnabled: true,
      },
    };
  }
  if (action.type === 'LOGIN_BUTTON_DISABLE') {
    return {
      ...state,
      status: {
        ...state.status,
        loginButtonEnabled: false,
      },
    };
  }

  if (action.type === 'REGISTER_BUTTON_ENABLE') {
    return {
      ...state,
      status: {
        ...state.status,
        registerButtonEnabled: true,
      },
    };
  }
  if (action.type === 'REGISTER_BUTTON_DISABLE') {
    return {
      ...state,
      status: {
        ...state.status,
        registerButtonEnabled: false,
      },
    };
  }

  if (action.type === 'LOGIN_BUTTON_LOADING') {
    return {
      ...state,
      status: {
        ...state.status,
        loginButtonLoading: action.payload,
      },
    };
  }

  if (action.type === 'REGISTER_BUTTON_LOADING') {
    return {
      ...state,
      status: {
        ...state.status,
        registerButtonLoading: action.payload,
      },
    };
  }

  return state;
}

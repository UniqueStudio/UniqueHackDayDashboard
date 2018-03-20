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
    email: UserEntrySingleData;
    password: UserEntrySingleData;
    rePassword: UserEntrySingleData;
  };

  tab: { value: 'login' | 'register' };
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
      email: {},
      password: {},
      rePassword: {},
    },

    tab: { value: 'login' },
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

  // if (action.type === 'USER_ENTRY_VALIDATE_ALL_LOGIN') {

  // }
  return state;
}

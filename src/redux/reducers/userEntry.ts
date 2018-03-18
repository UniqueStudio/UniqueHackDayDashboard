import { AnyAction } from 'redux';
export interface UserEntrySingleData<T = string> {
  value?: T;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  help?: string;
}

export interface UserEntryData {
  username: UserEntrySingleData;
  password: UserEntrySingleData;
  autoLogin: UserEntrySingleData<boolean>;

  regUsername: UserEntrySingleData;
  regEmail: UserEntrySingleData;
  regPassword: UserEntrySingleData;
  regRePassword: UserEntrySingleData;

  // [key: string]: UserEntrySingleData<boolean | string>;

  tab: 'login' | 'register';
}

export default function userEntry(
  state: UserEntryData = {
    username: { value: '11111', validateStatus: 'error', help: 'gegee' },
    password: {},
    autoLogin: { value: true },
    regUsername: {},
    regEmail: {},
    regPassword: {},
    regRePassword: {},

    tab: 'login',
  },
  action: AnyAction,
) {
  if (action.type === 'CHANGE_USER_ENTRY_DATA') {
    return {
      ...state,
      ...Object.keys(action.payload).reduce(
        (p, key) => ({
          ...p,
          [key]: { value: action.payload[key] },
        }),
        {},
      ),
    };
  }

  if (action.type === 'CHANGE_USER_ENTRY_TAB') {
    return {
      ...state,
      tab: action.payload,
    };
  }
  return state;
}

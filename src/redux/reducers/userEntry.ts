import { AnyAction } from 'redux';

export interface UserEntrySingleData<T = string> {
  value?: T;
  validateStatus?: 'success' | 'warning' | 'error' | 'validating';
  help?: string;
}

export interface UserEntryData {
  username: UserEntrySingleData;
  password: UserEntrySingleData;
  autoLogin: { value: boolean };

  regUsername: UserEntrySingleData;
  regEmail: UserEntrySingleData;
  regPassword: UserEntrySingleData;
  regRePassword: UserEntrySingleData;

  tab: { value: 'login' | 'register' };
}

const fieldsNamesMap = {
  username: '用户名',
  password: '密码',

  regUsername: '要注册的用户名',
  regPassword: '密码',
  regRePassword: '密码',
  regEmail: '要注册的邮件',
};

const fieldsMessagesMap = {
  username: '用户名必须是4～16位字母、数字或下划线组成字符串',
  password: '密码必须是6～16位字母、数字或特殊符号组成字符串',
  email: '邮箱不合法',
};

export const patterns = {
  username: /^[a-zA-Z0-9_-]{4,16}$/,
  password: /^(?:\d|[a-zA-Z]|[!@#$%^&*]){6,16}$/,
  email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
};

export default function userEntry(
  state: UserEntryData = {
    username: {},
    password: {},
    autoLogin: { value: true },
    regUsername: {},
    regEmail: {},
    regPassword: {},
    regRePassword: {},

    tab: { value: 'login' },
  },
  action: AnyAction,
) {
  if (action.type === 'CHANGE_USER_ENTRY_DATA') {
    const { fieldName, changedTo: value } = action.payload;
    const tip: UserEntrySingleData = { value };

    if (value === '') {
      tip.validateStatus = 'error';
      tip.help = `必须键入${(fieldsNamesMap as any)[fieldName]}`;
      return { ...state, [fieldName]: tip };
    } else {
      if (fieldName.toLowerCase().indexOf('username') >= 0) {
        if (!patterns.username.test(value)) {
          tip.validateStatus = 'error';
          tip.help = fieldsMessagesMap.username;
          return { ...state, [fieldName]: tip };
        }
      }
      if (fieldName.toLowerCase().indexOf('password') >= 0) {
        if (!patterns.password.test(value)) {
          tip.validateStatus = 'error';
          tip.help = fieldsMessagesMap.password;
          return { ...state, [fieldName]: tip };
        }
      }
      if (fieldName.toLowerCase().indexOf('email') >= 0) {
        if (!patterns.email.test(value)) {
          tip.validateStatus = 'error';
          tip.help = fieldsMessagesMap.email;
          return { ...state, [fieldName]: tip };
        }
      }

      const { regPassword, regRePassword } = state;
      if (fieldName === 'regRePassword') {
        if (regPassword.value !== value) {
          tip.validateStatus = 'error';
          tip.help = '两次密码输入不一致';
          return { ...state, [fieldName]: tip };
        }
      }

      if (fieldName === 'regPassword' && regRePassword.value) {
        tip.validateStatus = 'error';
        tip.help = '两次密码输入不一致';
        return {
          ...state,
          regRePassword: {
            ...(regRePassword.value !== value ? tip : {}),
            value: regRePassword.value,
          },
          regPassword: {
            value,
          },
        };
      }
      return { ...state, [fieldName]: tip };
    }
  }

  if (action.type === 'CHANGE_USER_ENTRY_TAB') {
    return {
      ...state,
      tab: { value: action.payload },
    };
  }

  if (action.type === 'CHANGE_USER_ENTRY_TIP') {
    return {
      ...state,
      [action.payload.fieldName]: {
        ...state[action.payload.fieldName as keyof UserEntryData],
        validateStatus: action.payload.validateStatus,
        help: action.payload.help,
      },
    };
  }
  return state;
}

import {
  select,
  put,
  all,
  SelectEffect,
  PutEffect,
  GenericAllEffect,
  AllEffect,
} from 'redux-saga/effects';

import { RootState, AnyAction } from '../reducers/index';
import request from '../../lib/API';
import { UserEntryData, UserEntrySingleData, Omit } from '../reducers/userEntry';

export { SelectEffect, PutEffect, GenericAllEffect, AllEffect };
type KeysToValidate =
  | keyof Omit<UserEntryData['login'], 'autoLogin'>
  | keyof UserEntryData['register'];

export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
const getUserEntry = (state: RootState) => state.userEntry;
const map = {
  username: ['username', '用户名'],
  email: ['email', '邮箱'],
  phone: ['phone', '手机号码'],
};

const fieldsNamesMap = {
  username: '用户名',
  password: '密码',
  // rePassword: '密码',
  email: '邮箱',
  phone: '手机号码',
  code: '短信验证码',
};

const fieldsMessagesMap = {
  username: '用户名必须是4～16位字母、数字或下划线组成字符串',
  password: '密码必须是6～16位字母、数字或特殊符号组成字符串',
  // rePassword: '密码必须是6～16位字母、数字或特殊符号组成字符串',
  email: '邮箱不合法',
  phone: '手机号码不合法',
  code: '短信验证码不合法',
};

export const patterns = {
  username: /^[a-zA-Z0-9_-]{4,16}$/,
  password: /^(?:\d|[a-zA-Z]|[!@#$%^&*]){6,16}$/,
  rePassword: /^(?:\d|[a-zA-Z]|[!@#$%^&*]){6,16}$/,
  email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
  phone: /^1(3|4|5|7|8)[0-9]\d{8}$/,
  code: /^[0-9]{6}$/,
};

function syncValidate(fieldName: KeysToValidate, data: UserEntrySingleData) {
  const { value } = data;
  if (!value) {
    return {
      validateStatus: 'error',
      help: `必须键入${fieldsNamesMap[fieldName]}`,
    };
  }
  if (!patterns[fieldName].test(value)) {
    return {
      validateStatus: 'error',
      help: fieldsMessagesMap[fieldName],
    };
  }
  return null;
}

async function asyncValidate(fieldName: KeysToValidate, data: UserEntrySingleData) {
  const { value } = data;
  if (fieldName === 'username' /* || fieldName === 'email' */ || fieldName === 'phone') {
    const result = (await request({
      endpoint: `/v1/user/existence?type=${fieldName}`,
      method: 'GET',
      body: { valueToCheck: value },
    } as any)) as any;
    if (result.httpStatusCode === 200) {
      if (result.data!.existence) {
        return {
          validateStatus: 'error',
          help: `${(map as any)[fieldName][1]}已存在`,
        };
      }
    } else if (result.httpStatusCode === 400) {
      if (result.message.indexOf('Invalid')) {
        return { validateStatus: 'error', help: fieldsMessagesMap[fieldName] };
      }
    }
    return { validateStatus: 'warning', help: '检测失败，暂时允许提交' };
  }

  return null;
}

function* loginValidate(action: AnyAction) {
  const { login } = yield select(getUserEntry);
  const { fieldName } = action.payload;

  const validateResult = syncValidate(fieldName as any, login[fieldName]);
  yield put({
    type: 'LOGIN_FORM_TIP_CHANGE',
    payload: {
      fieldName,
      ...validateResult,
    },
  });
}

function* registerValidate(action: AnyAction) {
  const { register } = yield select(getUserEntry);
  const { fieldName } = action.payload;

  // 常规校验
  const validateResult = syncValidate(fieldName as any, register[fieldName]);
  yield put({
    type: 'REGISTER_FORM_TIP_CHANGE',
    payload: {
      fieldName,
      ...validateResult,
    },
  });

  if (validateResult) {
    return;
  }

  if (fieldName !== 'username' && fieldName !== 'phone') {
    return;
  }

  yield delay(500);

  yield put({
    type: 'REGISTER_FORM_TIP_CHANGE',
    payload: {
      fieldName,
      validateStatus: 'validating',
      help: '正在检查是否存在重复...',
    },
  });

  yield delay(500);
  // 异步校验
  const result = yield asyncValidate(fieldName as any, register[fieldName]);
  yield put({
    type: 'REGISTER_FORM_TIP_CHANGE',
    payload: {
      fieldName,
      ...(result || { validateStatus: 'success' }),
    },
  });

  if (fieldName !== 'phone') {
    return;
  }
  if (!validateResult) {
    if (!result || result.validateStatus !== 'error') {
      yield put({ type: 'SMS_BUTTON_ENABLE' });
      return;
    }
  }
  yield put({ type: 'SMS_BUTTON_DISABLE' });
}

export default function validate(type: string) {
  if (type === 'login') {
    return loginValidate;
  }
  if (type === 'register') {
    return registerValidate;
  }
  return () => void 0;
}

export function* loginValidateAll() {
  yield all([
    loginValidate({ type: '', payload: { fieldName: 'username' } }),
    loginValidate({ type: '', payload: { fieldName: 'password' } }),
  ]);

  // FIXME: these code will not trigger fetch
  // const type = 'LOGIN_FORM_CHANGE';
  // yield all([
  //   put({ type, payload: { fieldName: 'username' } }),
  //   put({ type, payload: { fieldName: 'password' } }),
  // ]);
}

export function* registerValidateAll() {
  yield all([
    registerValidate({ type: '', payload: { fieldName: 'username' } }),
    registerValidate({ type: '', payload: { fieldName: 'password' } }),
    registerValidate({ type: '', payload: { fieldName: 'phone' } }),
    registerValidate({ type: '', payload: { fieldName: 'code' } }),
  ]);

  // FIXME: these code will not trigger fetch
  // const type = 'REGISTER_FORM_CHANGE';
  // yield put({ type, payload: { fieldName: 'username' } });
  // yield put({ type, payload: { fieldName: 'password' } });
  // yield put({ type, payload: { fieldName: 'phone' } });
  // yield put({ type, payload: { fieldName: 'code' } });
}

export function hasError(type: string) {
  let actionType: any;
  if (type === 'login') {
    actionType = ['LOGIN_BUTTON_ENABLE', 'LOGIN_BUTTON_DISABLE'];
  } else if (type === 'register') {
    actionType = ['REGISTER_BUTTON_ENABLE', 'REGISTER_BUTTON_DISABLE'];
  }
  return function*() {
    const userEntry = yield select(getUserEntry);
    const data = userEntry[type];
    const currentStatus = userEntry.status[`${type}ButtonEnabled`];
    for (const key in data) {
      if (key && data[key]) {
        const item = data[key];
        if (!item.value || item.validateStatus === 'error') {
          if (currentStatus) {
            yield put({ type: actionType[1] });
          }
          return true;
        }
      }
    }
    if (!currentStatus) {
      yield put({ type: actionType[0] });
    }
    return false;
  };
}

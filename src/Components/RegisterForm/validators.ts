import debounce from 'lodash-es/debounce';
import request from '../../lib/API';

export const usernameValidator = (() => {
  const callbacks: any[] = [];
  const validateRequest = debounce(async (value: string) => {
    let error: any;
    const result = await request({
      endpoint: '/v1/user/existence?type=username',
      method: 'GET',
      body: {
        valueToCheck: value,
      },
    });
    if (result.httpStatusCode === 200) {
      if (result.data.existence) {
        error = new Error('用户名已经存在!');
      }
    } else if (result.httpStatusCode === 400 && result.message === 'UsernameInvalid') {
      error = new Error('用户名不合法');
    }
    callbacks.forEach(callback => callback(error));
  }, 500);
  return (_: any, value: string, callback: (error?: Error) => any) => {
    callbacks.push(callback);
    validateRequest(value);
  };
})();

export const phoneValidator = (() => {
  const callbacks: any[] = [];
  const validateRequest = debounce(async (value: string) => {
    let error: any;
    const result = await request({
      endpoint: '/v1/user/existence?type=phone',
      method: 'GET',
      body: {
        valueToCheck: value,
      },
    });
    if (result.httpStatusCode === 200) {
      if (result.data.existence) {
        error = new Error('手机号码已经被注册!');
      }
    } else if (result.httpStatusCode === 400 && result.message === 'PhoneInvalid') {
      error = new Error('手机号码不合法!');
    }
    callbacks.forEach(callback => callback(error));
  }, 500);
  return (_: any, value: string, callback: (error?: Error) => any) => {
    callbacks.push(callback);
    validateRequest(value);
  };
})();

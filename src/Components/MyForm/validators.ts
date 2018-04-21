import debounce from 'lodash.debounce';
import request from '../../lib/API';
import msg from '../../lib/i18n';

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
        error = new Error(msg.UsernameExists);
      }
    } else if (result.httpStatusCode === 400 && result.message === 'UsernameInvalid') {
      error = new Error(msg.UsernameInvalid);
    } else if (result.httpStatusCode > 500) {
      error = new Error('网络错误!');
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
        error = new Error(msg.PhoneExists);
      }
    } else if (result.httpStatusCode === 400 && result.message === 'PhoneInvalid') {
      error = new Error(msg.PhoneInvalid);
    } else if (result.httpStatusCode > 500) {
      error = new Error('网络错误!');
    }
    callbacks.forEach(callback => callback(error));
  }, 500);
  return (_: any, value: string, callback: (error?: Error) => any) => {
    callbacks.push(callback);
    validateRequest(value);
  };
})();

export const emailValidator = (() => {
  const callbacks: any[] = [];
  const validateRequest = debounce(async (value: string) => {
    let error: any;
    const result = await request({
      endpoint: '/v1/user/existence?type=email',
      method: 'GET',
      body: {
        valueToCheck: value,
      },
    });
    if (result.httpStatusCode === 200) {
      if (result.data.existence) {
        error = new Error(msg.EmailExists);
      }
    } else if (result.httpStatusCode === 400 && result.message === 'EmailInvalid') {
      error = new Error(msg.EmailInvalid);
    } else if (result.httpStatusCode > 500) {
      error = new Error('网络错误!');
    }
    callbacks.forEach(callback => callback(error));
  }, 500);
  return (_: any, value: string, callback: (error?: Error) => any) => {
    callbacks.push(callback);
    validateRequest(value);
  };
})();

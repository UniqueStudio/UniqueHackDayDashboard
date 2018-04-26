import fetch from 'node-fetch';
import { SideEffectHandler } from '../handlers';

async function recaptcha(antiRobotToken: string) {
  return await fetch('https://recaptcha.net/recaptcha/api/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    body: `secret=6LdC6U0UAAAAAKxQvzAGTxn_D-ywU0epu111lW8o&response=${antiRobotToken}`,
  })
    .then(res => res.json())
    .then(json => json.success);
}

export default recaptcha;

export const recaptchaWrapper = (type: string) => (
  sideEffectHandler: SideEffectHandler,
): SideEffectHandler => {
  return async (sideEffect, state, db) => {
    if (await recaptcha(sideEffect.payload)) {
      return sideEffectHandler(sideEffect, state, db);
    }
    return {
      type,
      payload: 'HumanCheckFailed',
    };
  };
};

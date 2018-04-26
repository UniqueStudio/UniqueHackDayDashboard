import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

import { Collection } from 'mongodb';

import * as TYPE from '../../../src/redux/actions';

import { jwtSecret } from '../../config';
import { recaptchaWrapper } from '../utils/recaptcha';
import { SideEffectHandler } from './index';

const handlers: { [k: string]: SideEffectHandler } = {
  [TYPE.LOGIN_FORM_SUBMIT._]: recaptchaWrapper(TYPE.LOGIN_FORM_SUBMIT.FAIL)(
    async (_, state, db) => {
      const users: Collection<DB.User> = db.collection('users');

      const usernameOrPhone = state.loginForm.data.username.value;
      const password = bcryptjs.hashSync(state.loginForm.data.password.value!);
      const user = await users.findOne({
        $or: [
          // check both username and phone
          { username: usernameOrPhone },
          { phone: usernameOrPhone },
        ],
      });
      if (user) {
        if (user.password === password) {
          return [
            {
              type: TYPE.LOGIN_FORM_SUBMIT.OK,
            },
            {
              type: TYPE.SEND_TOKEN,
              payload: jsonwebtoken.sign({ usernameOrPhone, password }, jwtSecret),
            },
          ];
        } else {
          return {
            type: TYPE.LOGIN_FORM_SUBMIT.FAIL,
            payload: 'PasswordWrong',
          };
        }
      } else {
        return {
          type: TYPE.LOGIN_FORM_SUBMIT.FAIL,
          payload: 'UserNotFound',
        };
      }
    },
  ),

  [TYPE.REGISTER_FORM_SUBMIT._]: recaptchaWrapper(TYPE.REGISTER_FORM_SUBMIT.FAIL)(
    async (_, state, db) => {
      const users: Collection<DB.User> = db.collection('users');
      const regFormData = state.registerForm.data;

      const usernameOrPhone = regFormData.username.value;
      const password = bcryptjs.hashSync(regFormData.password.value!);

      await users.insertOne({
        username: usernameOrPhone,
        password,
        phone: regFormData.phone.value,
      });

      return [
        {
          type: TYPE.REGISTER_FORM_SUBMIT.OK,
        },
        {
          type: TYPE.SEND_TOKEN,
          payload: jsonwebtoken.sign({ usernameOrPhone, password }, jwtSecret),
        },
      ];
    },
  ),
};

export default handlers;

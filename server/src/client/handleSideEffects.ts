import { AnyAction } from 'redux';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

import { RootState } from '../../../src/redux/reducers/index';
import clientPromise from '../db/connection';
import { jwtSecret } from '../../config';
import * as TYPE from '../../../src/redux/actions';
import recaptcha from '../utils/recaptcha';

async function handleSideEffect(
  sideEffect: AnyAction,
  state: RootState,
): Promise<AnyAction | null> {
  const client = await clientPromise;
  const db = client.db();
  const users = db.collection<DB.User>('users');

  switch (sideEffect.type) {
    case TYPE.LOGIN_FORM_SUBMIT._:
      if (!await recaptcha(sideEffect.payload)) {
        return {
          type: TYPE.LOGIN_FORM_SUBMIT.FAIL,
          payload: 'HumanCheckFailed',
        };
      }
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
          return {
            type: TYPE.LOGIN_FORM_SUBMIT.OK,
            payload: jsonwebtoken.sign({ usernameOrPhone, password }, jwtSecret),
          };
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
    case TYPE.REGISTER_FORM_SUBMIT._:
      users.insertOne({
        username: state.registerForm.data.username.value,
        password: bcryptjs.hashSync(state.registerForm.data.username.value!),
        phone: state.registerForm.data.phone.value,
      });
    // return handleLogin(state, sideEffect.payload);
  }
  return null;
}

export default handleSideEffect;

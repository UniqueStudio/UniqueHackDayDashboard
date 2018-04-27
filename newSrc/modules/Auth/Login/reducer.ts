import { AnyAction } from 'redux';
import { ToForm, ToFormData } from './../../../typings/API/form.d';
import { LOGIN_FORM_CHANGE, LOGIN_FORM_SUBMIT, CLEAR_LOGIN } from './action';

// login form
export type LoginForm = ToForm<
  ToFormData<{
    username: string;
    password: string;
    autoLogin: boolean;
  }>
>;
/**
 * login form reducer
 */
export function loginForm(
  state: LoginForm = {
    data: {
      username: {},
      password: {},
      autoLogin: { value: true },
    },
    isLoading: false,
    isSubmitting: false,
    error: {},
  },
  action: AnyAction,
) {
  switch (action.type) {
    case LOGIN_FORM_CHANGE:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case CLEAR_LOGIN:
      return {
        ...state,
        data: {
          username: {},
          password: {},
          autoLogin: { value: true },
        },
      };

    case LOGIN_FORM_SUBMIT.START:
      return { ...state, isSubmitting: true };
    case LOGIN_FORM_SUBMIT.OK:
      return { ...state, isSubmitting: false };
    case LOGIN_FORM_SUBMIT.FAIL:
      return { ...state, isSubmitting: false, error: { value: action.payload, time: Date.now() } };

    default:
      return state;
  }
}

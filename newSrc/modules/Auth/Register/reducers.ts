import { AnyAction } from 'redux';
import { ToForm, ToFormData } from '../../../typings/API/form';
import {
  REGISTER_FORM_SUBMIT,
  REGISITER_SEND_SMS_SUBMIT,
  REGISTER_FORM_CHANGE,
  CLEAR_REGISTER,
} from './action';
export type RegisterForm = ToForm<
  ToFormData<{
    username: string;
    password: string;
    phone: string;
    code: string;
  }>
>;
/**
 * Register form reducer
 */
export function registerForm(
  state: RegisterForm = {
    data: {
      username: {},
      password: {},
      phone: {},
      code: {},
    },
    isLoading: false,
    isSubmitting: false,
    error: {},
  },
  action: AnyAction,
) {
  switch (action.type) {
    case REGISTER_FORM_CHANGE:
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case CLEAR_REGISTER:
      return {
        ...state,
        data: {
          username: {},
          password: {},
          phone: {},
          code: {},
        },
      };

    case REGISTER_FORM_SUBMIT.START:
      return { ...state, isSubmitting: true };
    case REGISTER_FORM_SUBMIT.OK:
      return { ...state, isSubmitting: false };
    case REGISTER_FORM_SUBMIT.FAIL:
      return { ...state, isSubmitting: false, error: { value: action.payload, time: Date.now() } };
    case REGISITER_SEND_SMS_SUBMIT.FAIL:
      return { ...state, error: { value: action.payload, time: Date.now() } };

    default:
      return state;
  }
}

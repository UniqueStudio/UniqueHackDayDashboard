import { AnyAction } from 'redux';
import * as TYPE from '../actions/index';
/**
 * This file is forms' reducers.
 */

type ToFormData<T> = {
  [K in keyof T]: {
    value?: T[K];
    errors?: Error[];
    dirty?: boolean;
    touched?: boolean;
    validating?: boolean;
  }
};
interface ToForm<T> {
  data: T;
  isLoading: boolean;
  isSubmitting: boolean;
  error: { value?: string; time?: number };
}

// detail form
export type DetailForm = ToForm<ToFormData<API.User.UserDetailRequest>>;
export function detailForm(
  state: DetailForm = {
    data: {
      name: {},
      gender: {},
      birthday: {},
      email: {},
      resume: {},
      tShirtSize: {},
      city: {},
      alipay: {},
      school: {},
      major: {},
      grade: {},
      graduateTime: {},
      urgentConcatName: {},
      urgentConcatPhone: {},
      urgentConcatRelationship: {},
      collection: {},
      specialNeeds: {},
      github: {},
      linkedIn: {},
      codingDotNet: {},
      blog: {},
      role: {},
      skills: {},
      hackdayTimes: {},
    },
    isLoading: false,
    isSubmitting: false,
    error: {},
  },
  action: AnyAction,
) {
  switch (action.type) {
    case 'DETAIL_FORM_CHANGE':
      const ret = {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };

      localStorage.setItem('detailForm', JSON.stringify(ret));
      return ret;
    default:
      return state;
  }
}

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
    case 'LOGIN_FORM_CHANGE':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case 'CLEAR_LOGIN':
      return {
        ...state,
        data: {
          username: {},
          password: {},
          autoLogin: { value: true },
        },
      };

    case TYPE.LOGIN_FORM_SUBMIT.START:
      return { ...state, isSubmitting: true };
    case TYPE.LOGIN_FORM_SUBMIT.OK:
      return { ...state, isSubmitting: false };
    case TYPE.LOGIN_FORM_SUBMIT.FAIL:
      return { ...state, isSubmitting: false, error: { value: action.payload, time: Date.now() } };

    default:
      return state;
  }
}

// register form
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
    case 'REGISTER_FORM_CHANGE':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case 'CLEAR_REGISTER':
      return {
        ...state,
        data: {
          username: {},
          password: {},
          phone: {},
          code: {},
        },
      };

    case TYPE.REGISTER_FORM_SUBMIT.START:
      return { ...state, isSubmitting: true };
    case TYPE.REGISTER_FORM_SUBMIT.OK:
      return { ...state, isSubmitting: false };
    case TYPE.REGISTER_FORM_SUBMIT.FAIL:
      return { ...state, isSubmitting: false, error: { value: action.payload, time: Date.now() } };
    case TYPE.REGISITER_SEND_SMS_SUBMIT.FAIL:
      return { ...state, error: { value: action.payload, time: Date.now() } };

    default:
      return state;
  }
}

export type ResetPwdForm = ToForm<
  ToFormData<{
    phone: string;
    code: string;
    password: string;
  }>
>;
/**
 * resetPwd form data reducer
 */
export function resetPwdForm(
  state: ResetPwdForm = {
    data: {
      password: {},
      code: {},
      phone: {},
    },
    isLoading: false,
    isSubmitting: false,
    error: {},
  },
  action: AnyAction,
) {
  switch (action.type) {
    case 'RESET_PWD_FORM_CHANGE':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    case 'CLEAR_RESET_PWD':
      return {
        ...state,
        data: {
          password: {},
          code: {},
          phone: {},
        },
      };
    case TYPE.RESET_PWD_FORM_SUBMIT.START:
      return { ...state, isSubmitting: true };
    case TYPE.RESET_PWD_FORM_SUBMIT.OK:
      return { ...state, isSubmitting: false };
    case TYPE.RESET_PWD_FORM_SUBMIT.FAIL:
      return { ...state, isSubmitting: false, error: { value: action.payload, time: Date.now() } };
    case TYPE.RESET_PWD_SEND_SMS_SUBMIT.FAIL:
      return { ...state, error: { value: action.payload, time: Date.now() } };
    default:
      return state;
  }
}

export type TeamForm = ToForm<
  ToFormData<{
    teamName: string;
    teamLeaderName: string;
    teamLeaderPhone: string;
  }>
>;
/**
 * teamForm form data reducer
 */
export function teamForm(
  state: TeamForm = {
    data: {
      teamName: {},
      teamLeaderName: {},
      teamLeaderPhone: {},
    },
    isLoading: false,
    isSubmitting: false,
    error: {},
  },
  action: AnyAction,
) {
  switch (action.type) {
    case 'NEW_TEAM_FORM_CHANGE':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    // case TYPE..START:
    //   return { ...state, isSubmitting: true };
    // case TYPE.RESET_PWD_FORM_SUBMIT.OK:
    //   return { ...state, isSubmitting: false };
    // case TYPE.RESET_PWD_FORM_SUBMIT.FAIL:
    //   return { ...state, isSubmitting: false, error: { value: action.payload, time: Date.now() } };

    case 'JOIN_TEAM_FORM_CHANGE':
      return {
        ...state,
        data: {
          ...state.data,
          ...action.payload,
        },
      };
    // case TYPE.RESET_PWD_FORM_SUBMIT.START:
    //   return { ...state, isSubmitting: true };
    // case TYPE.RESET_PWD_FORM_SUBMIT.OK:
    //   return { ...state, isSubmitting: false };
    // case TYPE.RESET_PWD_FORM_SUBMIT.FAIL:
    //   return { ...state, isSubmitting: false, error: { value: action.payload, time: Date.now() } };

    case 'CLEAR_NEW_TEAM':
      return {
        ...state,
        data: {
          teamName: {},
        },
      };
    case 'CLEAR_JOIN_TEAM':
      return {
        ...state,
        data: {
          teamLeaderName: {},
          teamLeaderPhone: {},
        },
      };
    default:
      return state;
  }
}

export function smsLoading(state = false, action: AnyAction) {
  switch (action.type) {
    case TYPE.REGISITER_SEND_SMS_SUBMIT.START:
      return true;
    case TYPE.REGISITER_SEND_SMS_SUBMIT.OK:
      return false;
    case TYPE.REGISITER_SEND_SMS_SUBMIT.FAIL:
      return false;

    case TYPE.RESET_PWD_SEND_SMS_SUBMIT.START:
      return true;
    case TYPE.RESET_PWD_SEND_SMS_SUBMIT.OK:
      return false;
    case TYPE.RESET_PWD_SEND_SMS_SUBMIT.FAIL:
      return false;
    default:
      return state;
  }
}

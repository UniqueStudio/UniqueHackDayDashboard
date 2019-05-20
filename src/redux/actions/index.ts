import createActions from './createActions';
// prettier-ignore
export const LOAD_USER_INFO = {
  _: 'LOAD_USER_INFO',
  START: 'LOAD_USER_INFO_START',
  FAIL: 'LOAD_USER_INFO_FAIL',
  OK: 'LOAD_USER_INFO_OK',
};

export type LOAD_USER_INFO_OK = typeof LOAD_USER_INFO.OK;
export type LOAD_USER_INFO_FAIL = typeof LOAD_USER_INFO.FAIL;

// prettier-ignore
export const LOGIN_FORM_SUBMIT = {
  _:     'LOGIN_FORM_SUBMIT',
  START: 'LOGIN_FORM_SUBMIT_START',
  OK:    'LOGIN_FORM_SUBMIT_OK',
  FAIL:  'LOGIN_FORM_SUBMIT_FAIL',
};

// prettier-ignore
export const REGISTER_FORM_SUBMIT = {
  _:     'REGISTER_FORM_SUBMIT',
  START: 'REGISTER_FORM_SUBMIT_START',
  OK:    'REGISTER_FORM_SUBMIT_OK',
  FAIL:  'REGISTER_FORM_SUBMIT_FAIL',
};

// prettier-ignore
export const RESET_PWD_FORM_SUBMIT = {
  _:     'RESET_PWD_FORM_SUBMIT',
  START: 'RESET_PWD_FORM_SUBMIT_START',
  OK:    'RESET_PWD_FORM_SUBMIT_OK',
  FAIL:  'RESET_PWD_FORM_SUBMIT_FAIL',
};

// prettier-ignore
export const RESET_PWD_SEND_SMS_SUBMIT = {
  _:     'RESET_PWD_SEND_SMS_SUBMIT',
  START: 'RESET_PWD_SEND_SMS_START',
  OK:    'RESET_PWD_SEND_SMS_OK',
  FAIL:  'RESET_PWD_SEND_SMS_FAIL',
};

// prettier-ignore
export const REGISITER_SEND_SMS_SUBMIT = {
  _:     'REGISITER_SEND_SMS_SUBMIT',
  START: 'REGISITER_SEND_SMS_SUBMIT_START',
  OK:    'REGISITER_SEND_SMS_SUBMIT_OK',
  FAIL:  'REGISITER_SEND_SMS_SUBMIT_FAIL',
};

// prettier-ignore
export const DETAIL_FORM_SUBMIT = {
  _:     'DETAIL_FORM_SUBMIT',
  START: 'DETAIL_FORM_SUBMIT_START',
  OK:    'DETAIL_FORM_SUBMIT_OK',
  FAIL:  'DETAIL_FORM_SUBMIT_FAIL',
};

// prettier-ignore
export const NEW_TEAM_FORM_SUBMIT = {
  _:     'NEW_TEAM_FORM_SUBMIT',
  START: 'NEW_TEAM_FORM_SUBMIT_START',
  OK:    'NEW_TEAM_FORM_SUBMIT_OK',
  FAIL:  'NEW_TEAM_FORM_SUBMIT_FAIL',
};

// prettier-ignore
export const JOIN_TEAM_FORM_SUBMIT = {
  _:     'JOIN_TEAM_FORM_SUBMIT',
  START: 'JOIN_TEAM_FORM_SUBMIT_START',
  OK:    'JOIN_TEAM_FORM_SUBMIT_OK',
  FAIL:  'JOIN_TEAM_FORM_SUBMIT_FAIL',
};

// prettier-ignore
export const CHANGE_IS_T_SUBMIT = {
  _:     'CHANGE_IS_T_SUBMIT',
  START: 'CHANGE_IS_T_SUBMIT_START',
  OK:    'CHANGE_IS_T_SUBMIT_OK',
  FAIL:  'CHANGE_IS_T_SUBMIT_FAIL',
}

// prettier-ignore
export const APPLY_CONFIRM_SUBMIT = {
  _:     'APPLY_CONFIRM_SUBMIT',
  START: 'APPLY_CONFIRM_SUBMIT_START',
  OK:    'APPLY_CONFIRM_SUBMIT_OK',
  FAIL:  'APPLY_CONFIRM_SUBMIT_FAIL',
}

// 退出比赛
export const ABORT_CONFIRM_SUBMIT = createActions('ABORT_CONFIRM_SUBMIT');

// prettier-ignore
export const LOAD_TEAM_INFO = {
  _:     'LOAD_TEAM_INFO',
  START: 'LOAD_TEAM_INFO_START',
  OK:    'LOAD_TEAM_INFO_OK',
  FAIL:  'LOAD_TEAM_INFO_FAIL',
}

// prettier-ignore
export const GET_USER_DETAIL = {
  _:     'GET_USER_DETAIL',
  START: 'GET_USER_DETAIL_START',
  OK:    'GET_USER_DETAIL_OK',
  FAIL:  'GET_USER_DETAIL_FAIL',
}

export const SHOW_APP_VIEW = 'SHOW_APP_VIEW';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SET_LOGGED_IN = 'SET_LOGGED_IN';
export const SET_NOT_LOGGED_IN = 'SET_NOT_LOGGED_IN';

export const APPLY_PROCESS_START = 'APPLY_PROCESS_START';
export const APPLY_PROCESS_END = 'APPLY_PROCESS_END';
export const APPLY_PROCESS_IS_D = 'APPLY_PROCESS_IS_D';
export const APPLY_PROCESS_IS_T = 'APPLY_PROCESS_IS_T';
export const APPLY_PROCESS_IS_C = 'APPLY_PROCESS_IS_C';
export const APPLY_PROCESS_SET_MAX_STEP = 'APPLY_PROCESS_SET_MAX_STEP';
export const APPLY_PROCESS_SET_CURRENT = 'APPLY_PROCESS_SET_CURRENT';

export const ADD_LOADING_COUNT = 'ADD_LOADING_COUNT';
export const SUB_LOADING_COUNT = 'SUB_LOADING_COUNT';

export const DETAIL_EDIT = 'DETAIL_EDIT';
export type DETAIL_EDIT = typeof DETAIL_EDIT;

// prettier-ignore
export const GET_UNREAD_MSG_ALL = {
  _:     'GET_UNREAD_MSG_ALL',
  START: 'GET_UNREAD_MSG_ALL_START',
  OK:    'GET_UNREAD_MSG_ALL_OK',
  FAIL:  'GET_UNREAD_MSG_ALL_FAIL',
}

// prettier-ignore
export const GET_MSG_ALL = {
  _:     'GET_MSG_ALL',
  START: 'GET_MSG_ALL_START',
  OK:    'GET_MSG_ALL_OK',
  FAIL:  'GET_MSG_ALL_FAIL',
}

// prettier-ignore
export const SET_MSG_READ = {
  _:     'SET_MSG_READ',
  START: 'SET_MSG_READ_START',
  OK:    'SET_MSG_READ_OK',
  FAIL:  'SET_MSG_READ_FAIL',
}

// prettier-ignore
export const DELETE_MSG = {
  _:     'DELETE_MSG',
  START: 'DELETE_MSG_START',
  OK:    'DELETE_MSG_OK',
  FAIL:  'DELETE_MSG_FAIL',
}

export const SET_MSG_READ_ALL = 'SET_MSG_READ_ALL';
export const DELETE_MSG_ALL = 'DELETE_MSG_ALL';

export const START_MSG_LOOP = 'START_MSG_LOOP';
export const STOP_MSG_LOOP = 'STOP_MSG_LOOP';
export const MSG_LOOP_RECEIVE_MSG = 'MSG_LOOP_RECEIVE_MSG';
export const MSG_LOOP_ERROR = 'MSG_LOOP_ERROR';

// prettier-ignore
export const DELETE_TEAM_MEMBER = {
  _:     'DELETE_TEAM_MEMBER',
  START: 'DELETE_TEAM_MEMBER_START',
  OK:    'DELETE_TEAM_MEMBER_OK',
  FAIL:  'DELETE_TEAM_MEMBER_FAIL',
}

// prettier-ignore
export const EXIT_TEAM = {
  _:     'EXIT_TEAM',
  START: 'EXIT_TEAM_START',
  OK:    'EXIT_TEAM_OK',
  FAIL:  'EXIT_TEAM_FAIL',
}

// prettier-ignore
export const CHANGE_TEAM_LEADER = {
  _:     'CHANGE_TEAM_LEADER',
  START: 'CHANGE_TEAM_LEADER_START',
  OK:    'CHANGE_TEAM_LEADER_OK',
  FAIL:  'CHANGE_TEAM_LEADER_FAIL',
}

// prettier-ignore
export const DELETE_TEAM = {
  _:     'DELETE_TEAM',
  START: 'DELETE_TEAM_START',
  OK:    'DELETE_TEAM_OK',
  FAIL:  'DELETE_TEAM_FAIL',
}

export const ADMIN_TEAMS_INFO = createActions('ADMIN_TEAMS_INFO');
export type ADMIN_TEAMS_INFO = typeof ADMIN_TEAMS_INFO._;
export const ADMIN_USER_STATUS_CHANGE = createActions('ADMIN_USER_STATUS_CHANGE');
export type ADMIN_USER_STATUS_CHANGE = typeof ADMIN_USER_STATUS_CHANGE._;
export const ADMIN_USER_SUBMIT = createActions('ADMIN_USER_SUBMIT');
export type ADMIN_USER_SUBMIT = typeof ADMIN_USER_SUBMIT._;
export const DELETE_FILE = createActions('DELETE_FILE');
export type DELETE_FILE = typeof DELETE_FILE._;

export const MSG_USER_ACCEPTED = 'MSG_USER_ACCEPTED';
export const MSG_USER_REJECTED = 'MSG_USER_REJECTED';

export const ERROR_SHOW = 'ERROR_SHOW';
export type ERROR_SHOW = typeof ERROR_SHOW;

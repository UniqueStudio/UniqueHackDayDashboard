import { combineReducers, AnyAction } from 'redux';
import { connectRouter, RouterState } from 'connected-react-router';
import { History } from 'history';
import auth, { AuthData } from './auth';
import user, { PartialUserInfo } from './user';
import msgData from './msg';
import applyProcess, { ApplyProcessData } from './apply';
import teamInfo, { TeamInfo } from './teamInfo';
import {
  LoginForm,
  DetailForm,
  RegisterForm,
  ResetPwdForm,
  NewTeamForm,
  JoinTeamForm,
  ConfirmApplyStatus,
} from './forms';
import {
  loginForm,
  registerForm,
  detailForm,
  resetPwdForm,
  newTeamForm,
  joinTeamForm,
  smsLoading,
  confirmApplyStatus,
} from './forms';
import admin, { Admin } from './admin';

import loadingCount from './loading';

export interface RootState {
  router: RouterState;
  registerForm: RegisterForm;
  detailForm: DetailForm;
  loginForm: LoginForm;
  newTeamForm: NewTeamForm;
  joinTeamForm: JoinTeamForm;
  resetPwdForm: ResetPwdForm;
  smsLoading: boolean;
  confirmApplyStatus: ConfirmApplyStatus;

  auth: AuthData;
  user: PartialUserInfo;
  msgData: ReturnType<typeof msgData>;
  applyProcess: ApplyProcessData;
  teamInfo: TeamInfo;
  loadingCount: number;
  admin: Admin;
}

export { AnyAction };
export default (history: History) =>
  combineReducers<RootState>({
    // route, connected-react-router
    router: connectRouter(history),
    registerForm,
    loginForm,
    detailForm,
    newTeamForm,
    joinTeamForm,
    resetPwdForm,
    smsLoading,
    confirmApplyStatus,

    // loadingStatus,
    auth,
    user: user as any,
    msgData,
    applyProcess,
    teamInfo,
    loadingCount,
    admin,
  });

// export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
// { [P in U]: never } & { [x: string]: never })[T];
// export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

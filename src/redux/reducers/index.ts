import { combineReducers, AnyAction } from 'redux';
import { routerReducer as route } from 'react-router-redux';

import errorStatus, { ErrorStatus } from './error';
import auth, { AuthData } from './auth';
import user, { PartialUserInfo } from './user';
import msg, { MsgData } from './msg';
import applyProcess, { ApplyProcessData } from './apply';
import teamInfo, { TeamInfo } from './teamInfo';
import { LoginForm, DetailForm, RegisterForm, ResetPwdForm, TeamForm } from './forms';
import { loginForm, registerForm, detailForm, resetPwdForm, teamForm, smsLoading } from './forms';

export interface RootState {
  route?: {
    location: Location;
  };
  registerForm: RegisterForm;
  detailForm: DetailForm;
  loginForm: LoginForm;
  teamForm: TeamForm;
  resetPwdForm: ResetPwdForm;
  smsLoading: boolean;

  // loadingStatus: LoadingStatus;
  errorStatus: ErrorStatus;
  auth: AuthData;
  user: PartialUserInfo;
  msg: MsgData;
  applyProcess: ApplyProcessData;
  teamInfo: TeamInfo;
}

export { AnyAction };
export default combineReducers<RootState>({
  route,

  registerForm,
  loginForm,
  detailForm,
  teamForm,
  resetPwdForm,
  smsLoading,

  // loadingStatus,
  errorStatus,
  auth,
  user,
  msg,
  applyProcess,
  teamInfo,
});

export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

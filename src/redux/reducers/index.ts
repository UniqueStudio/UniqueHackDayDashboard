import { combineReducers, AnyAction } from 'redux';
import { routerReducer as route } from 'react-router-redux';

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

import loadingCount from './loading';

export interface RootState {
  route?: {
    location: Location;
  };
  registerForm: RegisterForm;
  detailForm: DetailForm;
  loginForm: LoginForm;
  newTeamForm: NewTeamForm;
  joinTeamForm: JoinTeamForm;
  resetPwdForm: ResetPwdForm;
  smsLoading: boolean;
  confirmApplyStatus: ConfirmApplyStatus;

  // loadingStatus: LoadingStatus;
  auth: AuthData;
  user: PartialUserInfo;
  msgData: ReturnType<typeof msgData>;
  applyProcess: ApplyProcessData;
  teamInfo: TeamInfo;
  loadingCount: number;
}

export { AnyAction };
export default combineReducers<RootState>({
  route,

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
  user,
  msgData,
  applyProcess,
  teamInfo,
  loadingCount,
});

export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

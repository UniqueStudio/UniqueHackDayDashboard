import { combineReducers, AnyAction } from 'redux';
import { routerReducer as route } from 'react-router-redux';

import register, { RegisterData } from './register';
import login, { LoginData } from './login';
import detail, { DetailData } from './detail';
import loadingStatus, { LoadingStatus } from './loading';
import errorStatus, { ErrorStatus } from './error';
import teamForm, { TeamFormData } from './team';
import resetPwd, { ResetPwdData } from './reset-pwd';
import auth, { AuthData } from './auth';
import user, { UserData } from './user';
import msg, { MsgData } from './msg';
import applyProcess, { ApplyProcessData } from './apply';
import teamInfo, { TeamInfo } from './teamInfo';

export interface RootState {
  route?: {
    location: Location;
  };
  register: RegisterData;
  login: LoginData;
  detail: DetailData;
  loadingStatus: LoadingStatus;
  errorStatus: ErrorStatus;
  teamForm: TeamFormData;
  resetPwd: ResetPwdData;
  auth: AuthData;
  user: UserData;
  msg: MsgData;
  applyProcess: ApplyProcessData;
  teamInfo: TeamInfo;
}

export { AnyAction };
export default combineReducers<RootState>({
  route,
  register,
  login,
  detail,
  teamForm,
  loadingStatus,
  errorStatus,
  resetPwd,
  auth,
  user,
  msg,
  applyProcess,
  teamInfo,
});

export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

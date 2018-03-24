import { combineReducers, AnyAction } from 'redux';
import { routerReducer as route } from 'react-router-redux';

// import userEntry, { UserEntryData } from './userEntry';
import register, { RegisterData } from './register';
import login, { LoginData } from './login';
import detail, { DetailData } from './detail';

export interface RootState {
  route?: {
    location: Location;
  };
  register: RegisterData;
  login: LoginData;
  detail: DetailData;
}

export { AnyAction };
export default combineReducers<RootState>({
  route,
  register,
  login,
  detail,
});

export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

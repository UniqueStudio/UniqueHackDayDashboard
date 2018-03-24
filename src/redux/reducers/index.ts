import { combineReducers, AnyAction } from 'redux';
import { routerReducer as route } from 'react-router-redux';

// import userEntry, { UserEntryData } from './userEntry';
import register, { RegisterData } from './register';

export interface RootState {
  route?: {
    location: Location;
  };
  // userEntry: UserEntryData;
  register: RegisterData;
}

export { AnyAction };
export default combineReducers<RootState>({
  route,
  // userEntry,
  register,
});

export type Diff<T extends string, U extends string> = ({ [P in T]: P } &
  { [P in U]: never } & { [x: string]: never })[T];
export type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

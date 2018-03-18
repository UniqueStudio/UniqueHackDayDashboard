import { combineReducers, AnyAction } from 'redux';
import { routerReducer as route } from 'react-router-redux';

import userEntry, { UserEntryData } from './userEntry';

export interface RootState {
  route?: {
    location: Location;
  };
  userEntry: UserEntryData;
}

export { AnyAction };
export default combineReducers<RootState>({
  route,
  userEntry,
});

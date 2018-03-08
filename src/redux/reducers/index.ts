import { combineReducers, AnyAction } from 'redux';
import mediaQuery, { MediaQuery } from './mediaQuery';
import { routerReducer } from 'react-router-redux';

export interface RootState {
  mediaQuery: MediaQuery;
}

export { AnyAction };
export default combineReducers<RootState>({
  mediaQuery,

  routerReducer,
});

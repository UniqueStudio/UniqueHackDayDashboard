import { combineReducers, AnyAction } from 'redux';
import { routerReducer as route } from 'react-router-redux';

export interface RootState {
  route: {
    location: Location;
  };
}

export { AnyAction };
export default combineReducers<RootState>({
  route,
});

import { createStore, combineReducers, applyMiddleware, Action, Store } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import { History } from 'history';

const history: History = createHistory();

const middleware = routerMiddleware(history);

const test = (state = {}, action: Action) => {
  return {};
};

const store: Store<any> = createStore(
  combineReducers({
    ...{ test },
    router: routerReducer,
  }),
  applyMiddleware(middleware),
);

export { history, store };
export default store;

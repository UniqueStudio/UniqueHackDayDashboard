import createMemHistory from 'history/createMemoryHistory';
import { createStore, applyMiddleware, Store, AnyAction } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import reducer, { RootState } from '../reducers';

export function createServerRedux(logger: (action: AnyAction) => void) {
  const serverHistory = createMemHistory();
  const serverStore: Store<RootState> = createStore(
    reducer,
    applyMiddleware(routerMiddleware(serverHistory), _ => next => action => {
      logger(action);
      return next(action);
    }),
  );

  return {
    serverHistory,
    serverStore,
  };
}

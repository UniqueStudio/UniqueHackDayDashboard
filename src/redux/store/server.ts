import createMemHistory from 'history/createMemoryHistory';
import { createStore, applyMiddleware, Store } from 'redux';
import { routerMiddleware } from 'react-router-redux';

import reducer, { RootState } from '../reducers';

export function createServerRedux() {
  const serverHistory = createMemHistory();
  const serverStore: Store<RootState> = createStore(
    reducer,
    applyMiddleware(routerMiddleware(serverHistory)),
  );

  return {
    serverHistory,
    serverStore,
  };
}

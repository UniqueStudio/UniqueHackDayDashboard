import * as React from 'react';
import { createStore, combineReducers, applyMiddleware, Action } from 'redux';
import createHistory from 'history/createHashHistory';
import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
import { Provider } from 'react-redux';

import RootRoute from './routes';

const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history);

const test = (state = {}, action: Action) => {
  return {};
};
// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...{ test },
    router: routerReducer,
  }),
  applyMiddleware(middleware),
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
         <ConnectedRouter history={history}>
          <RootRoute />
        </ConnectedRouter>
      </Provider>
    );
  }
}

import * as React from 'react';
import { ConnectedRouter, replace } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './Views/Dashboard';
import UserEntry from './Views/UserEntry';
import { store, history } from './redux/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/user_entry" component={UserEntry} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

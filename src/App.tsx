import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import Dashboard from './Views/Dashboard';
import { store, history } from './redux/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
         <ConnectedRouter history={history}>
          <Switch>
            {/* <Route path="/login" component={}/> */}
            <Route path="/" component={Dashboard}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }
}

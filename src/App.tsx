import * as React from 'react';
import { ConnectedRouter, replace } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import Throttle from 'lodash-decorators/throttle';

import Dashboard from './Views/Dashboard';
import { store, history } from './redux/store';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" component={Dashboard} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }

  componentWillMount() {
    store.dispatch(replace('/console'));
    this.onWindowResize = this.onWindowResize.bind(this);
    this.onWindowResize();
    window.addEventListener('resize', this.onWindowResize);
  }

  componentWillUnmount() {
    // Do not forget to do the clear job.
    window.removeEventListener('resize', this.onWindowResize);
  }

  @Throttle(300)
  onWindowResize() {
    store.dispatch({
      type: 'CHANGE_PLATFORM',
      payload: {
        platform: window.matchMedia('(min-width: 500px)').matches ? 'desktop' : 'phone',
      },
    });
  }
}

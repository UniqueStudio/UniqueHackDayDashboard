import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { take } from 'redux-saga/effects';
import { Task } from 'redux-saga';
import { Switch, Route } from 'react-router-dom';

import 'antd/es/form/style';
import 'antd/es/card/style';
import 'antd/es/input/style';
import 'antd/es/tabs/style';
import 'antd/es/icon/style/css';
import 'antd/es/button/style';
import 'antd/es/checkbox/style';
import 'antd/es/row/style/css';
import 'antd/es/col/style/css';
import 'antd/es/layout/style';
import 'antd/es/menu/style';
import 'antd/es/tooltip/style';
import 'antd/es/table/style';
import 'antd/es/steps/style';
import 'antd/es/select/style';
import 'antd/es/date-picker/style';
import 'antd/es/upload/style';
import 'antd/es/progress/style';
import 'antd/es/alert/style';
import 'antd/es/radio/style';
import 'antd/es/divider/style';
import 'antd/es/message/style';
import 'antd/es/notification/style';

// import 'ant-design-pro/dist/ant-design-pro.min.css';

import './styles/main.less';

import Dashboard from './Views/Dashboard';
import UserEntryView from './Views/UserEntryView';
import store, { history, sagaMiddleware } from './redux/store';
import * as TYPE from './redux/actions';

class App extends React.Component {
  state = {
    showAppView: false,
  };

  render() {
    if (!this.state.showAppView) {
      return null;
    }
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/user_entry" component={UserEntryView} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  }

  *showAppViewWatcher() {
    yield take(TYPE.SHOW_APP_VIEW);
    this.setState({ showAppView: true });
  }

  watcherTask: Task | null = null;
  componentWillMount() {
    const self = this;
    sagaMiddleware.run(function*() {
      yield take(TYPE.SHOW_APP_VIEW);
      self.setState({ showAppView: true });
    });
    store.dispatch({ type: 'LOAD_USER_INFO' });
  }

  componentWillUnmount() {
    if (this.watcherTask) {
      this.watcherTask.cancel();
    }
  }
}

export default App;

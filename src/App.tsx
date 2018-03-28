import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import 'antd/lib/form/style/index.css';
import 'antd/lib/card/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/tabs/style/index.css';
import 'antd/lib/icon/style/css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/checkbox/style/index.css';
import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';
import 'antd/lib/layout/style/index.css';
import 'antd/lib/menu/style/index.css';
import 'antd/lib/tooltip/style/index.css';
import 'antd/lib/table/style/index.css';
import 'antd/lib/steps/style/index.css';
import 'antd/lib/select/style/index.css';
import 'antd/lib/date-picker/style/index.css';
import 'antd/lib/upload/style/index.css';
import 'antd/lib/progress/style/index.css';
import 'antd/lib/alert/style/index.css';
import 'antd/lib/radio/style/index.css';
import 'antd/lib/divider/style/index.css';

import 'ant-design-pro/dist/ant-design-pro.min.css';

import './styles/main.less';

import Dashboard from './Views/Dashboard';
import UserEntryView from './Views/UserEntryView';
import { store, history } from './redux/store';

export default class App extends React.Component {
  state = {
    isLoadingLoginStatus: false,
  };

  unsubcribe = () => void 0;
  render() {
    if (this.state.isLoadingLoginStatus) {
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

  componentWillMount() {
    let preIsLoadingLoginStatus = false;
    this.unsubcribe = store.subscribe(() => {
      const isLoadingLoginStatus = store.getState().loadingStatus.loginStatusLoading;
      if (isLoadingLoginStatus === !preIsLoadingLoginStatus) {
        this.setState({ isLoadingLoginStatus });
        if (!isLoadingLoginStatus) {
          this.unsubcribe();
        }
      }
      preIsLoadingLoginStatus = isLoadingLoginStatus;
    }) as any;
    store.dispatch({ type: 'LOAD_LOGIN_STATUS' });
  }

  componentWillUnmount() {
    if (this.unsubcribe) {
      this.unsubcribe();
    }
  }
}

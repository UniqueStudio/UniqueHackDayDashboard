import * as React from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import 'antd/lib/form/style';
import 'antd/lib/card/style';
import 'antd/lib/input/style';
import 'antd/lib/tabs/style';
import 'antd/lib/icon/style/css';
import 'antd/lib/button/style';
import 'antd/lib/checkbox/style';
import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';
import 'antd/lib/layout/style';
import 'antd/lib/menu/style';
import 'antd/lib/tooltip/style';
import 'antd/lib/table/style';
import 'antd/lib/steps/style';
import 'antd/lib/select/style';
import 'antd/lib/date-picker/style';
import 'antd/lib/upload/style';
import 'antd/lib/progress/style';
import 'antd/lib/alert/style';
import 'antd/lib/radio/style';
import 'antd/lib/divider/style';
import 'antd/lib/message/style';

// import 'ant-design-pro/dist/ant-design-pro.min.css';

import './styles/main.less';

import Dashboard from './Views/Dashboard';
import UserEntryView from './Views/UserEntryView';
import { store, history } from './redux/store';

class App extends React.Component {
  state = {
    isLoadingUserInfo: false,
  };

  unsubcribe = () => void 0;
  render() {
    if (this.state.isLoadingUserInfo) {
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
    let preIsLoadingUserInfo = false;
    this.unsubcribe = store.subscribe(() => {
      const isLoadingUserInfo = store.getState().loadingStatus.userInfoLoading;
      if (isLoadingUserInfo === !preIsLoadingUserInfo) {
        this.setState({ isLoadingUserInfo });
        // if (!isLoadingUserInfo) {
        //   this.unsubcribe();
        // }
      }
      preIsLoadingUserInfo = isLoadingUserInfo;
    }) as any;
    // store.dispatch({ type: 'LOAD_LOGIN_STATUS' });
    store.dispatch({ type: 'LOAD_USER_INFO' });
  }

  componentWillUnmount() {
    if (this.unsubcribe) {
      this.unsubcribe();
    }
  }
}

export default hot(module)(App);

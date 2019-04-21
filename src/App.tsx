import * as React from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import 'ant-design-pro/dist/ant-design-pro.css';

import 'antd/dist/antd.css';
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

import './styles/main.less';

import Dashboard from './Views/Dashboard';
import UserEntryView from './Views/UserEntryView';
import store, { history } from './redux/store';
import GlobalLoading from './Views/GlobalLoading';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <>
                    <ConnectedRouter history={history}>
                        <Switch>
                            <Route path="/user_entry" component={UserEntryView} />
                            <Route path="/" component={Dashboard} />
                        </Switch>
                    </ConnectedRouter>
                    <GlobalLoading />
                </>
            </Provider>
        );
    }

    componentDidMount() {
        store.dispatch({ type: 'LOAD_USER_INFO' });
    }
}

export default App;

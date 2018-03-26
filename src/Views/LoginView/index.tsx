// tslint:disable: jsx-no-multiline-js
import * as React from 'react';

import Card from 'antd/es/card';
import Tabs from 'antd/es/tabs';
import { Switch, Route, RouteComponentProps } from 'react-router';

import UserEntryLayout from '../../Layouts/UserEntryLayout/index';
import WithRecaptcha from '../../lib/withRecaptcha';
import LoginForm from '../../Components/LoginForm';
import ResetPwdForm from '../../Components/ResetPwdForm';
import RegisterForm from '../../Components/RegisterForm';

export interface LoginViewProps extends RouteComponentProps<{}> {
  withVerify: any;
  recaptchaReady: boolean;
}

class LoginView extends React.Component<LoginViewProps, { count: number }> {
  timer = 0;

  state = {
    count: 0,
  };

  renderTab = () => {
    return (
      <Tabs animated={false}>
        <Tabs.TabPane tab="登录" key="login">
          <LoginForm
            withVerify={this.props.withVerify}
            recaptchaReady={this.props.recaptchaReady}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="注册" key="register">
          <RegisterForm
            withVerify={this.props.withVerify}
            recaptchaReady={this.props.recaptchaReady}
          />
        </Tabs.TabPane>
      </Tabs>
    );
  };

  renderResetPwdForm = () => {
    return (
      <Card
        bordered={false}
        style={{ paddingLeft: '0px', paddingRight: '0px' }}
        className="card-no-inner-padding"
        title="重置密码"
      >
        <ResetPwdForm
          withVerify={this.props.withVerify}
          recaptchaReady={this.props.recaptchaReady}
        />
      </Card>
    );
  };

  render() {
    return (
      <UserEntryLayout>
        <Card style={{ height: '470px' }} bordered={false} className="login">
          <Switch>
            <Route path={`${this.props.match.url}/reset_pwd`} component={this.renderResetPwdForm} />
            <Route path={`${this.props.match.url}/`} render={this.renderTab} />
          </Switch>
        </Card>
      </UserEntryLayout>
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }
}

export default WithRecaptcha(LoginView);

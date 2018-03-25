// tslint:disable: jsx-no-multiline-js
import * as React from 'react';

import Card from 'antd/es/card';
import Tabs from 'antd/es/tabs';

import WithRecaptcha from '../../lib/withRecaptcha';
import LoginForm from '../../Components/LoginForm';
import RegisterForm from '../../Components/RegisterForm';

export interface LoginViewProps {
  withVerify: any;
  recaptchaReady: boolean;
}

class LoginView extends React.Component<LoginViewProps, { count: number }> {
  timer = 0;

  state = {
    count: 0,
  };

  render() {
    return (
      <Card style={{ height: '470px' }} bordered={false} className="login">
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
      </Card>
    );
  }

  componentWillUnmount() {
    window.clearInterval(this.timer);
  }
}

export default WithRecaptcha(LoginView);

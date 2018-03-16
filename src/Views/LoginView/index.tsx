import * as React from 'react';
import Checkbox from 'antd/es/checkbox';

import Login from 'ant-design-pro/lib/Login';

import 'ant-design-pro/dist/ant-design-pro.min.css';
import 'antd/lib/button/style/css';

const { UserName, Password, Submit } = Login;

export default class LoginView extends React.Component {
  state = {
    notice: '',
    autoLogin: true,
  };
  render() {
    return (
      <div style={{ backgroundColor: '#fff', padding: '20px', width: '100%' }}>
        <Login>
          <UserName name="username" />
          <Password name="password" />
          <div>
            <Checkbox checked={this.state.autoLogin}>自动登录</Checkbox>
            <a style={{ float: 'right' }} href="">
              忘记密码
            </a>
          </div>
          <Submit>登录</Submit>
        </Login>
      </div>
    );
  }
}

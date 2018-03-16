import * as React from 'react';
import Checkbox from 'antd/es/checkbox';
import Card from 'antd/es/card';
import Icon from 'antd/es/icon';

import Login from 'ant-design-pro/lib/Login';

import 'ant-design-pro/dist/ant-design-pro.min.css';
import 'antd/lib/button/style/css';
import 'antd/lib/card/style/index.css';
import 'antd/lib/icon/style/css';

const { UserName, Password, Submit, Tab } = Login as any;

export default class LoginView extends React.Component {
  state = {
    notice: '',
    autoLogin: true,
  };
  render() {
    return (
      <Card>
        <Login defaultActiveKey="tab1">
          <Tab key="tab1" tab="登录">
            <UserName name="username" placeholder="请输入用户名" />
            <Password name="password" placeholder="请输入密码" />
            <Checkbox checked={this.state.autoLogin}>自动登录</Checkbox>
            <a style={{ float: 'right' }} href="">
              忘记密码
            </a>
            <Submit>登录</Submit>
          </Tab>

          <Tab key="tab2" tab="注册">
            <UserName name="username" placeholder="请输入用户名" />
            <UserName
              name="email"
              placeholder="请输入邮箱"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
            <Password name="password" placeholder="请输入密码" />
            <Password name="re-password" placeholder="请再次输入密码" />
            <Submit>注册</Submit>
          </Tab>
        </Login>
      </Card>
    );
  }
}

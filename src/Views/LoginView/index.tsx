import * as React from 'react';

import throttle from 'lodash-es/throttle';
import { Cancelable } from 'lodash';

import Checkbox from 'antd/es/checkbox';
import Card from 'antd/es/card';
import Icon from 'antd/es/icon';

import Login from 'ant-design-pro/lib/Login';

import 'ant-design-pro/dist/ant-design-pro.min.css';
import 'antd/lib/button/style/css';
import 'antd/lib/card/style/index.css';
import 'antd/lib/icon/style/css';

import request from '../../lib/API';

const { UserName, Password, Submit, Tab } = Login as any;

export default class LoginView extends React.Component {
  state = { autoLogin: true, isInLoginTab: true, regPassword: undefined };
  rule = {
    username: [
      { required: 'true', message: '请输入用户名' },
      { pattern: /^[a-zA-Z0-9_-]{4,16}$/, message: '用户名只能是4～16位数字、字母和下划线的组合' },
      this.generateValidator('username'),
    ],
    password: [
      { required: 'true', message: '请输入密码' },
      {
        pattern: /^(?:\d|[a-zA-Z]|[!@#$%^&*]){6,16}$/,
        message: '密码要求6～16位字母、数字、符号或其组合组成',
      },
    ],
    email: [
      { required: 'true', message: '请输入邮件' },
      {
        pattern: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
        message: '邮箱不合法！',
      },
      this.generateValidator('email'),
    ],
  };

  generateValidator(type: 'username' | 'email') {
    return {
      validator: throttle(async (rule: any, value: string, callback: any) => {
        if (!value) {
          callback();
          return;
        }

        if (this.state.isInLoginTab) {
          callback();
          return;
        }

        const result = await request({
          endpoint: `/v1/user/existence?type=${type}` as any,
          method: 'GET',
          body: {
            valueToCheck: value,
          },
        });

        const name = { username: '用户名', email: '邮箱' }[type];

        if (result.httpStatusCode === 200) {
          if (result.data.existence) {
            callback([new Error(`${name}已存在`)]);
          } else {
            callback();
          }
          return;
        }
        if (result.httpStatusCode >= 400 && result.httpStatusCode < 500) {
          callback();
        }
      }, 500),
    };
  }

  changeAutoLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ autoLogin: e.target.checked });
  };

  onSubmit = (err: any, values: { [k: string]: string }) => {
    if (err) {
      return;
    }
    let count = 0;
    for (const key in values) {
      if (values.hasOwnProperty(key)) {
        if (!values[key]) {
          return;
        }
        count++;
      }
    }
  };

  onTabChange = (key: string) => {
    this.setState({ isInLoginTab: key === 'login' });
  };

  onRegPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ regPassword: e.target.value });
  };

  render() {
    const rule = this.rule;

    return (
      <Card style={{ height: '470px' }} bordered={false}>
        <Login defaultActiveKey="login" onSubmit={this.onSubmit} onTabChange={this.onTabChange}>
          <Tab key="login" tab="登录">
            <UserName name="username" placeholder="请输入用户名" rules={rule.username} />
            <Password name="password" placeholder="请输入密码" rules={rule.password} />
            <Checkbox checked={this.state.autoLogin}>自动登录</Checkbox>
            <a style={{ float: 'right' }} href="">
              忘记密码
            </a>
            <Submit>登录</Submit>
          </Tab>

          <Tab key="reg" tab="注册">
            <UserName name="regUsername" placeholder="请输入用户名" rules={rule.username} />
            <UserName
              name="email"
              placeholder="请输入邮箱"
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              rules={rule.email}
            />
            <Password
              name="regPassword"
              placeholder="请输入密码"
              rules={rule.password}
              onChange={this.onRegPasswordChange}
            />
            <Password
              name="regRePassword"
              placeholder="请再次输入密码"
              rules={
                [
                  ...rule.password,
                  {
                    validator: (_: any, value: string, callback: any) =>
                      callback(
                        value === this.state.regPassword || !value || !this.state.regPassword
                          ? undefined
                          : [new Error('两次输入密码不一致')],
                      ),
                  },
                ] // tslint:disable-next-line:jsx-no-multiline-js
              }
            />
            <Submit>注册</Submit>
          </Tab>
        </Login>
      </Card>
    );
  }
}

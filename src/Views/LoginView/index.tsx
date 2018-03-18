// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import Form, { FormComponentProps } from 'antd/es/form';
import Card from 'antd/es/card';
import Input from 'antd/es/input';
import Tabs from 'antd/es/tabs';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import Checkbox from 'antd/es/checkbox';

import 'antd/lib/form/style/index.css';
import 'antd/lib/card/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/tabs/style/index.css';
import 'antd/lib/icon/style/css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/checkbox/style/index.css';

const patterns = {
  username: /^[a-zA-Z0-9_-]{4,16}$/,
  password: /^(?:\d|[a-zA-Z]|[!@#$%^&*]){6,16}$/,
  email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
};

interface LoginViewProps extends FormComponentProps {
  validateStatus: {
    regUsername: 'success' | 'warning' | 'error' | 'validating';
    regEmail: 'success' | 'warning' | 'error' | 'validating';
  };

  help: {
    regUsername: '';
    regEmail: '';
  };

  requestExistenceCheck: (type: 'username' | 'email', value: string) => void;
}

export { LoginViewProps };

const fields = {
  login: ['username', 'password'],
  register: ['regUsername', 'regEmail', 'regPassword', 'regRePassword'],
};

class LoginView extends React.Component<LoginViewProps> {
  state = {
    type: 'login',
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFields(
      fields[this.state.type as 'login' | 'register'],
      { force: true },
      (err, values) => {
        // console.log(err, values);
      },
    );
  };

  onSwitch = (type: string) => {
    this.setState({
      type,
    });
  };

  handleRegUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.requestExistenceCheck.call(this, 'username', e.target.value);
  };

  handleRegEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.props.requestExistenceCheck.call(this, 'email', e.target.value);
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card style={{ height: '470px' }} bordered={false} className="login">
        <Form onSubmit={this.handleSubmit}>
          <Tabs defaultActiveKey="login" animated={false} onChange={this.onSwitch}>
            <Tabs.TabPane tab="登陆" key="login">
              <Form.Item hasFeedback={true}>
                {getFieldDecorator('username', {
                  rules: [
                    { message: '用户名未输入', required: true },
                    { message: '用户名格式错误', pattern: patterns.username },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder="请输入用户名"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  />,
                )}
              </Form.Item>

              <Form.Item hasFeedback={true}>
                {getFieldDecorator('password', {
                  rules: [
                    { message: '密码未输入', required: true },
                    { message: '密码格式错误', pattern: patterns.password },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder="请输入密码"
                    type="password"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  />,
                )}
              </Form.Item>

              <Checkbox>自动登录</Checkbox>
              <a style={{ float: 'right' }} href="">
                忘记密码
              </a>
              <Form.Item>
                <Button size="large" style={{ width: '100%' }} type="primary" htmlType="submit">
                  登陆
                </Button>
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="注册" key="register">
              <Form.Item hasFeedback={true}>
                {getFieldDecorator('regUsername', {
                  rules: [
                    { message: '用户名未输入', required: true },
                    { message: '用户名格式错误', pattern: patterns.username },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder="请输入用户名"
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                    onChange={this.handleRegUsernameChange}
                  />,
                )}
              </Form.Item>

              <Form.Item hasFeedback={true}>
                {getFieldDecorator('regEmail', {
                  rules: [
                    { message: '邮箱未输入', required: true },
                    { message: '邮箱格式错误', pattern: patterns.email },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder="请输入邮箱"
                    prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                    onChange={this.handleRegEmailChange}
                  />,
                )}
              </Form.Item>

              <Form.Item hasFeedback={true}>
                {getFieldDecorator('regPassword', {
                  rules: [
                    { message: '密码未输入', required: true },
                    { message: '密码格式错误', pattern: patterns.password },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder="请输入密码"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  />,
                )}
              </Form.Item>

              <Form.Item hasFeedback={true}>
                {getFieldDecorator('regRePassword', {
                  rules: [
                    { message: '密码未输入', required: true },
                    { message: '密码格式错误', pattern: patterns.password },
                  ],
                })(
                  <Input
                    size="large"
                    placeholder="请再次输入密码"
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  />,
                )}
              </Form.Item>

              <Form.Item>
                <Button size="large" style={{ width: '100%' }} type="primary" htmlType="submit">
                  注册
                </Button>
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </Card>
    );
  }
}

export default Form.create()(
  connect(
    (state: RootState) => {
      return {
        validateStatus: { regUsername: 'error', regEmail: 'error' },
        help: { regUsername: '', regEmail: '' },
      };
    },
    (dispatch, ownProps: LoginViewProps) => ({
      requestExistenceCheck(valueType: 'username' | 'email', value: string) {
        if (valueType === 'username') {
          const errors = ownProps.form.getFieldsError(['regUsername']) as any;
          if (errors.regUsername || !value) {
            return;
          }
        } else {
          const errors = ownProps.form.getFieldsError(['regEmail']) as any;
          if (errors.regEmail || !value) {
            return;
          }
        }
        dispatch({
          type: 'REQ_EXISTENCE_CHECK',
          payload: {
            valueType,
            value,
          },
        });
      },
    }),
  )(LoginView),
);

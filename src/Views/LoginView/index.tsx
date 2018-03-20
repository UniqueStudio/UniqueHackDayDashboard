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

import { UserEntryData } from '../../redux/reducers/userEntry';

export interface LoginViewProps extends FormComponentProps {
  onFormFieldsChange: (
    tab: keyof UserEntryData,
    fieldName: keyof UserEntryData['login'] | keyof UserEntryData['register'],
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onAutoLoginChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchTab: () => void;
  onLoginSubmit: () => void;
  onRegisterSubmit: () => void;
  userEntry: UserEntryData;
}

class LoginView extends React.Component<LoginViewProps> {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  render() {
    const { userEntry, onFormFieldsChange, onAutoLoginChange, onSwitchTab } = this.props;
    return (
      <Card style={{ height: '470px' }} bordered={false} className="login">
        <Form onSubmit={this.handleSubmit}>
          <Tabs defaultActiveKey={userEntry.tab.value} animated={false} onChange={onSwitchTab}>
            <Tabs.TabPane tab="登陆" key="login">
              <Form.Item {...userEntry.login.username}>
                <Input
                  size="large"
                  placeholder="请输入用户名"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  onChange={onFormFieldsChange.bind(this, 'login', 'username')}
                  value={userEntry.login.username.value}
                />
              </Form.Item>

              <Form.Item {...userEntry.login.password}>
                <Input
                  size="large"
                  placeholder="请输入密码"
                  type="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  onChange={onFormFieldsChange.bind(this, 'login', 'password')}
                  value={userEntry.login.password.value}
                />
              </Form.Item>

              <Checkbox onChange={onAutoLoginChange} checked={userEntry.login.autoLogin.value}>
                自动登录
              </Checkbox>

              <a style={{ float: 'right' }} href="">
                忘记密码
              </a>

              <Form.Item>
                <Button
                  onClick={this.props.onLoginSubmit}
                  size="large"
                  style={{ width: '100%' }}
                  type="primary"
                  htmlType="submit"
                >
                  登陆
                </Button>
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="注册" key="register">
              <Form.Item hasFeedback={true} {...userEntry.register.username}>
                <Input
                  size="large"
                  placeholder="请输入用户名"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  onChange={onFormFieldsChange.bind(this, 'register', 'username')}
                  value={userEntry.register.username.value}
                />
              </Form.Item>

              <Form.Item hasFeedback={true} {...userEntry.register.email}>
                <Input
                  size="large"
                  placeholder="请输入邮箱"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  onChange={onFormFieldsChange.bind(this, 'register', 'email')}
                  value={userEntry.register.email.value}
                />
              </Form.Item>

              <Form.Item hasFeedback={true} {...userEntry.register.password}>
                <Input
                  size="large"
                  placeholder="请输入密码"
                  type="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  onChange={onFormFieldsChange.bind(this, 'register', 'password')}
                  value={userEntry.register.password.value}
                />
              </Form.Item>

              <Form.Item hasFeedback={true} {...userEntry.register.rePassword}>
                <Input
                  size="large"
                  placeholder="请再次输入密码"
                  type="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  onChange={onFormFieldsChange.bind(this, 'register', 'rePassword')}
                  value={userEntry.register.rePassword.value}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  onClick={this.props.onRegisterSubmit}
                  size="large"
                  style={{ width: '100%' }}
                  type="primary"
                  htmlType="submit"
                >
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

export default connect(
  (state: RootState) => {
    return { userEntry: state.userEntry };
  },
  dispatch => ({
    onFormFieldsChange(
      tab: keyof UserEntryData,
      fieldName: keyof UserEntryData['login'] | keyof UserEntryData['register'],
      e: React.ChangeEvent<HTMLInputElement>,
    ) {
      if (tab === 'login') {
        dispatch({
          type: 'LOGIN_FORM_CHANGE',
          payload: { fieldName, changedTo: e.target.value },
        });
      }
      if (tab === 'register') {
        dispatch({
          type: 'REGISTER_FORM_CHANGE',
          payload: { fieldName, changedTo: e.target.value },
        });
      }
    },
    onAutoLoginChange(e: React.ChangeEvent<HTMLInputElement>) {
      dispatch({
        type: 'CHANGE_USER_ENTRY_DATA',
        payload: { autoLogin: e.target.checked },
      });
    },
    onSwitchTab(tab: 'login' | 'register') {
      dispatch({
        type: 'CHANGE_USER_ENTRY_TAB',
        payload: tab,
      });
    },
    onLoginSubmit() {
      dispatch({
        type: 'USER_ENTRY_LOGIN_SUBMIT',
      });
    },
    onRegisterSubmit() {
      dispatch({
        type: 'USER_ENTRY_REGISTER_SUBMIT',
      });
    },
  }),
)(LoginView);

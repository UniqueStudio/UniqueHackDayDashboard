import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';
import throttle from 'lodash-es/throttle';

import Form, { FormComponentProps } from 'antd/es/form';
import Card from 'antd/es/card';
import Input from 'antd/es/input';
import Tabs from 'antd/es/tabs';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import Checkbox from 'antd/es/checkbox';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import 'antd/lib/form/style/index.css';
import 'antd/lib/card/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/tabs/style/index.css';
import 'antd/lib/icon/style/css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/checkbox/style/index.css';
import 'antd/lib/row/style/css';
import 'antd/lib/col/style/css';

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
  onRequestSMS: () => void;
  userEntry: UserEntryData;
}

class LoginView extends React.Component<LoginViewProps, { count: number }> {
  timer = 0;

  state = { count: 0 };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  handleRequestSMS = () => {
    let count = 60;
    this.setState({ count });
    this.props.onRequestSMS();
    this.timer = window.setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  };

  handleRequestSMSThrottled = throttle(this.handleRequestSMS, 60 * 1000);

  render() {
    const { userEntry, onFormFieldsChange, onAutoLoginChange, onSwitchTab } = this.props;
    const { count } = this.state;

    return (
      <Card style={{ height: '470px' }} bordered={false} className="login">
        <Form onSubmit={this.handleSubmit}>
          <Tabs defaultActiveKey={userEntry.tab.value} animated={false} onChange={onSwitchTab}>
            <Tabs.TabPane tab="登录" key="login">
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
                  登录
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

              <Form.Item hasFeedback={true} {...userEntry.register.phone}>
                <Input
                  size="large"
                  placeholder="请输入手机号码"
                  prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  onChange={onFormFieldsChange.bind(this, 'register', 'phone')}
                  value={userEntry.register.phone.value}
                />
              </Form.Item>

              <Form.Item hasFeedback={true} {...userEntry.register.code}>
                <Row gutter={8}>
                  <Col span={16}>
                    <Input
                      size="large"
                      placeholder="请输入短信验证码"
                      prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                      onChange={onFormFieldsChange.bind(this, 'register', 'code')}
                      value={userEntry.register.code.value}
                    />
                  </Col>
                  <Col span={8}>
                    <Button
                      style={{ width: '100%' }}
                      size="large"
                      // tslint:disable-next-line:jsx-no-multiline-js
                      disabled={
                        !!this.state.count ||
                        !userEntry.register.phone.value ||
                        !userEntry.status.smsButtonEnabled
                      }
                      onClick={this.handleRequestSMSThrottled}
                    >
                      {count ? `${count} s` : '获取验证码'}
                    </Button>
                  </Col>
                </Row>
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

  componentWillUnmount() {
    window.clearInterval(this.timer);
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
    onRequestSMS() {
      dispatch({
        type: 'REQUEST_SMS',
      });
    },
  }),
)(LoginView);

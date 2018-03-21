import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';
import throttle from 'lodash-es/throttle';

import Form from 'antd/es/form';
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

import Recaptcha from 'react-recaptcha';

import { UserEntryData } from '../../redux/reducers/userEntry';
import WithRecaptcha from '../../lib/withRecaptcha';

export interface LoginViewProps {
  onFormFieldsChange: (
    tab: keyof UserEntryData,
    fieldName: keyof UserEntryData['login'] | keyof UserEntryData['register'],
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onAutoLoginChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchTab: () => void;
  onLoginSubmit: (token: string) => void;
  onRegisterSubmit: (token: string) => void;
  onRequestSMS: (token: string) => void;
  userEntry: UserEntryData;
  withVerify: any;
  recaptchaReady: boolean;
}

class LoginView extends React.Component<LoginViewProps, { count: number }> {
  timer = 0;

  state = {
    count: 0,
  };

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  handleRequestSMS = throttle((token: string) => {
    let count = 59;
    this.setState({ count });
    this.props.onRequestSMS(token);
    this.timer = window.setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }, 60 * 1000);

  render() {
    const {
      userEntry,
      onFormFieldsChange,
      onAutoLoginChange,
      onSwitchTab,
      withVerify,
    } = this.props;
    const onLoginSubmit = withVerify(this.props.onLoginSubmit);
    const onRegisterSubmit = withVerify(this.props.onRegisterSubmit);
    const handleRequestSMS = withVerify(this.handleRequestSMS);
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
                  // tslint:disable-next-line:jsx-no-multiline-js
                  disabled={
                    userEntry.status.loginButtonLoading ||
                    !userEntry.status.loginButtonEnabled ||
                    !this.props.recaptchaReady
                  }
                  onClick={onLoginSubmit}
                  size="large"
                  style={{ width: '100%' }}
                  type="primary"
                  htmlType="submit"
                >
                  {userEntry.status.loginButtonLoading ? <Icon type="loading" /> : '登录'}
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
                      size="large" // tslint:disable-next-line:jsx-no-multiline-js
                      disabled={
                        !!this.state.count ||
                        !userEntry.register.phone.value ||
                        !userEntry.status.smsButtonEnabled
                      }
                      onClick={handleRequestSMS}
                    >
                      {count ? `${count} s` : '获取验证码'}
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={onRegisterSubmit}
                  // tslint:disable-next-line:jsx-no-multiline-js
                  disabled={
                    userEntry.status.registerButtonLoading ||
                    !userEntry.status.registerButtonEnabled ||
                    !this.props.recaptchaReady
                  }
                  size="large"
                  style={{ width: '100%' }}
                  type="primary"
                  htmlType="submit"
                >
                  {userEntry.status.registerButtonEnabled ? <Icon type="loading" /> : '注册'}
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
        type: 'LOGIN_AUTO_LOGIN_CHANGE',
        payload: e.target.checked,
      });
    },
    onSwitchTab(tab: 'login' | 'register') {
      dispatch({
        type: 'CHANGE_USER_ENTRY_TAB',
        payload: tab,
      });
    },
    onLoginSubmit(token: string) {
      dispatch({
        type: 'USER_ENTRY_LOGIN_SUBMIT',
        payload: token,
      });
    },
    onRegisterSubmit(token: string) {
      dispatch({
        type: 'USER_ENTRY_REGISTER_SUBMIT',
        payload: token,
      });
    },
    onRequestSMS(token: string) {
      dispatch({
        type: 'REQUEST_SMS',
        payload: token,
      });
    },
  }),
)(WithRecaptcha(LoginView));

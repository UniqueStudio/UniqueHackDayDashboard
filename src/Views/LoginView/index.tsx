// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import throttle from 'lodash-es/throttle';

import Card from 'antd/es/card';
import Tabs from 'antd/es/tabs';

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
import WithRecaptcha from '../../lib/withRecaptcha';
import LoginForm from '../../Components/LoginForm';
import RegisterForm from '../../Components/RegisterForm';

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

// connect(
//   (state: RootState) => {
//     return { userEntry: state.userEntry };
//   },
//   dispatch => ({
//     onFormFieldsChange(
//       tab: keyof UserEntryData,
//       fieldName: keyof UserEntryData['login'] | keyof UserEntryData['register'],
//       e: React.ChangeEvent<HTMLInputElement>,
//     ) {
//       if (tab === 'login') {
//         dispatch({
//           type: 'LOGIN_FORM_CHANGE',
//           payload: { fieldName, changedTo: e.target.value },
//         });
//       }
//       if (tab === 'register') {
//         dispatch({
//           type: 'REGISTER_FORM_CHANGE',
//           payload: { fieldName, changedTo: e.target.value },
//         });
//       }
//     },
//     onAutoLoginChange(e: React.ChangeEvent<HTMLInputElement>) {
//       dispatch({
//         type: 'LOGIN_AUTO_LOGIN_CHANGE',
//         payload: e.target.checked,
//       });
//     },
//     onSwitchTab(tab: 'login' | 'register') {
//       dispatch({
//         type: 'CHANGE_USER_ENTRY_TAB',
//         payload: tab,
//       });
//     },
//     onLoginSubmit(token: string) {
//       dispatch({
//         type: 'USER_ENTRY_LOGIN_SUBMIT',
//         payload: token,
//       });
//     },
//     onRegisterSubmit(token: string) {
//       dispatch({
//         type: 'USER_ENTRY_REGISTER_SUBMIT',
//         payload: token,
//       });
//     },
//     onRequestSMS(token: string) {
//       dispatch({
//         type: 'REQUEST_SMS',
//         payload: token,
//       });
//     },
//   }),
// )(

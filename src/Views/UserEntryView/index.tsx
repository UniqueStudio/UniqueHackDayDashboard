// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import Card from 'antd/es/card';
import Tabs from 'antd/es/tabs';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router';

import UserEntryLayout from '../../Layouts/UserEntryLayout/index';
import WithRecaptcha from '../../lib/withRecaptcha';

import MyForm from '../../Components/MyForm/MyForm';
import Username from '../../Components/MyForm/Username';
import Password from '../../Components/MyForm/Password';
import AutoLogin from '../../Components/MyForm/AutoLogin';
import Phone from '../../Components/MyForm/Phone';
import MobileCode from '../../Components/MyForm/MobileCode';
import Submit from '../../Components/MyForm/Submit';
import Text from '../../Components/MyForm/Text';
import { usernameValidator, phoneValidator } from '../../Components/MyForm/validators';
import { patterns } from '../../lib/patterns';

export interface LoginViewProps extends RouteComponentProps<{}> {
  withVerify: (callback: (token: string) => any) => () => Promise<void>;
  recaptchaReady: boolean;

  loginData: any;
  registerData: any;
  resetPwdData: any;

  onLoginFormChange: (keyValue: { [k: string]: any }) => any;
  onRegisterFormChange: (keyValue: { [k: string]: any }) => any;
  onResetPwdFormChange: (keyValue: { [k: string]: any }) => any;
  onLoginSubmit: () => void;
  onRegisterSubmit: () => void;
  onResetPwdSubmit: () => void;

  onRegisterSMSSubmit: () => void;
  onResetPwdSMSSubmit: () => void;

  registerSubmitting: boolean;
  loginSubmitting: boolean;
  resetPwdSubmitting: boolean;
  resetPwdSMSSubmitting: boolean;
  registerSMSSubmitting: boolean;

  registerError: { value: string; time: number };
  loginError: { value: string; time: number };
  resetPwdError: { value: string; time: number };

  loggedIn: boolean;
}

class LoginView extends React.Component<LoginViewProps, { count: number }> {
  onRegisterSMSSend = this.props.withVerify(this.props.onRegisterSMSSubmit);
  onResetPwdSMSSend = this.props.withVerify(this.props.onResetPwdSMSSubmit);

  onLoginSubmit = this.props.withVerify(this.props.onLoginSubmit);
  onRegisterSubmit = this.props.withVerify(this.props.onRegisterSubmit);
  onResetPwdSubmit = this.props.withVerify(this.props.onResetPwdSubmit);

  renderTab = () => {
    const {
      loginData,
      registerData,
      registerError,
      loginError,
      registerSubmitting,
      loginSubmitting,
      registerSMSSubmitting,

      recaptchaReady,
    } = this.props;
    return (
      <Tabs animated={false}>
        <Tabs.TabPane tab="登录" key="login">
          <MyForm
            size="large"
            data={loginData}
            onFormChange={this.props.onLoginFormChange}
            onSubmit={this.onLoginSubmit}
            isSubmitting={loginSubmitting || !recaptchaReady}
            noLayout={true}
            message={loginError ? { ...loginError, type: 'error' } : undefined}
          >
            <Username noLayout={true} />
            <Password noLayout={true} />
            <AutoLogin />
            <Submit style={{ marginTop: 0 }} fullWidth={true} title="登录" />
          </MyForm>
        </Tabs.TabPane>
        <Tabs.TabPane tab="注册" key="register">
          <MyForm
            size="large"
            data={registerData}
            onFormChange={this.props.onRegisterFormChange}
            onSubmit={this.onRegisterSubmit}
            isSubmitting={registerSubmitting || !recaptchaReady}
            noLayout={true}
            message={registerError ? { ...registerError, type: 'error' } : undefined}
          >
            <Username validator={usernameValidator} noLayout={true} />
            <Password noLayout={true} />
            <Phone validator={phoneValidator} noLayout={true} />
            <MobileCode onSend={this.onRegisterSMSSend} isSending={registerSMSSubmitting} />
            <Submit style={{ marginTop: 0 }} fullWidth={true} title="注册" />
          </MyForm>
        </Tabs.TabPane>
      </Tabs>
    );
  };

  renderResetPwdForm = () => {
    const {
      resetPwdData,
      resetPwdSubmitting,
      resetPwdError,
      resetPwdSMSSubmitting,
      recaptchaReady,
    } = this.props;
    return (
      <Card
        bordered={false}
        style={{ paddingLeft: '0px', paddingRight: '0px' }}
        className="card-no-inner-padding"
        title="重置密码"
      >
        <MyForm
          size="large"
          data={resetPwdData}
          onFormChange={this.props.onResetPwdFormChange}
          onSubmit={this.onResetPwdSubmit}
          isSubmitting={resetPwdSubmitting || !recaptchaReady}
          noLayout={true}
          message={resetPwdError ? { ...resetPwdError, type: 'error' } : undefined}
        >
          <Phone noLayout={true} />
          <MobileCode onSend={this.onResetPwdSMSSend} isSending={resetPwdSMSSubmitting} />
          <Text
            pattern={patterns.password}
            fieldName="新密码"
            required={true}
            id="newPassword"
            noLayout={true}
          />
          <Submit style={{ marginTop: 0 }} fullWidth={true} title="重置密" />
        </MyForm>
      </Card>
    );
  };

  render() {
    if (this.props.loggedIn && this.props.location.pathname !== '/user_entry/reset_pwd') {
      return <Redirect to="/" />;
    }
    return (
      <UserEntryLayout>
        <Card bordered={false} className="login">
          <Switch>
            <Route path={`${this.props.match.url}/reset_pwd`} render={this.renderResetPwdForm} />
            <Route path={`${this.props.match.url}/`} render={this.renderTab} />
          </Switch>
        </Card>
      </UserEntryLayout>
    );
  }
}

export default connect(
  (state: RootState) => {
    return {
      loginData: {
        ...state.login,
      },
      registerData: {
        ...state.register,
      },
      resetPwdData: {
        ...state.resetPwd,
      },
      registerSubmitting: state.loadingStatus.registerSubmitting,
      loginSubmitting: state.loadingStatus.loginSubmitting,
      resetPwdSubmitting: state.loadingStatus.resetPwdSubmitting,

      resetPwdSMSSubmitting: state.loadingStatus.resetPwdSMSSubmitting,
      registerSMSSubmitting: state.loadingStatus.registerSMSSubmitting,

      registerError: state.errorStatus.registerError,
      loginError: state.errorStatus.loginError,
      resetPwdError: state.errorStatus.resetPwdError,

      loggedIn: state.auth.loggedIn,
    };
  },
  dispatch => ({
    onLoginFormChange(value: any) {
      dispatch({
        type: 'LOGIN_FORM_CHANGE',
        payload: value,
      });
    },
    onLoginSubmit(token: string) {
      dispatch({
        type: 'LOGIN_FORM_SUBMIT',
        payload: token,
      });
    },
    onRegisterFormChange(value: any) {
      dispatch({
        type: 'REGISTER_FORM_CHANGE',
        payload: value,
      });
    },
    onRegisterSubmit(token: string) {
      dispatch({
        type: 'REGISTER_FORM_SUBMIT',
        payload: token,
      });
    },
    onRegisterSMSSubmit(token: string) {
      dispatch({
        type: 'REGISTER_FORM_SMS_SUBMIT',
        payload: token,
      });
    },
    onResetPwdFormChange(value: any) {
      dispatch({
        type: 'RESET_PWD_FORM_CHANGE',
        payload: value,
      });
    },
    onResetPwdSubmit(token: string) {
      dispatch({
        type: 'RESET_PWD_FORM_SUBMIT',
        payload: token,
      });
    },
    onResetPwdSMSSubmit(token: string) {
      dispatch({
        type: 'RESET_PWD_FORM_SMS_SUBMIT',
        payload: token,
      });
    },
  }),
)(WithRecaptcha(LoginView));

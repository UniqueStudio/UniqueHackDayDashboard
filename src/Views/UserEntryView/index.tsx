// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import Card from 'antd/es/card';
import Tabs from 'antd/es/tabs';
import { Switch, Route, RouteComponentProps, Redirect } from 'react-router';

import UserEntryLayout from '../../Layouts/UserEntryLayout/index';
import WithRecaptcha from '../../lib/withRecaptcha';

import MyForm from '../../lib/MyForm/MyForm';
import Username from '../../lib/MyForm/Username';
import Password from '../../lib/MyForm/Password';
import AutoLogin from '../../lib/MyForm/AutoLogin';
import Phone from '../../lib/MyForm/Phone';
import MobileCode from '../../lib/MyForm/MobileCode';
import Submit from '../../lib/MyForm/Submit';
import { usernameValidator, phoneValidator } from '../../lib/MyForm/validators';

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

  registerLoading: boolean;
  loginLoading: boolean;
  resetPwdSMSLoading: boolean;
  registerSMSLoading: boolean;

  SMSLoading: boolean;
  resetPwdLoading: boolean;

  registerError: string;
  loginError: string;
  resetPwdError: string;

  loggedIn: boolean;
}

class LoginView extends React.Component<LoginViewProps, { count: number }> {
  onRegisterSMSSend = this.props.withVerify(this.props.onRegisterSMSSubmit);
  onResetPwdSMSSend = this.props.withVerify(this.props.onResetPwdSMSSubmit);

  onLoginSubmit = this.props.withVerify(this.props.onLoginSubmit);
  onRegisterSubmit = this.props.withVerify(this.props.onRegisterSubmit);
  onResetPwdSubmit = this.props.withVerify(this.props.onRegisterSubmit);

  renderTab = () => {
    const {
      loginData,
      registerData,
      registerError,
      loginError,
      registerLoading,
      loginLoading,
      registerSMSLoading,
    } = this.props;
    return (
      <Tabs animated={false}>
        <Tabs.TabPane tab="登录" key="login">
          <MyForm
            data={loginData}
            onFormChange={this.props.onLoginFormChange}
            onSubmit={this.onLoginSubmit}
            isSubmitting={loginLoading}
            message={loginError ? { value: loginError, type: 'error' } : undefined}
          >
            <Username />
            <Password />
            <AutoLogin />
            <Submit style={{ marginTop: 0 }} fullWidth={true} title="登录" />
          </MyForm>
        </Tabs.TabPane>
        <Tabs.TabPane tab="注册" key="register">
          <MyForm
            data={registerData}
            onFormChange={this.props.onRegisterFormChange}
            onSubmit={this.onRegisterSubmit}
            isSubmitting={registerLoading}
            message={registerError ? { value: registerError, type: 'error' } : undefined}
          >
            <Username validator={usernameValidator} />
            <Password />
            <Phone validator={phoneValidator} />
            <MobileCode onSend={this.onRegisterSMSSend} isSending={registerSMSLoading} />
            <Submit style={{ marginTop: 0 }} fullWidth={true} title="注册" />
          </MyForm>
        </Tabs.TabPane>
      </Tabs>
    );
  };

  renderResetPwdForm = () => {
    const { resetPwdData, resetPwdLoading, resetPwdError, resetPwdSMSLoading } = this.props;
    return (
      <Card
        bordered={false}
        style={{ paddingLeft: '0px', paddingRight: '0px' }}
        className="card-no-inner-padding"
        title="重置密码"
      >
        <MyForm
          data={resetPwdData}
          onFormChange={this.props.onResetPwdFormChange}
          onSubmit={this.onResetPwdSubmit}
          isSubmitting={resetPwdLoading}
          message={resetPwdError ? { value: resetPwdError, type: 'error' } : undefined}
        >
          <Phone />
          <MobileCode onSend={this.onResetPwdSMSSend} isSending={resetPwdSMSLoading} />
          <Password inputType="text" />
          <Submit style={{ marginTop: 0 }} fullWidth={true} title="重置密码" />
        </MyForm>
      </Card>
    );
  };

  render() {
    if (this.props.loggedIn) {
      return <Redirect to="/" />;
    }
    return (
      <UserEntryLayout>
        <Card style={{ height: '470px' }} bordered={false} className="login">
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
      registerLoading: state.loadingStatus.registerLoading,
      loginLoading: state.loadingStatus.loginLoading,

      resetPwdSMSLoading: state.loadingStatus.resetPwdSMSLoading,
      registerSMSLoading: state.loadingStatus.registerSMSLoading,

      registerError: state.errorStatus.registerError,
      loginError: state.errorStatus.loginError,

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

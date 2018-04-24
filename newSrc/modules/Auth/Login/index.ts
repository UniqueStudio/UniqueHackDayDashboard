import * as React from 'react';
import { connect } from 'react-redux';
import * as TYPE from './action';
import { LoginForm } from './reducer';
import { RouteComponentProps } from 'react-router';

import MyForm from '../../../components/Form/MyForm';
import Username from '../../../components/Form/Username';
import Password from '../../../components/Form/Password';
import AutoLogin from '../../../components/Form/AutoLogin';

export interface LoginViewProps extends RouteComponentProps<{}> {
  withVerify: (callback: (token: string) => any) => () => Promise<void>;
  loginData: LoginForm['data'];
  onLoginFormChange: (keyValue: { [k: string]: any }) => any;
  onLoginSubmit: () => void;
  registerSubmitting: boolean;
  loginSubmitting: boolean;
  loginError: { value: string; time: number };
  loggedIn: boolean;
  recaptchaReady: boolean;
}

class Login extends React.Component<LoginViewProps, { count: number }> {
  onLoginSubmit = this.props.withVerify(this.props.onLoginSubmit);
  render() {
    const { loginData, loginError, loginSubmitting, recaptchaReady } = this.props;
    return (
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
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    loginData: state.loginForm.data,
    loginSubmitting: state.loginForm.isSubmitting,
    loginError: state.loginForm.error,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onLoginFormChange(value: any) {
    dispatch({
      type: TYPE.LOGIN_FORM_CHANGE,
      payload: value,
    });
  },
  onLoginSubmit(token: string) {
    dispatch({
      type: TYPE.LOGIN_FORM_SUBMIT._,
      payload: token,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

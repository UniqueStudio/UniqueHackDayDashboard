import * as React from 'react';
import { connect } from 'react-redux';
import * as TYPE from './action';
import { RegisterForm } from './reducers';
import { RouteComponentProps } from 'react-router';

import MyForm from '../../../components/Form/MyForm';
import Username from '../../../components/Form/Username';
import Password from '../../../components/Form/Password';
import AutoLogin from '../../../components/Form/AutoLogin';

export interface RegisterViewProps extends RouteComponentProps<{}> {
  withVerify: (callback: (token: string) => any) => () => Promise<void>;
  recaptchaReady: boolean;
  registerData: RegisterForm['data'];
  onRegisterFormChange: (keyValue: { [k: string]: any }) => any;
  onRegisterSubmit: () => void;
  onRegisterSMSSubmit: () => void;
  registerSubmitting: boolean;
  registerSMSSubmitting: boolean;
  registerError: { value: string; time: number };
}

class Register extends React.Component<RegisterViewProps, { count: number }> {
  onLoginSubmit = this.props.withVerify(this.props.onLoginSubmit);
  render() {
    const { registerData, registerError, registerSubmitting, recaptchaReady } = this.props;
    return (
      <MyForm
      size="large"
      data={registerData}
      onFormChange={this.props.onRegisterFormChange}
      onSubmit={this.onRegisterSubmit}
      isSubmitting={registerSubmitting || !recaptchaReady}
      noLayout={true}
      message={registerError ? { ...registerError, type: 'error' } : undefined}
    >
      <Username
        validator={usernameValidator}
        noLayout={true}
        tip="允许4～16位字母、数字和下划线组合"
      />
      <Password noLayout={true} tip="允许6～16位字母、数字和符号组合" />
      <Phone validator={phoneValidator} noLayout={true} />
      <MobileCode onSend={this.onRegisterSMSSend} isSending={registerSMSSubmitting} />
      <Submit style={{ marginTop: 0 }} fullWidth={true} title="注册" />
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    registerData: state.loginForm.data,
    registerSubmitting: state.loginForm.isSubmitting,
    registerError: state.loginForm.error,
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  onRegisterFormChange(value: any) {
    dispatch({
      type: TYPE.REGISTER_FORM_CHANGE,
      payload: value,
    });
  },
  onRegisterSubmit(token: string) {
    dispatch({
      type: TYPE.REGISTER_FORM_SUBMIT._,
      payload: token,
    });
  },
  onRegisterSMSSubmit(token: string) {
    dispatch({
      type: TYPE.REGISITER_SEND_SMS_SUBMIT._,
      payload: token,
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);

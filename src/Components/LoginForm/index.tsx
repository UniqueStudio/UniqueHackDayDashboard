// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import Form, { FormComponentProps } from 'antd/es/form';
import Button from 'antd/es/button';
import Input from 'antd/es/input';
import Icon from 'antd/es/icon';
import Checkbox from 'antd/es/checkbox';

import { patterns } from '../../lib/patterns';
import { RecaptchaProps } from '../../lib/withRecaptcha';
import { LoginData } from '../../redux/reducers/login';

export interface LoginFormProps extends LoginData {
  onFormChange: (keyValue: { [k: string]: any }) => any;
  onSubmit: () => void;
}

export { RecaptchaProps };
class LoginForm extends React.Component<LoginFormProps & RecaptchaProps & FormComponentProps> {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any) => {
      if (!err) {
        this.props.withVerify(this.props.onSubmit)();
      }
    });
  };

  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item hasFeedback={true}>
          {getFieldDecorator('username', {
            rules: [
              {
                required: true,
                message: '请输入用户名',
              },
              {
                pattern: patterns.username,
                message: '用户名不合法',
              },
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
              {
                required: true,
                message: '请输入密码',
              },
              {
                pattern: patterns.password,
                message: '密码不合法',
              },
            ],
          })(
            <Input
              size="large"
              type="password"
              placeholder="请输入密码"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item style={{ marginBottom: '20px' }}>
          {getFieldDecorator('autoLogin')(<Checkbox>自动登录</Checkbox>)}
          <a style={{ float: 'right' }} href="">
            忘记密码
          </a>
        </Form.Item>

        <Form.Item>
          <Button size="large" style={{ width: '100%' }} type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

// export default Form.create()(LoginForm);

export default connect(
  (state: RootState) => {
    return state.login;
  },
  dispatch => ({
    onFormChange(value: any) {
      dispatch({
        type: 'LOGIN_FORM_CHANGE',
        payload: value,
      });
    },
    onSubmit(token: string) {
      dispatch({
        type: 'LOGIN_FORM_SUBMIT',
        payload: token,
      });
    },
  }),
)(
  Form.create<LoginFormProps>({
    onFieldsChange(props, value) {
      props.onFormChange(value as any);
    },
    mapPropsToFields(props) {
      return {
        username: Form.createFormField(props.username),
        password: Form.createFormField(props.password),
        autoLogin: Form.createFormField(props.autoLogin),
      };
    },
  })(LoginForm),
);

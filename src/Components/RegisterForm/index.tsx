// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash-es/throttle';

import Form, { FormComponentProps, ValidateCallback } from 'antd/es/form';
import Button from 'antd/es/button';
import Input from 'antd/es/input';
import Icon from 'antd/es/icon';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import { patterns } from '../../redux/sagas/validate';
import { RecaptchaProps } from '../../lib/withRecaptcha';
import { usernameValidator, phoneValidator } from './validators';
import { RootState } from '../../redux/reducers';

export { RecaptchaProps };

export interface RegisterFormProps {
  onFormChange: (keyValue: { [k: string]: string }) => any;

  username: string;
  password: string;
  phone: string;
  code: string;
}

class RegisterForm extends React.Component<
  RegisterFormProps & RecaptchaProps & FormComponentProps
> {
  state = {
    count: 0,
  };

  timer = 0;

  withValidate = (fieldNames: string[], callback: ValidateCallback) => {
    return (...args: any[]) => {
      this.props.form.validateFields(fieldNames, err => {
        if (!err) {
          return callback.call(null, ...args);
        }
      });
    };
  };

  // @Throttle(60 * 1000)
  reallyRequestSMS = throttle((token: string) => {
    let count = 59;
    this.setState({ count });
    this.timer = window.setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }, 60 * 1000);

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        // console.log('Received values of form: ', JSON.stringify(values));
      }
    });
  };

  handleSMSRequest = this.withValidate(['phone'], this.props.withVerify(this.reallyRequestSMS));

  render() {
    const { form: { getFieldDecorator } } = this.props;
    const { count } = this.state;
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
              {
                validator: usernameValidator,
              },
            ],
            validateFirst: true,
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
              { required: true, message: '请输入密码' },
              { pattern: patterns.password, message: '密码不合法' },
            ],
          })(
            <Input
              size="large"
              type="password"
              placeholder="请输入密码"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item hasFeedback={true}>
          {getFieldDecorator('phone', {
            rules: [
              { required: true, message: '请输入手机号码' },
              { pattern: patterns.phone, message: '手机号码不合法' },
              { validator: phoneValidator },
            ],
            validateFirst: true,
          })(
            <Input
              size="large"
              placeholder="请输入电话号码"
              prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item hasFeedback={true}>
          <Row gutter={8}>
            <Col span={16}>
              {getFieldDecorator('code', {
                rules: [
                  { required: true, message: '必须输入验证码' },
                  { pattern: patterns.code, message: '验证码格式不正确' },
                ],
              })(
                <Input
                  size="large"
                  placeholder="请输入短信验证码"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                />,
              )}
            </Col>
            <Col span={8}>
              <Button
                style={{ width: '100%' }}
                size="large"
                disabled={!!this.state.count || !this.props.recaptchaReady}
                onClick={this.handleSMSRequest}
              >
                {this.props.recaptchaReady ? (count ? `${count} s` : '获取验证码') : '正在加载'}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item>
          <Button size="large" style={{ width: '100%' }} type="primary" htmlType="submit">
            {/* {userEntry.status.loginButtonLoading ? <Icon type="loading" /> : '登录'} */}
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(
  (state: RootState) => {
    return state.register;
  },
  dispatch => ({
    onFormChange(...args) {
      console.log(args);
    },
  }),
)(
  Form.create<RegisterFormProps>({
    onValuesChange(props, value) {
      props.onFormChange(value);
    },
    mapPropsToFields(props) {
      return {
        username: Form.createFormField({ value: props.username }),
        password: Form.createFormField({ value: props.password }),
        phone: Form.createFormField({ value: props.phone }),
        code: Form.createFormField({ value: props.code }),
      };
    },
  })(RegisterForm),
);

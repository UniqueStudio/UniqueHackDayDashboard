// tslint:disable: jsx-no-multiline-js

import * as React from 'react';
import { connect } from 'react-redux';
import throttle from 'lodash-es/throttle';

import { RootState } from '../../redux/reducers';

import { RecaptchaProps } from '../../lib/withRecaptcha';
import { patterns } from '../../lib/patterns';

import Form, { FormComponentProps, ValidateCallback } from 'antd/es/form';
import Input from 'antd/es/input';
import Icon from 'antd/es/icon';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import Button from 'antd/es/button';

export interface ResetPwdFormProps {
  onFormChange: (keyValue: { [k: string]: any }) => any;
  onSMSSubmit: (token: string) => void;

  onSubmit: () => void;

  smsLoading: boolean;
}

class ResetPwdForm extends React.Component<
  ResetPwdFormProps & RecaptchaProps & FormComponentProps
> {
  state = {
    count: 0,
  };

  timer = 0;

  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any) => {
      if (!err) {
        this.props.onSubmit();
      }
    });
  };

  reallyRequestSMS = throttle((token: string) => {
    let count = 59;
    this.setState({ count });
    this.props.onSMSSubmit(token);
    this.timer = window.setInterval(() => {
      count -= 1;
      this.setState({ count });
      if (count === 0) {
        clearInterval(this.timer);
      }
    }, 1000);
  }, 60 * 1000);

  withValidate = (fieldNames: string[], callback: ValidateCallback) => {
    return (...args: any[]) => {
      this.props.form.validateFields(fieldNames, err => {
        if (!err) {
          return callback.call(null, ...args);
        }
      });
    };
  };

  handleSMSRequest = this.withValidate(['phone'], this.props.withVerify(this.reallyRequestSMS));

  render() {
    const formItemLayout = {
      labelCol: { xl: 4, lg: 6, md: 7, xs: 24, sm: 24 },
      wrapperCol: { xl: 8, lg: 10, md: 12, xs: 24, sm: 24 },
      hasFeedback: true,
    };
    const { form: { getFieldDecorator } } = this.props;

    const { count } = this.state;
    return (
      <Form onSubmit={this.handleSubmit} className="login">
        <Form.Item {...formItemLayout}>
          {getFieldDecorator('phone', {
            rules: [{ required: true, message: '请输入手机号码' }],
          })(
            <Input
              size="large"
              placeholder="请输入手机号码"
              prefix={<Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item>
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
                disabled={!!this.state.count || !this.props.recaptchaReady || this.props.smsLoading}
                onClick={this.handleSMSRequest}
              >
                {this.props.smsLoading ? (
                  <Icon type="loading" />
                ) : this.props.recaptchaReady ? (
                  count ? (
                    `${count} s`
                  ) : (
                    '获取验证码'
                  )
                ) : (
                  '正在加载'
                )}
              </Button>
            </Col>
          </Row>
        </Form.Item>

        <Form.Item hasFeedback={true}>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入新密码',
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
              placeholder="请输入新密码"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xl: { push: 4, span: 8 },
            lg: { push: 6, span: 10 },
            md: { push: 7, span: 12 },
            xs: 24,
            sm: 24,
          }}
        >
          <Button type="primary" style={{ width: '100%' }} htmlType="submit" size="large">
            重置密码
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(
  (state: RootState) => {
    return {
      smsLoading: state.loadingStatus.smsLoading,
    };
  },
  dispatch => ({
    onFormChange(value: any) {
      dispatch({
        type: 'RESET_PWD_FORM_CHANGE',
        payload: value,
      });
    },
    onSubmit() {
      dispatch({ type: 'RESET_PWD_FORM_SUBMIT' });
    },
    onSMSSubmit(token: string) {
      dispatch({ type: 'RESET_PWD_FORM_SMS_SUBMIT', payload: token });
    },
  }),
)(
  Form.create<ResetPwdFormProps>({
    onFieldsChange(props, value) {
      props.onFormChange(value as any);
    },
    mapPropsToFields(props) {
      return Object.keys(props).reduce(
        (p, key) => ({
          ...p,
          [key]: Form.createFormField((props as any)[key]),
        }),
        {},
      );
    },
  })(ResetPwdForm),
);

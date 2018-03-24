// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';
import throttle from 'lodash-es/throttle';

import Form, { FormComponentProps } from 'antd/es/form';
import Button from 'antd/es/button';
import Input from 'antd/es/input';
import Icon from 'antd/es/icon';
import Checkbox from 'antd/es/checkbox';

import { patterns } from '../../redux/sagas/validate';
import { RecaptchaProps } from '../../lib/withRecaptcha';

export { RecaptchaProps };
class LoginForm extends React.Component<RecaptchaProps & FormComponentProps> {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any, values: any) => {
      if (!err) {
        // console.log('Received values of form: ', JSON.stringify(values));
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
            {/* {userEntry.status.loginButtonLoading ? <Icon type="loading" /> : '登录'} */}
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Form.create()(LoginForm);

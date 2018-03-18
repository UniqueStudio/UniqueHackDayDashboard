import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import Form, { FormComponentProps } from 'antd/es/form';
import Card from 'antd/es/card';
import Input from 'antd/es/input';
import Tabs from 'antd/es/tabs';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import Checkbox from 'antd/es/checkbox';

import 'antd/lib/form/style/index.css';
import 'antd/lib/card/style/index.css';
import 'antd/lib/input/style/index.css';
import 'antd/lib/tabs/style/index.css';
import 'antd/lib/icon/style/css';
import 'antd/lib/button/style/index.css';
import 'antd/lib/checkbox/style/index.css';

import { UserEntryData } from '../../redux/reducers/userEntry';

// const patterns = {
//   username: /^[a-zA-Z0-9_-]{4,16}$/,
//   password: /^(?:\d|[a-zA-Z]|[!@#$%^&*]){6,16}$/,
//   email: /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/,
// };

export interface LoginViewProps extends FormComponentProps {
  onFormFieldsChange: (
    fieldName: keyof UserEntryData,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => void;
  onAutoLoginChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSwitchTab: () => void;
  userEntry: UserEntryData;
}

// export type LoginViewProps = { userEntry: UserEntryData } & DispatchProp<any>;

// const fields = {
//   login: ['username', 'password'],
//   register: ['regUsername', 'regEmail', 'regPassword', 'regRePassword'],
// };

class LoginView extends React.Component<LoginViewProps> {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // this.props.form.validateFields(
    //   fields[this.state.type as 'login' | 'register'],
    //   { force: true },
    //   (err, values) => {
    //     // console.log(err, values);
    //   },
    // );
  };

  render() {
    const { userEntry, onFormFieldsChange, onAutoLoginChange, onSwitchTab } = this.props;
    return (
      <Card style={{ height: '470px' }} bordered={false} className="login">
        <Form onSubmit={this.handleSubmit}>
          <Tabs defaultActiveKey="login" animated={false} onChange={onSwitchTab}>
            <Tabs.TabPane tab="登陆" key="login">
              <Form.Item hasFeedback={true} {...userEntry.username}>
                <Input
                  size="large"
                  placeholder="请输入用户名"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  onChange={onFormFieldsChange.bind(this, 'username')}
                  value={userEntry.username.value}
                />
              </Form.Item>

              <Form.Item hasFeedback={true} {...userEntry.password}>
                <Input
                  size="large"
                  placeholder="请输入密码"
                  type="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  onChange={onFormFieldsChange.bind(this, 'password')}
                  value={userEntry.password.value}
                />
              </Form.Item>

              <Checkbox onChange={onAutoLoginChange} checked={this.props.userEntry.autoLogin.value}>
                自动登录
              </Checkbox>

              <a style={{ float: 'right' }} href="">
                忘记密码
              </a>

              <Form.Item>
                <Button size="large" style={{ width: '100%' }} type="primary" htmlType="submit">
                  登陆
                </Button>
              </Form.Item>
            </Tabs.TabPane>
            <Tabs.TabPane tab="注册" key="register">
              <Form.Item hasFeedback={true} {...userEntry.regUsername}>
                <Input
                  size="large"
                  placeholder="请输入用户名"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  onChange={onFormFieldsChange.bind(this, 'regUsername')}
                  value={userEntry.regUsername.value}
                />
              </Form.Item>

              <Form.Item hasFeedback={true} {...userEntry.regEmail}>
                <Input
                  size="large"
                  placeholder="请输入邮箱"
                  prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  onChange={onFormFieldsChange.bind(this, 'regEmail')}
                  value={userEntry.regEmail.value}
                />
              </Form.Item>

              <Form.Item hasFeedback={true} {...userEntry.regPassword}>
                <Input
                  size="large"
                  placeholder="请输入密码"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  onChange={onFormFieldsChange.bind(this, 'regPassword')}
                  value={userEntry.regPassword.value}
                />
              </Form.Item>

              <Form.Item hasFeedback={true} {...userEntry.regRePassword}>
                <Input
                  size="large"
                  placeholder="请再次输入密码"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,0.25)' }} />}
                  onChange={onFormFieldsChange.bind(this, 'regRePassword')}
                  value={userEntry.regRePassword.value}
                />
              </Form.Item>

              <Form.Item>
                <Button size="large" style={{ width: '100%' }} type="primary" htmlType="submit">
                  注册
                </Button>
              </Form.Item>
            </Tabs.TabPane>
          </Tabs>
        </Form>
      </Card>
    );
  }
}

export default connect(
  (state: RootState) => {
    return { userEntry: state.userEntry };
  },
  dispatch => ({
    onFormFieldsChange(fieldName: keyof UserEntryData, e: React.ChangeEvent<HTMLInputElement>) {
      dispatch({
        type: 'CHANGE_USER_ENTRY_DATA',
        payload: { [fieldName]: e.target.value },
      });
    },
    onAutoLoginChange(e: React.ChangeEvent<HTMLInputElement>) {
      dispatch({
        type: 'CHANGE_USER_ENTRY_DATA',
        payload: { autoLogin: e.target.checked },
      });
    },
    onSwitchTab(tab: 'login' | 'register') {
      dispatch({
        type: 'CHANGE_USER_ENTRY_TAB',
        payload: tab,
      });
    },
  }),
)(LoginView);

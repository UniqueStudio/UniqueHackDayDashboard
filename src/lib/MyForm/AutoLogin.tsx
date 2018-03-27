import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form from 'antd/es/form';

import Checkbox from 'antd/es/checkbox';

export default function AutoLogin(props: any, context: any) {
  const { form: { getFieldDecorator } } = context;
  return (
    <Form.Item style={{ marginBottom: 0 }}>
      {getFieldDecorator('autoLogin')(<Checkbox defaultChecked={true}>自动登录</Checkbox>)}
      <a style={{ float: 'right' }} href="#/user_entry/reset_pwd">
        忘记密码
      </a>
    </Form.Item>
  );
}

(AutoLogin as any).contextTypes = {
  form: PropTypes.object,
};

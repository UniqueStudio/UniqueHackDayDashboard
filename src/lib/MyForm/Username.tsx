// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form from 'antd/es/form';

import { patterns } from '../patterns';

import Input from 'antd/es/input';
import Icon from 'antd/es/icon';

export default function Username(props: any, context: any) {
  const { form: { getFieldDecorator } } = context;
  return (
    <Form.Item hasFeedback={true}>
      {getFieldDecorator('username', {
        rules: [
          { required: true, message: '请输入用户名' },
          { pattern: patterns.username, message: '用户名不合法' },
        ],
      })(
        <Input
          size="large"
          placeholder="请输入用户名"
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
        />,
      )}
    </Form.Item>
  );
}

(Username as any).contextTypes = {
  form: PropTypes.object,
};

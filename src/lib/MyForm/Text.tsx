// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form from 'antd/es/form';

import Input from 'antd/es/input';
import Icon from 'antd/es/icon';

export interface TextProps {
  fieldName?: string;
  id?: string;
  required: boolean;
  label: string;
}

export default function Text(props: any, context: any) {
  const { form: { getFieldDecorator } } = context;
  return (
    <Form.Item hasFeedback={true} label={props.label}>
      {getFieldDecorator(props.id, {
        rules: [
          { required: props.required, message: `请输入${props.fieldName}` },
          { pattern: props.pattern, message: `${props.fieldName}不合法` },
        ],
      })(
        <Input
          size="large"
          placeholder={`请输入${props.fieldName}`}
          prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,0.25)' }} />}
        />,
      )}
    </Form.Item>
  );
}

(Text as any).contextTypes = {
  form: PropTypes.object,
};

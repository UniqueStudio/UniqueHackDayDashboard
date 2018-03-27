// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form from 'antd/es/form';

import Input from 'antd/es/input';
import Icon from 'antd/es/icon';

export interface TextProps {
  fieldName: string;
  id: string;
  required: boolean;
  label?: string;
  pattern?: RegExp;
  inputType?: string;
  iconType?: string;
  validator?: (_: any, value: string, callback: (error?: Error) => any) => void;
  noLayout?: boolean;
}

export default function Text(props: TextProps, context: any) {
  const { form: { getFieldDecorator } } = context;
  const { validator, noLayout } = props;
  const formItemLayout = {
    labelCol: { xl: 4, lg: 6, md: 7, xs: 24, sm: 24 },
    wrapperCol: { xl: 8, lg: 10, md: 12, xs: 24, sm: 24 },
    hasFeedback: true,
  };
  return (
    <Form.Item hasFeedback={true} {...(!noLayout ? formItemLayout : {})} label={props.label}>
      {getFieldDecorator(props.id, {
        rules: [
          { required: props.required, message: `请输入${props.fieldName}` },
          { pattern: props.pattern, message: `${props.fieldName}不合法` },
          ...(validator ? [{ validator }] : []),
        ],
        validateFirst: true,
      })(
        <Input
          size={context.size}
          type={props.inputType}
          placeholder={`请输入${props.fieldName}`}
          prefix={<Icon type={props.iconType || 'user'} style={{ color: 'rgba(0,0,0,0.25)' }} />}
        />,
      )}
    </Form.Item>
  );
}

(Text as any).contextTypes = {
  form: PropTypes.object,
  size: PropTypes.string,
};

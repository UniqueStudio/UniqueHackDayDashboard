// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form from 'antd/es/form';

import Input from 'antd/es/input';

export interface TextAreaProps {
  fieldName: string;
  id: string;
  required: boolean;
  label?: string;
  pattern?: RegExp;
  noLayout?: boolean;

  rows: number;
}

export default function TextArea(props: TextAreaProps, context: any) {
  const { form: { getFieldDecorator } } = context;
  const { noLayout } = props;
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
        ],
        validateFirst: true,
      })(<Input.TextArea placeholder={`请输入${props.fieldName}`} rows={props.rows} />)}
    </Form.Item>
  );
}

(TextArea as any).contextTypes = {
  form: PropTypes.object,
  size: PropTypes.string,
};

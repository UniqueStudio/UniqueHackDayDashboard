import * as React from 'react';
import PropTypes from 'prop-types';
import Form from 'antd/es/form';
import { Group as AntdRadioGroup } from 'antd/es/radio';

export interface RadioProps {
  id: string;
  required: boolean;
  children?: React.ReactNode;
  label: string;
  message: string;
}

export default function RadioGroup(props: RadioProps, context: any) {
  const { form: { getFieldDecorator } } = context;
  const { id, label, message, required, children } = props;
  const formItemLayout = {
    labelCol: { xl: 8, lg: 6, md: 7, xs: 24, sm: 24 },
    wrapperCol: { xl: 8, lg: 10, md: 12, xs: 24, sm: 24 },
    hasFeedback: false,
  };

  return (
    <Form.Item {...formItemLayout} label={label}>
      {getFieldDecorator(id, {
        rules: [{ message, required }],
      })(<AntdRadioGroup>{children}</AntdRadioGroup>)}
    </Form.Item>
  );
}

(RadioGroup as any).contextTypes = {
  form: PropTypes.object,
};

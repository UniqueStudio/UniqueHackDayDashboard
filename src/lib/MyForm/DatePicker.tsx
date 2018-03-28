// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form from 'antd/es/form';

import AntdDatePicker from 'antd/es/date-picker';

export interface DatePickerProps {
  noLayout?: boolean;
  id: string;
  required: boolean;
  fieldName: string;
  label: string;
}

export default function DatePicker(props: DatePickerProps, context: any) {
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
        rules: [{ required: props.required, message: `请选择${props.fieldName}` }],
      })(<AntdDatePicker placeholder={`请选择${props.fieldName}`} />)}
    </Form.Item>
  );
}

(DatePicker as any).contextTypes = {
  form: PropTypes.object,
  size: PropTypes.string,
};

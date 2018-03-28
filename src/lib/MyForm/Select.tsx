// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form from 'antd/es/form';

import AntdSelect from 'antd/es/select';

export interface SelectProps {
  noLayout?: boolean;
  id: string;
  required: boolean;
  fieldName: string;
  label: string;

  children?: React.ReactNode;

  mode?: 'default' | 'multiple' | 'tags' | 'combobox';
}

export default function Select(props: SelectProps, context: any) {
  const { form: { getFieldDecorator } } = context;
  const { noLayout } = props;
  const formItemLayout = {
    labelCol: { xl: 8, lg: 6, md: 7, xs: 24, sm: 24 },
    wrapperCol: { xl: 8, lg: 10, md: 12, xs: 24, sm: 24 },
    hasFeedback: true,
  };
  return (
    <Form.Item hasFeedback={true} {...(!noLayout ? formItemLayout : {})} label={props.label}>
      {getFieldDecorator(props.id, {
        rules: [{ required: props.required, message: `请选择${props.fieldName}` }],
      })(
        <AntdSelect mode={props.mode} placeholder={`请选择${props.fieldName}`}>
          {props.children}
        </AntdSelect>,
      )}
    </Form.Item>
  );
}

(Select as any).contextTypes = {
  form: PropTypes.object,
  size: PropTypes.string,
};

(Select as any).Option = AntdSelect.Option;
(Select as any).OptGroup = AntdSelect.OptGroup;

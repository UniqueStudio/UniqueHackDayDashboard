// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form from 'antd/es/form';

import Button from 'antd/es/button';

export default function Submit(props: any, context: any) {
  const { form, onSubmit } = context;
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    form.validateFieldsAndScroll((err: any) => {
      if (!err) {
        onSubmit();
      }
    });
  }
  return (
    <Form.Item
      wrapperCol={{
        xl: { push: 4, span: 8 },
        lg: { push: 6, span: 10 },
        md: { push: 7, span: 12 },
        xs: 24,
        sm: 24,
      }}
    >
      <Button
        type="primary"
        style={{ marginTop: '16px' }}
        size="large"
        htmlType="submit"
        onClick={handleSubmit}
      >
        创建队伍
      </Button>
    </Form.Item>
  );
}

(Submit as any).contextTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.func,
};

// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form from 'antd/es/form';
import Icon from 'antd/es/icon';
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
      wrapperCol={
        props.fullWidth
          ? undefined
          : {
              xl: { push: 4, span: 8 },
              lg: { push: 6, span: 10 },
              md: { push: 7, span: 12 },
              xs: 24,
              sm: 24,
            }
      }
    >
      <Button
        size={context.size}
        type="primary"
        style={{ marginTop: '0px', ...(props.fullWidth ? { width: '100%' } : {}) }}
        htmlType="submit"
        onClick={handleSubmit}
        disabled={context.isSubmitting}
      >
        {context.isSubmitting ? <Icon type="loading" /> : props.title}
      </Button>
    </Form.Item>
  );
}

(Submit as any).contextTypes = {
  form: PropTypes.object,
  onSubmit: PropTypes.func,
  isSubmitting: PropTypes.bool,
  size: PropTypes.string,
};

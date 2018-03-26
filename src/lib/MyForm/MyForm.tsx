// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form, { FormComponentProps } from 'antd/es/form';

import Username from './Username';

export interface FormMessage {
  value: string;
  type: 'error' | 'warning';
}

export interface MyFormProps {
  onFormChange: (data: any) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  message?: FormMessage;

  data: { [k: string]: any };
}

class MyForm extends React.Component<MyFormProps & FormComponentProps> {
  render() {
    const { children } = this.props;
    return <Form className="my-form">{children}</Form>;
  }

  getChildContext() {
    return { form: this.props.form, onSubmit: this.props.onSubmit };
  }

  static childContextTypes = {
    form: PropTypes.object,
    onSubmit: PropTypes.func,
  };
}

export default Form.create<MyFormProps>({
  onFieldsChange(props, value) {
    props.onFormChange(value as any);
  },
  mapPropsToFields(props) {
    return Object.keys(props.data).reduce(
      (p, key) => ({
        ...p,
        [key]: Form.createFormField((props.data as any)[key]),
      }),
      {},
    );
  },
})(MyForm);

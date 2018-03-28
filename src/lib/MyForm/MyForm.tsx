// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form, { FormComponentProps } from 'antd/es/form';
import Alert from 'antd/es/alert';
import Row from 'antd/es/row';
import Col from 'antd/es/col';

import delay from '../delay';

const AnyAlert = Alert as any;

export interface FormMessage {
  value: string;
  type: 'success' | 'info' | 'warning' | 'error';
}

export interface MyFormProps {
  onFormChange: (data: any) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  message?: FormMessage;

  size?: string;
  data: { [k: string]: any };
}

class MyForm extends React.Component<MyFormProps & FormComponentProps> {
  state = {
    showMessage: false,
  };

  handleMessageClose = async () => {
    await delay(1000);
    this.setState({
      showMessage: false,
    });
  };

  render() {
    const { children, message } = this.props;
    const { showMessage } = this.state;
    return (
      <Form className="my-form">
        {message &&
          showMessage && (
            <Row>
              <Col
                {...{
                  xl: { push: 8, span: 8 },
                  lg: { push: 6, span: 10 },
                  md: { push: 7, span: 12 },
                  xs: 24,
                  sm: 24,
                }}
              >
                <AnyAlert
                  message={message.value}
                  showIcon={true}
                  type={message.type}
                  closable={true}
                  onClose={this.handleMessageClose}
                />
              </Col>
            </Row>
          )}

        {children}
      </Form>
    );
  }

  getChildContext() {
    return {
      form: this.props.form,
      onSubmit: this.props.onSubmit,
      isSubmitting: this.props.isSubmitting,
      size: this.props.size,
    };
  }

  static childContextTypes = {
    form: PropTypes.object,
    onSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    size: PropTypes.string,
  };

  componentWillReceiveProps(nextProps: MyFormProps) {
    const { message: nextMessage, isSubmitting: nextIsSubmitting } = nextProps;
    if (!this.state.showMessage) {
      if (nextMessage && !nextIsSubmitting) {
        this.setState({ showMessage: true });
      }
    }
  }
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

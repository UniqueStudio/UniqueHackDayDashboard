// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import * as PropTypes from 'prop-types';

import Form, { FormComponentProps } from 'antd/es/form';
import Alert from 'antd/es/alert';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import moment from 'moment';

import delay from '../../lib/delay';

const AnyAlert = Alert as any;

export interface FormMessage {
  value: string;
  type: 'success' | 'info' | 'warning' | 'error';
  time: number;
}

export interface MyFormProps {
  onFormChange: (data: any) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  message?: FormMessage;

  size?: string;
  data: { [k: string]: any };
  noLayout?: boolean;
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

  scrollDiv: HTMLDivElement | null = null;

  scrollDivRef = (ele: HTMLDivElement) => {
    if (ele) {
      this.scrollDiv = ele;
    }
  };

  render() {
    const { children, message } = this.props;
    const { showMessage } = this.state;
    return (
      <Form className="my-form">
        <div ref={this.scrollDivRef} />
        {message &&
          showMessage && (
            <Row>
              <Col
                {...(this.props.noLayout
                  ? {}
                  : {
                      xl: { push: 8, span: 8 },
                      lg: { push: 6, span: 10 },
                      md: { push: 7, span: 12 },
                      xs: 24,
                      sm: 24,
                    })}
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
      hasError: Object.values(this.props.form.getFieldsError()).filter(err => !!err).length > 0,
    };
  }

  static childContextTypes = {
    form: PropTypes.object,
    onSubmit: PropTypes.func,
    isSubmitting: PropTypes.bool,
    size: PropTypes.string,
    hasError: PropTypes.bool,
  };

  componentWillReceiveProps(nextProps: MyFormProps) {
    const { message = { time: 0 } } = this.props;
    const { message: nextMessage, isSubmitting: nextIsSubmitting } = nextProps;
    if (
      nextMessage &&
      nextMessage.value &&
      nextMessage.time !== message.time &&
      !nextIsSubmitting
    ) {
      setTimeout(() => {
        if (this.scrollDiv) {
          this.scrollDiv.scrollIntoView();
        }
      }, 100);

      if (!this.state.showMessage) {
        this.setState({ showMessage: true });
      }
    }
  }
}

export default Form.create<MyFormProps>({
  onFieldsChange(props, value) {
    props.onFormChange(value as any);
  },
  mapPropsToFields({ data: props }) {
    return Object.keys(props).reduce(
      (p, key) => ({
        ...p,
        [key]: isDateValue(key)
          ? Form.createFormField({
              ...(props as any)[key],
              value: (props as any)[key].value ? moment((props as any)[key].value) : undefined,
            })
          : Form.createFormField((props as any)[key]),
      }),
      {},
    );
  },
})(MyForm);

function isDateValue(props: string) {
  return props === 'birthday' || props === 'graduateTime';
}

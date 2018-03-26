// tslint:disable: jsx-no-multiline-js

import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import Form, { FormComponentProps } from 'antd/es/form';
import Input from 'antd/es/input';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';

export interface JoinTeamFormProps {
  onFormChange: (keyValue: { [k: string]: any }) => any;

  onSubmit: () => void;
  teamLeaderName: any;
  teamLeaderPhone: any;
}

class JoinTeamForm extends React.Component<JoinTeamFormProps & FormComponentProps> {
  handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err: any) => {
      if (!err) {
        this.props.onSubmit();
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { xl: 4, lg: 6, md: 7, xs: 24, sm: 24 },
      wrapperCol: { xl: 8, lg: 10, md: 12, xs: 24, sm: 24 },
      hasFeedback: true,
    };
    const { form: { getFieldDecorator } } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="team-form">
        <Form.Item {...formItemLayout} label="队长名字:">
          {getFieldDecorator('teamLeaderName', {
            rules: [{ required: true }],
          })(
            <Input
              placeholder="请输入队长名字"
              prefix={<Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="队长电话号码:">
          {getFieldDecorator('teamLeaderPhone', {
            rules: [{ required: true }],
          })(
            <Input
              placeholder="请输入队长电话号码"
              prefix={<Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,0.25)' }} />}
            />,
          )}
        </Form.Item>

        <Form.Item
          wrapperCol={{
            xl: { push: 4, span: 8 },
            lg: { push: 6, span: 10 },
            md: { push: 7, span: 12 },
            xs: 24,
            sm: 24,
          }}
        >
          <Button type="primary" htmlType="submit">
            加入该队伍
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default connect(
  ({ teamForm }: RootState) => {
    return {
      teamLeaderName: teamForm.teamLeaderName,
      teamLeaderPhone: teamForm.teamLeaderPhone,
    };
  },
  dispatch => ({
    onFormChange(value: any) {
      dispatch({
        type: 'JOIN_TEAM_FORM_CHANGE',
        payload: value,
      });
    },
    onSubmit() {
      dispatch({ type: 'JOIN_TEAM_FORM_SUBMIT' });
    },
  }),
)(
  Form.create<JoinTeamFormProps>({
    onFieldsChange(props, value) {
      props.onFormChange(value as any);
    },
    mapPropsToFields(props) {
      return Object.keys(props).reduce(
        (p, key) => ({
          ...p,
          [key]: Form.createFormField((props as any)[key]),
        }),
        {},
      );
    },
  })(JoinTeamForm),
);

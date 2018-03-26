// tslint:disable: jsx-no-multiline-js

import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import Form, { FormComponentProps } from 'antd/es/form';
import Input from 'antd/es/input';
import Icon from 'antd/es/icon';
import Button from 'antd/es/button';
import Alert from 'antd/es/alert';

import MyForm from '../../lib/MyForm/MyForm';
import Text from '../../lib/MyForm/Text';
import Submit from '../../lib/MyForm/Submit';

export interface NewTeamFormProps {
  onFormChange: (keyValue: { [k: string]: any }) => any;

  onSubmit: () => void;
  data: any;
}

class NewTeamForm extends React.Component<NewTeamFormProps> {
  render() {
    const formItemLayout = {
      labelCol: { xl: 4, lg: 6, md: 7, xs: 24, sm: 24 },
      wrapperCol: { xl: 8, lg: 10, md: 12, xs: 24, sm: 24 },
      hasFeedback: true,
    };
    // const { form: { getFieldDecorator } } = this.props;

    return (
      // <Form onSubmit={this.handleSubmit} className="team-form">
      //   <Alert message="你可以随时更改队伍名称" showIcon={true} />
      //   <Form.Item {...formItemLayout} label="队伍名称">
      //     {getFieldDecorator('teamName', {
      //       rules: [{ required: true }],
      //     })(
      //       <Input
      //         placeholder="请输入队伍的名称"
      //         prefix={<Icon type="usergroup-add" style={{ color: 'rgba(0,0,0,0.25)' }} />}
      //       />,
      //     )}
      //   </Form.Item>

      //   <Form.Item
      //     wrapperCol={{
      //       xl: { push: 4, span: 8 },
      //       lg: { push: 6, span: 10 },
      //       md: { push: 7, span: 12 },
      //       xs: 24,
      //       sm: 24,
      //     }}
      //   >
      //     <Button type="primary" htmlType="submit">
      //       创建队伍
      //     </Button>
      //   </Form.Item>
      // </Form>
      <MyForm
        onFormChange={this.props.onFormChange}
        data={this.props.data}
        onSubmit={() => console.log('dsfghj')}
        isSubmitting={false}
      >
        <Text required={true} fieldName="队伍名" id="teamName" label="队伍名" />
        <Submit />
      </MyForm>
    );
  }
}

export default connect(
  (state: RootState) => {
    return {
      data: {
        teamName: state.teamForm.teamName,
      },
    };
  },
  dispatch => ({
    onFormChange(value: any) {
      dispatch({
        type: 'NEW_TEAM_FORM_CHANGE',
        payload: value,
      });
    },
    onSubmit() {
      dispatch({ type: 'NEW_TEAM_FORM_SUBMIT' });
    },
  }),
)(NewTeamForm);

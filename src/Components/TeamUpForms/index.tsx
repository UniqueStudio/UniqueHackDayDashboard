import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import Form, { FormComponentProps } from 'antd/es/form';
import Radio from 'antd/es/radio';

import NewTeamForm from '../NewTeamForm';
import JoinTeamForm from '../JoinTeamForm/index';

export interface TeamUpFormsProps {
  onSubmit: () => void;
}

class TeamUpForms extends React.Component<TeamUpFormsProps & FormComponentProps> {
  state = {
    formIndex: 0,
  };

  handleSubmit = () => void 0;

  handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ formIndex: parseInt(e.target.value, 10) });
  };

  render() {
    const formItemLayout = {
      labelCol: { xl: 4, lg: 6, md: 7, xs: 24, sm: 24 },
      wrapperCol: { xl: 8, lg: 10, md: 12, xs: 24, sm: 24 },
      hasFeedback: true,
    };
    return (
      <div style={{ marginTop: '20px' }}>
        <Form.Item {...formItemLayout} label="我的角色:">
          <Radio.Group defaultValue="0" onChange={this.handleRadioChange}>
            <Radio.Button value="0">队长</Radio.Button>
            <Radio.Button value="1">队员</Radio.Button>
            <Radio.Button value="2">暂不组队</Radio.Button>
          </Radio.Group>
        </Form.Item>
        {[<NewTeamForm key="0" />, <JoinTeamForm key="1" />][this.state.formIndex]}
      </div>
    );
  }
}

export default TeamUpForms;

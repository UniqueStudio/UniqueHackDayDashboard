// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import { connect } from 'react-redux';
import { RootState } from '../../redux/reducers';

import Form from 'antd/es/form';
import Radio, { RadioChangeEvent } from 'antd/es/radio';

import MyForm from '../../Components/MyForm/MyForm';
import Text from '../../Components/MyForm/Text';
import Submit from '../../Components/MyForm/Submit';

import { patterns } from '../../lib/patterns';

import Alert from 'antd/es/alert';
import Button from 'antd/es/button';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import TeamInfo from '../../Components/TeamInfo';

export interface TeamUpViewProps {
  teamUpSkippable?: boolean;
  onSkipTeamUpClick?: () => void;

  newTeamData: any;
  joinTeamData: any;

  onNewTeamFormChange: (keyValue: { [k: string]: any }) => any;
  onJoinTeamFormChange: (keyValue: { [k: string]: any }) => any;

  onNewTeamSubmit: () => void;
  onJoinTeamSubmit: () => void;

  newTeamSubmitting: boolean;
  newTeamError: { value: string; time: number };

  joinTeamSubmitting: boolean;
  joinTeamError: { value: string; time: number };

  teamId: number;
}

class TeamUpView extends React.Component<TeamUpViewProps> {
  state = {
    formIndex: 0,
  };

  handleSubmit = () => void 0;

  handleRadioChange = (e: RadioChangeEvent) => {
    this.setState({ formIndex: parseInt(e.target.value, 10) });
  };

  formItemLayout = {
    labelCol: { xl: 8, lg: 6, md: 7, xs: 24, sm: 24 },
    wrapperCol: { xl: 8, lg: 10, md: 12, xs: 24, sm: 24 },
    hasFeedback: true,
  };

  render() {
    if (this.props.teamId !== null) {
      return <TeamInfo />;
    }
    return (
      <div style={{ marginTop: '20px' }}>
        <Form.Item {...this.formItemLayout} label="我的角色:">
          <Radio.Group defaultValue="0" onChange={this.handleRadioChange}>
            <Radio.Button value="0">队长</Radio.Button>
            <Radio.Button value="1">队员</Radio.Button>
            {!this.props.teamUpSkippable && <Radio.Button value="2">暂不组队</Radio.Button>}
          </Radio.Group>
        </Form.Item>
        {
          [this.renderNewTeamForm(), this.renderJoinTeamForm(), this.renderNoTeamUp()][
            this.state.formIndex
          ]
        }
      </div>
    );
  }

  renderNewTeamForm = () => {
    const { newTeamData, onNewTeamFormChange, onNewTeamSubmit, newTeamError } = this.props;
    return (
      <div>
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
            <Alert
              showIcon={true}
              type="info"
              description="你可以在作品提交结束之前随时修改队伍名"
              message="提示"
            />
          </Col>
        </Row>
        <MyForm
          data={newTeamData}
          onFormChange={onNewTeamFormChange}
          onSubmit={onNewTeamSubmit}
          isSubmitting={this.props.newTeamSubmitting}
          message={newTeamError ? { ...newTeamError, type: 'error' } : undefined}
        >
          <Text required={true} id="teamName" fieldName="队伍名" label="队伍名" />
          <Submit title="创建队伍" />
        </MyForm>
      </div>
    );
  };

  renderJoinTeamForm = () => {
    const {
      joinTeamData,
      onJoinTeamFormChange,
      onJoinTeamSubmit,
      joinTeamSubmitting,
      joinTeamError,
    } = this.props;
    return (
      <MyForm
        data={joinTeamData}
        onFormChange={onJoinTeamFormChange}
        onSubmit={onJoinTeamSubmit}
        isSubmitting={joinTeamSubmitting}
        message={joinTeamError ? { ...joinTeamError, type: 'error' } : undefined}
      >
        <Text
          required={true}
          label="队长姓名"
          id="teamLeaderName"
          fieldName="队长姓名"
          // pattern={patterns.username}
        />
        <Text
          required={true}
          label="队长手机号"
          id="teamLeaderPhone"
          fieldName="队长手机号"
          pattern={patterns.phone}
        />
        <Submit title="查找并加入" />
      </MyForm>
    );
  };

  renderNoTeamUp = () => {
    return (
      <div style={{ marginBottom: '24px' }}>
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
            <Alert
              showIcon={true}
              type="warning"
              description="我们推荐尽早组队，但是只要作品提交未结束你可以随时进行组队"
              message="注意"
            />
            <Button
              type="primary"
              style={{ marginTop: '10px' }}
              onClick={this.props.onSkipTeamUpClick}
            >
              好的，下一步
            </Button>
          </Col>
        </Row>
      </div>
    );
  };
}

export default connect(
  ({ teamForm, loadingStatus, errorStatus, user }: RootState) => {
    return {
      newTeamData: {
        teamName: teamForm.teamName,
      },
      joinTeamData: {
        teamLeaderName: teamForm.teamLeaderName,
        teamLeaderPhone: teamForm.teamLeaderPhone,
      },

      newTeamSubmitting: loadingStatus.newTeamSubmitting,
      newTeamError: errorStatus.newTeamError,
      joinTeamSubmitting: loadingStatus.joinTeamSubmitting,
      joinTeamError: errorStatus.joinTeamError,

      teamId: user.teamId,
    };
  },
  dispatch => ({
    onNewTeamFormChange(value: any) {
      dispatch({
        type: 'NEW_TEAM_FORM_CHANGE',
        payload: value,
      });
    },
    onNewTeamSubmit() {
      dispatch({ type: 'NEW_TEAM_FORM_SUBMIT' });
    },
    onJoinTeamFormChange(value: any) {
      dispatch({
        type: 'JOIN_TEAM_FORM_CHANGE',
        payload: value,
      });
    },
    onJoinTeamSubmit() {
      dispatch({ type: 'JOIN_TEAM_FORM_SUBMIT' });
    },
  }),
)(TeamUpView);

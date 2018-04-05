import * as React from 'react';

import Card from 'antd/es/card';
import Steps from 'antd/es/steps';
import Message from 'antd/es/message';

import { connect } from 'react-redux';

import DetailView from '../../Views/DetailView';
import TeamUpView from '../../Views/TeamUpView/index';

import Alert from 'antd/es/alert';
import Button from 'antd/es/button';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import ApplyConfirmView from '../ApplyConfirmView';
import { RootState } from '../../redux/reducers/index';
export interface ApplyViewProps {
  maxStep: number;
  applyProcessStart: () => void;
  skipTeamUp: () => void;
}

class ApplyView extends React.Component<ApplyViewProps> {
  state = {
    stepIndex: 0,
  };

  setIndexMaker = (stepIndex: number) => () => {
    const isForbiddenClick = stepIndex >= this.props.maxStep;
    this.setState({ stepIndex: isForbiddenClick ? this.props.maxStep : stepIndex });
    if (isForbiddenClick) {
      Message.error('请先完成当前步骤！');
    }
  };

  render() {
    const renderMethods = [
      this.renderDetailView,
      this.renderTeamUpView,
      this.renderConfirm,
      this.renderDone,
    ];
    return (
      <Card bordered={false} title="完善报名信息">
        <Steps current={this.state.stepIndex} size="small">
          <Steps.Step onClick={this.setIndexMaker(0)} title="填写信息" />
          <Steps.Step onClick={this.setIndexMaker(1)} title="组队" />
          <Steps.Step onClick={this.setIndexMaker(2)} title="确认报名" />
          <Steps.Step onClick={this.setIndexMaker(3)} title="完成报名" />
        </Steps>
        {renderMethods[this.state.stepIndex]()}
      </Card>
    );
  }

  renderDone = () => {
    return (
      <div style={{ marginBottom: '24px' }}>
        <Row>
          <Col
            {...{
              xl: { push: 7, span: 10 },
              lg: { push: 6, span: 12 },
              md: { push: 5, span: 14 },
              xs: 24,
              sm: 24,
            }}
          >
            <Alert
              showIcon={true}
              type="warning"
              description="我们已经收集到了所有需要的信息，请确认是否报名参加"
              message="注意"
            />
            <Button type="primary" style={{ marginTop: '10px' }}>
              确认参赛
            </Button>
          </Col>
        </Row>
      </div>
    );
  };

  renderConfirm = () => {
    return <ApplyConfirmView />;
  };

  renderTeamUpView = () => {
    return <TeamUpView onSkipTeamUpClick={this.props.skipTeamUp} />;
  };

  renderDetailView = () => {
    return <DetailView />;
  };

  componentWillReceiveProps({ maxStep }: ApplyViewProps) {
    this.setState({ stepIndex: maxStep });
  }

  componentDidMount() {
    this.props.applyProcessStart();
    this.setState({ stepIndex: this.props.maxStep });
  }
}

export default connect(
  ({ applyProcess: { maxStep } }: RootState) => ({
    maxStep,
  }),
  dispatch => ({
    applyProcessStart() {
      dispatch({ type: 'APPLY_PROCESS_START' });
    },
    skipTeamUp() {
      dispatch({ type: 'CHANGE_TEAM_FORM_STATUS' });
    },
  }),
)(ApplyView);

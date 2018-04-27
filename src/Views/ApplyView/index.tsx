import * as React from 'react';

import Card from 'antd/es/card';
import Steps from 'antd/es/steps';

import { connect } from 'react-redux';

import DetailView from '../../Views/DetailView';
import TeamUpView from '../../Views/TeamUpView/index';

import Alert from 'antd/es/alert';
import Button from 'antd/es/button';
import Row from 'antd/es/row';
import Col from 'antd/es/col';
import ApplyConfirmView from '../ApplyConfirmView';
import { RootState } from '../../redux/reducers/index';
import Message from 'antd/es/message';
import { Redirect } from 'react-router';
export interface ApplyViewProps {
  maxStep: number;
  currentStep: number;
  applyProcessStart: () => void;
  applyProcessEnd: () => void;
  skipTeamUp: () => void;
  setCurrent: (i: number) => void;
  isApplyConfirmed: boolean;
}

class ApplyView extends React.Component<ApplyViewProps> {
  initialIsC = this.props.isApplyConfirmed;
  state = {
    stepIndex: 0,
  };

  setCurrentMaker = (stepIndex: number) => () => {
    if (stepIndex > this.props.maxStep) {
      Message.error('请先完成之前的步骤！');
    }
    this.props.setCurrent(stepIndex);
  };

  render() {
    if (this.initialIsC) {
      return <Redirect to="/" />;
    }

    const renderMethods = [
      this.renderDetailView,
      this.renderTeamUpView,
      this.renderConfirm,
      this.renderDone,
    ];
    const Step = Steps.Step;
    return (
      <Card bordered={false} title="完善报名信息">
        <Steps current={this.props.currentStep} size="small">
          <Step style={{ cursor: 'pointer' }} onClick={this.setCurrentMaker(0)} title="填写信息" />
          <Step style={{ cursor: 'pointer' }} onClick={this.setCurrentMaker(1)} title="组队" />
          <Step style={{ cursor: 'pointer' }} onClick={this.setCurrentMaker(2)} title="确认报名" />
          <Step style={{ cursor: 'pointer' }} onClick={this.setCurrentMaker(3)} title="完成报名" />
        </Steps>
        {renderMethods[this.props.currentStep]()}
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
              type="success"
              description="我们很高兴你确认报名 Unique Hackday，我们将立刻审阅你提交的信息并在第一时间将你是否入选通知于你，静候佳音吧！"
              message="恭喜"
            />
            <Button
              type="primary"
              style={{ marginTop: '10px' }}
              onClick={this.props.applyProcessEnd}
            >
              完成
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
    if (!this.props.isApplyConfirmed) {
      this.props.applyProcessStart();
    }
    this.setState({ stepIndex: this.props.maxStep });
  }
}

export default connect(
  ({ applyProcess: { maxStep, currentStep }, user: { isApplyConfirmed } }: RootState) => ({
    maxStep,
    currentStep,
    isApplyConfirmed,
  }),
  dispatch => ({
    applyProcessStart() {
      dispatch({ type: 'APPLY_PROCESS_START' });
    },
    applyProcessEnd() {
      dispatch({ type: 'APPLY_PROCESS_END' });
    },
    skipTeamUp() {
      dispatch({ type: 'CHANGE_IS_T_SUBMIT' });
    },
    setCurrent(i: number) {
      dispatch({ type: 'APPLY_PROCESS_SET_CURRENT', payload: i });
    },
  }),
)(ApplyView);

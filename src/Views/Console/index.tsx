import * as React from 'react';
import Button from 'antd/es/button';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Card from 'antd/es/card';
// import { Redirect } from 'react-router';

import Status from '../../Components/Status';
import TeamInfo from '../../Components/TeamInfo';
import HackdayProgress from '../../Components/HackdayProgress';
import { RootState } from '../../redux/reducers';
import * as TYPE from '../../redux/actions';
// import { connect } from 'react-redux';

class Console extends React.Component<{
  userIsAccepted: boolean | null;
  push: typeof push;
  abortCompetition: any;
  inWaitList: boolean;
}> {
  renderDivider() {
    return <div style={{ height: '20px' }} />;
  }

  render() {
    const { userIsAccepted, inWaitList } = this.props;
    let icon = { type: 'question', color: '#ffaf40' };
    let statusText = '等待审核';

    if (userIsAccepted === true) {
      statusText = '已通过';
      icon = { type: 'check', color: '#44B800' };
    } else if (userIsAccepted === false) {
      statusText = '未通过';
      icon = { type: 'close', color: '#f5222d' };
    } else if (inWaitList) {
      statusText = '等待列表';
    }

    return (
      <div style={{ paddingBottom: '40px' }}>
        <Status icon={icon} statusText={statusText} buttons={this.renderStatusButtons()} />
        {this.renderDivider()}
        <TeamInfo />
        {this.renderDivider()}
        <HackdayProgress />
        {this.renderDivider()}
        {statusText === '已通过' && this.renderScanCode()}
      </div>
    );
  }

  renderScanCode() {
    return (
      <Card cover={<img alt="scan code" src="https://storage.fredliang.cn/hack/hackday2018.jpg" />}>
        <Card.Meta
          title="hackday 小助手微信"
          description="扫描上方二维码，备注自己的姓名学校，小助手会在三个工作日内将你拉入选手群。"
        />
      </Card>
    );
  }

  redirectToTeam = () => {
    this.props.push('/team');
  };

  renderStatusButtons() {
    return [
      <Button key={0} type="primary" onClick={this.redirectToTeam}>
        组队
      </Button>,
      <Button key={1} type="danger" onClick={this.props.abortCompetition}>
        退出比赛
      </Button>,
    ];
  }
}

const mapStateToProps = ({ user }: RootState) => {
  const { isAccepted, inWaitList } = user;

  return {
    userIsAccepted: isAccepted,
    inWaitList,
  };
};

export default connect(mapStateToProps, {
  push,
  abortCompetition() {
    return { type: TYPE.ABORT_CONFIRM_SUBMIT._ };
  },
})(Console);

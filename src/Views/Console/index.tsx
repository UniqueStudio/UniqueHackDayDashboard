import * as React from 'react';
import Button from 'antd/es/button';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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
}> {
  renderDivider() {
    return <div style={{ height: '20px' }} />;
  }

  render() {
    const { userIsAccepted } = this.props;
    let statusText = '等待审核';
    if (userIsAccepted === true) {
      statusText = '已通过';
    } else if (userIsAccepted === false) {
      statusText = '未通过';
    }

    return (
      <div style={{ paddingBottom: '40px' }}>
        <Status type="success" statusText={statusText} buttons={this.renderStatusButtons()} />
        {this.renderDivider()}
        <TeamInfo />
        {this.renderDivider()}
        <HackdayProgress />
      </div>
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
  const { isAccepted } = user;

  return {
    userIsAccepted: isAccepted,
  };
};

export default connect(mapStateToProps, {
  push,
  abortCompetition() {
    return { type: TYPE.ABORT_CONFIRM_SUBMIT._ };
  },
})(Console);

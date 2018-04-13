import * as React from 'react';
import Button from 'antd/es/button';
// import { Redirect } from 'react-router';

import Status from '../../Components/Status';
import TeamInfo from '../../Components/TeamInfo';
import HackdayProgress from '../../Components/HackdayProgress';
// import { RootState } from '../../redux/reducers';
// import { connect } from 'react-redux';

class Console extends React.Component {
  renderDivider() {
    return <div style={{ height: '20px' }} />;
  }

  render() {
    return (
      <div style={{ paddingBottom: '40px' }}>
        <Status type="success" statusText="等待审核" buttons={this.renderStatusButtons()} />
        {this.renderDivider()}
        <TeamInfo />
        {this.renderDivider()}
        <HackdayProgress />
      </div>
    );
  }

  renderStatusButtons() {
    return [
      <Button key={0} type="primary">
        组队
      </Button>,
      <Button key={1} type="danger">
        退出比赛
      </Button>,
    ];
  }
}

export default Console;

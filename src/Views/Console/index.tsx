import * as React from 'react';
import Button from 'antd/es/button';

import Status from '../../Components/Status';
import TeamInfo from '../../Components/TeamInfo';
import HackdayProgress from '../../Components/HackdayProgress';

export default class Console extends React.Component {
  renderDivider() {
    return <div style={{ height: '20px' }} />;
  }

  render() {
    return (
      <div style={{ paddingBottom: '40px' }}>
        <Status type="success" statusText="通过审核" buttons={this.renderStatusButtons()} />
        {this.renderDivider()}
        <TeamInfo hasOperatingButton={false} />
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

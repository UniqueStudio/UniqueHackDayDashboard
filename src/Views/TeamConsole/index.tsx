import * as React from 'react';
import Button from 'antd/lib/button';

import 'ant-design-pro/dist/ant-design-pro.min.css';
import 'antd/lib/button/style/css';

// import Status from '../../Components/Status';
import TeamInfo from '../../Components/TeamInfo';
// import HackdayProgress from '../../Components/HackdayProgress';

export default class TeamConsole extends React.Component {
  render() {
    return (
      <div>
        <TeamInfo hasEditButton={false} hasDissolutionButton={true}/>
      </div>
    );
  }
}
